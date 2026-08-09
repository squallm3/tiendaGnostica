"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/tienda/AuthContext";
import FormularioProducto from "@/components/admin/FormularioProducto";
import PanelVariantes from "@/components/admin/PanelVariantes";
import {
  listarProductosAdmin,
  crearProductoAdmin,
  editarProductoAdmin,
  eliminarProductoAdmin,
  editarProductosMasivo,
  type ProductoAdmin,
  type ProductoPayload,
} from "@/lib/adminApi";

interface Categoria {
  id: number;
  nombre: string;
}

function BarraMasiva({
  cantidad,
  onLimpiar,
  onAplicar,
}: {
  cantidad: number;
  onLimpiar: () => void;
  onAplicar: (payload: {
    precio: number | null;
    aplicarOferta: boolean;
    precioOferta: number | null;
  }) => Promise<void>;
}) {
  const [precio, setPrecio] = useState("");
  const [aplicarOferta, setAplicarOferta] = useState(false);
  const [precioOferta, setPrecioOferta] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function aplicar() {
    if (!precio.trim() && !aplicarOferta) {
      setError(
        "Cargá un precio, o activá 'Aplicar oferta' con su valor, para saber qué cambiar."
      );
      return;
    }

    if (aplicarOferta && !precioOferta.trim()) {
      setError("Falta el precio de oferta.");
      return;
    }

    setGuardando(true);
    setError(null);

    try {
      await onAplicar({
        precio: precio.trim() ? Number(precio) : null,
        aplicarOferta,
        precioOferta: aplicarOferta ? Number(precioOferta) : null,
      });
      setPrecio("");
      setAplicarOferta(false);
      setPrecioOferta("");
    } catch (err: any) {
      setError(err.message || "No se pudo aplicar el cambio.");
    } finally {
      setGuardando(false);
    }
  }

  const input =
    "bg-black border border-purple-600 rounded-lg px-3 py-2 text-purple-100 placeholder-purple-600 outline-none text-sm w-32";

  return (
    <div className="sticky top-0 z-30 mb-6 border border-purple-400 bg-black rounded-xl p-4 flex flex-wrap items-center gap-4">
      <span className="text-purple-100 font-bold">
        {cantidad} seleccionado(s)
      </span>

      <div>
        <label className="text-xs text-purple-400 block mb-1">
          Precio nuevo
        </label>
        <input
          type="number"
          placeholder="Sin cambios"
          className={input}
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer mt-4">
        <input
          type="checkbox"
          checked={aplicarOferta}
          onChange={(e) => setAplicarOferta(e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-sm text-purple-200">Aplicar oferta</span>
      </label>

      {aplicarOferta ? (
        <div>
          <label className="text-xs text-purple-400 block mb-1">
            Precio de oferta
          </label>
          <input
            type="number"
            className={input}
            value={precioOferta}
            onChange={(e) => setPrecioOferta(e.target.value)}
          />
        </div>
      ) : (
        <p className="text-xs text-purple-500 max-w-[180px]">
          Sin marcar, se les quita la oferta a los seleccionados.
        </p>
      )}

      {error && <p className="text-red-400 text-sm w-full">{error}</p>}

      <div className="flex gap-2 ml-auto">
        <button
          onClick={aplicar}
          disabled={guardando}
          className="border border-purple-400 px-4 py-2 rounded-lg text-sm text-purple-200 disabled:opacity-40"
        >
          {guardando ? "Aplicando..." : "Aplicar a selección"}
        </button>
        <button
          onClick={onLimpiar}
          className="px-4 py-2 rounded-lg text-sm text-purple-400"
        >
          Cancelar selección
        </button>
      </div>
    </div>
  );
}

export default function AdminProductosPage() {
  const { token } = useAuth();
  const [productos, setProductos] = useState<ProductoAdmin[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editando, setEditando] = useState<ProductoAdmin | null>(null);
  const [creando, setCreando] = useState(false);
  const [variantesDe, setVariantesDe] = useState<ProductoAdmin | null>(null);
  const [seleccionados, setSeleccionados] = useState<Set<number>>(new Set());

  async function cargar() {
    if (!token) return;
    try {
      const [datosProductos, respCategorias] = await Promise.all([
        listarProductosAdmin(token),
        fetch("/api/admin/categorias").then((r) => r.json()),
      ]);
      setProductos(datosProductos);
      setCategorias(respCategorias);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "No pudimos cargar los productos.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, [token]);

  async function guardar(payload: ProductoPayload) {
    if (!token) return;

    if (editando) {
      await editarProductoAdmin(token, editando.id, payload);
    } else {
      await crearProductoAdmin(token, payload);
    }

    setEditando(null);
    setCreando(false);
    await cargar();
  }

  async function eliminar(producto: ProductoAdmin) {
    if (!token) return;
    const ok = confirm(`¿Seguro que querés eliminar "${producto.nombre}"?`);
    if (!ok) return;

    try {
      await eliminarProductoAdmin(token, producto.id);
      await cargar();
    } catch (err: any) {
      alert(err.message || "No se pudo eliminar.");
    }
  }

  function alternarSeleccion(id: number) {
    const copia = new Set(seleccionados);
    if (copia.has(id)) {
      copia.delete(id);
    } else {
      copia.add(id);
    }
    setSeleccionados(copia);
  }

  const todosSeleccionados =
    productos.length > 0 && seleccionados.size === productos.length;

  function alternarTodos() {
    if (todosSeleccionados) {
      setSeleccionados(new Set());
    } else {
      setSeleccionados(new Set(productos.map((p) => p.id)));
    }
  }

  async function aplicarMasivo(payload: {
    precio: number | null;
    aplicarOferta: boolean;
    precioOferta: number | null;
  }) {
    if (!token) return;

    await editarProductosMasivo(token, {
      ids: Array.from(seleccionados),
      ...payload,
    });

    setSeleccionados(new Set());
    await cargar();
  }

  return (
    <section className="max-w-6xl mx-auto">
      <Link href="/admin" className="text-purple-400 text-sm">
        ← Volver al panel
      </Link>

      <div className="mt-4 flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-purple-100">Productos</h1>

        <button
          onClick={() => setCreando(true)}
          className="border border-purple-400 px-4 py-2 rounded-lg text-purple-200"
        >
          + Nuevo producto
        </button>
      </div>

      {productos.length > 0 && (
        <label className="flex items-center gap-2 cursor-pointer mb-6 w-fit">
          <input
            type="checkbox"
            checked={todosSeleccionados}
            onChange={alternarTodos}
            className="w-5 h-5"
          />
          <span className="text-sm text-purple-300">
            Seleccionar todos ({productos.length})
          </span>
        </label>
      )}

      {seleccionados.size > 0 && (
        <BarraMasiva
          cantidad={seleccionados.size}
          onLimpiar={() => setSeleccionados(new Set())}
          onAplicar={aplicarMasivo}
        />
      )}

      {cargando && <p className="text-purple-300">Cargando...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!cargando && productos.length === 0 && (
        <p className="text-purple-300">Todavía no hay productos cargados.</p>
      )}

      <div className="flex flex-col gap-3">
        {productos.map((producto: any) => (
          <div
            key={producto.uuid}
            className="border border-purple-700 rounded-xl bg-black/40 p-4 flex flex-wrap items-center gap-4"
          >
            <input
              type="checkbox"
              checked={seleccionados.has(producto.id)}
              onChange={() => alternarSeleccion(producto.id)}
              className="w-5 h-5 shrink-0"
            />

            {/* MINIATURA */}
            <div className="w-20 h-20 shrink-0 bg-black border border-purple-700 rounded-lg overflow-hidden flex items-center justify-center">
              {producto.imagenes?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={producto.imagenes[0]}
                  alt={producto.nombre}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-[10px] text-purple-600 text-center px-1">
                  Sin imagen
                </span>
              )}
            </div>

            <div className="flex-1 min-w-[200px]">
              <p className="text-purple-100 font-bold">
                {producto.nombre}
                {producto.activo === 0 && (
                  <span className="ml-2 text-xs text-red-400">(inactivo)</span>
                )}
              </p>
              <p className="text-xs text-purple-500">/{producto.slug}</p>
              <p className="text-xs text-purple-400 mt-1">
                {producto.categoriaNombre} · nivel{" "}
                {producto.nivelRequerido ?? 1} · stock{" "}
                {producto.stockVariantes ?? 0}
              </p>

              {producto.cantidadVariantes === 0 ? (
                <p className="text-xs text-amber-400 mt-1">
                  ⚠ Sin variantes: no se puede comprar
                </p>
              ) : (
                <p className="text-xs text-purple-500 mt-1">
                  {producto.cantidadVariantes} variante(s)
                </p>
              )}
            </div>

            <div className="text-right">
              {producto.precioOferta &&
              Number(producto.precioOferta) > 0 &&
              Number(producto.precioOferta) < Number(producto.precio) ? (
                <>
                  <p className="text-purple-300 font-bold">
                    ${Number(producto.precioOferta).toLocaleString("es-AR")}
                  </p>
                  <p className="text-xs text-purple-600 line-through">
                    ${Number(producto.precio).toLocaleString("es-AR")}
                  </p>
                </>
              ) : (
                <p className="text-purple-300 font-bold">
                  ${Number(producto.precio).toLocaleString("es-AR")}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setVariantesDe(producto)}
                className="border border-purple-500 px-3 py-1 rounded-lg text-sm text-purple-200"
              >
                Variantes
              </button>
              <button
                onClick={() => setEditando(producto)}
                className="border border-purple-500 px-3 py-1 rounded-lg text-sm text-purple-200"
              >
                Editar
              </button>
              <button
                onClick={() => eliminar(producto)}
                className="border border-red-500 px-3 py-1 rounded-lg text-sm text-red-300"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {(creando || editando) && (
        <FormularioProducto
          producto={editando}
          categorias={categorias}
          onGuardar={guardar}
          onCancelar={() => {
            setCreando(false);
            setEditando(null);
          }}
        />
      )}

      {variantesDe && (
        <PanelVariantes
          productoId={variantesDe.id}
          productoNombre={variantesDe.nombre}
          onCerrar={() => {
            setVariantesDe(null);
            cargar();
          }}
        />
      )}
    </section>
  );
}