"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/tienda/AuthContext";
import FormularioProducto from "@/components/admin/FormularioProducto";
import {
  listarProductosAdmin,
  crearProductoAdmin,
  editarProductoAdmin,
  eliminarProductoAdmin,
  type ProductoAdmin,
  type ProductoPayload,
} from "@/lib/adminApi";

interface Categoria {
  id: number;
  nombre: string;
}

export default function AdminProductosPage() {
  const { token } = useAuth();
  const [productos, setProductos] = useState<ProductoAdmin[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editando, setEditando] = useState<ProductoAdmin | null>(null);
  const [creando, setCreando] = useState(false);

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

  return (
    <section className="max-w-6xl mx-auto">
      <Link href="/admin" className="text-purple-400 text-sm">
        ← Volver al panel
      </Link>

      <div className="mt-4 flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-purple-100">Productos</h1>

        <button
          onClick={() => setCreando(true)}
          className="border border-purple-400 px-4 py-2 rounded-lg text-purple-200"
        >
          + Nuevo producto
        </button>
      </div>

      {cargando && <p className="text-purple-300">Cargando...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {!cargando && productos.length === 0 && (
        <p className="text-purple-300">Todavía no hay productos cargados.</p>
      )}

      <div className="flex flex-col gap-3">
        {productos.map((producto) => (
          <div
            key={producto.uuid}
            className="border border-purple-700 rounded-xl bg-black/40 p-4 flex flex-wrap items-center gap-4"
          >
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
                {producto.nivelRequerido ?? 1} · stock {producto.stock}
              </p>
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

            <div className="flex gap-2">
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
    </section>
  );
}