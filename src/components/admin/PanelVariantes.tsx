"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/tienda/AuthContext";
import {
  listarVariantesAdmin,
  crearVarianteAdmin,
  editarVarianteAdmin,
  eliminarVarianteAdmin,
  type VarianteAdmin,
} from "@/lib/adminVariantes";

interface Props {
  productoId: number;
  productoNombre: string;
  onCerrar: () => void;
}

interface FilaEdicion {
  esUnica: boolean;
  talle: string;
  color: string;
  stock: number;
  precioExtra: string;
  sku: string;
}

const FILA_VACIA: FilaEdicion = {
  esUnica: true,
  talle: "",
  color: "",
  stock: 0,
  precioExtra: "",
  sku: "",
};

export default function PanelVariantes({
  productoId,
  productoNombre,
  onCerrar,
}: Props) {
  const { token } = useAuth();
  const [variantes, setVariantes] = useState<VarianteAdmin[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [fila, setFila] = useState<FilaEdicion>(FILA_VACIA);
  const [creando, setCreando] = useState(false);
  const [guardando, setGuardando] = useState(false);

  async function cargar() {
    if (!token) return;
    try {
      const datos = await listarVariantesAdmin(token, productoId);
      setVariantes(datos);
    } catch (err: any) {
      setError(err.message || "No pudimos cargar las variantes.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, [token, productoId]);

  function empezarCreacion() {
    setCreando(true);
    setEditandoId(null);
    setFila(FILA_VACIA);
  }

  function empezarEdicion(variante: VarianteAdmin) {
    setCreando(false);
    setEditandoId(variante.id);
    const esUnica = !variante.talle && !variante.color;
    setFila({
      esUnica,
      talle: variante.talle ?? "",
      color: variante.color ?? "",
      stock: variante.stock,
      precioExtra: variante.precioExtra ?? "",
      sku: variante.sku ?? "",
    });
  }

  function cancelar() {
    setCreando(false);
    setEditandoId(null);
    setFila(FILA_VACIA);
    setError(null);
  }

  async function guardar() {
    if (!token) return;

    if (!fila.esUnica && !fila.talle.trim() && !fila.color.trim()) {
      setError(
        "Poné al menos un talle o un color, o marcá 'Variante única'."
      );
      return;
    }

    setGuardando(true);
    setError(null);

    const payload = {
      talle: fila.esUnica ? null : fila.talle.trim() || null,
      color: fila.esUnica ? null : fila.color.trim() || null,
      stock: Number(fila.stock) || 0,
      precioExtra: Number(fila.precioExtra) || 0,
      sku: fila.sku.trim() || null,
    };

    try {
      if (editandoId) {
        await editarVarianteAdmin(token, editandoId, payload);
      } else {
        await crearVarianteAdmin(token, { ...payload, productoId });
      }
      cancelar();
      await cargar();
    } catch (err: any) {
      setError(err.message || "No se pudo guardar.");
    } finally {
      setGuardando(false);
    }
  }

  async function eliminar(variante: VarianteAdmin) {
    if (!token) return;
    const etiqueta =
      [variante.talle, variante.color].filter(Boolean).join(" / ") || "Única";
    const ok = confirm(`¿Eliminar la variante "${etiqueta}"?`);
    if (!ok) return;

    try {
      await eliminarVarianteAdmin(token, variante.id);
      await cargar();
    } catch (err: any) {
      alert(err.message || "No se pudo eliminar.");
    }
  }

  const input =
    "w-full bg-black border border-purple-600 rounded-lg px-3 py-2 text-purple-100 placeholder-purple-600 outline-none text-sm disabled:opacity-30 disabled:cursor-not-allowed";
  const label = "text-xs text-purple-400 mb-1 block";

  return (
    <div className="fixed inset-0 z-50 bg-black/80 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto border border-purple-500 rounded-xl bg-black p-6">
        <h2 className="text-2xl font-bold text-purple-100">
          Variantes
        </h2>
        <p className="text-purple-400 text-sm mt-1 mb-6">
          {productoNombre}
        </p>

        {variantes.length === 0 && !cargando && (
          <div className="border border-amber-700 bg-amber-950/30 rounded-lg p-4 mb-4">
            <p className="text-amber-300 text-sm">
              Este producto no tiene variantes. Sin al menos una, no se puede
              agregar al carrito ni comprar. Podés agregar una marcando
              "Variante única" si no maneja talle ni color.
            </p>
          </div>
        )}

        {cargando && <p className="text-purple-300">Cargando...</p>}

        {/* LISTADO */}
        <div className="flex flex-col gap-2 mb-6">
          {variantes.map((variante) => (
            <div
              key={variante.uuid}
              className="border border-purple-700 rounded-lg p-3 flex flex-wrap items-center gap-4"
            >
              <div className="flex-1 min-w-[140px]">
                <p className="text-purple-100">
                  {[variante.talle, variante.color]
                    .filter(Boolean)
                    .join(" / ") || "Única"}
                </p>
                {variante.sku && (
                  <p className="text-xs text-purple-500">
                    SKU: {variante.sku}
                  </p>
                )}
              </div>

              <span
                className={`text-sm ${
                  variante.stock === 0 ? "text-red-400" : "text-purple-300"
                }`}
              >
                Stock: {variante.stock}
              </span>

              {Number(variante.precioExtra) > 0 && (
                <span className="text-sm text-purple-400">
                  +${Number(variante.precioExtra).toLocaleString("es-AR")}
                </span>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => empezarEdicion(variante)}
                  className="border border-purple-500 px-3 py-1 rounded-lg text-xs text-purple-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminar(variante)}
                  className="border border-red-500 px-3 py-1 rounded-lg text-xs text-red-300"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FORMULARIO */}
        {(creando || editandoId) && (
          <div className="border border-purple-600 rounded-lg p-4 mb-4">
            <p className="text-purple-100 font-bold mb-3">
              {editandoId ? "Editar variante" : "Nueva variante"}
            </p>

            <label className="flex items-center gap-3 cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={fila.esUnica}
                onChange={(e) =>
                  setFila({
                    ...fila,
                    esUnica: e.target.checked,
                    talle: e.target.checked ? "" : fila.talle,
                    color: e.target.checked ? "" : fila.color,
                  })
                }
                className="w-4 h-4"
              />
              <span className="text-purple-200 text-sm">
                Variante única (sin talle ni color)
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className={label}>Talle</label>
                <input
                  className={input}
                  placeholder="S, M, L..."
                  value={fila.talle}
                  disabled={fila.esUnica}
                  onChange={(e) => setFila({ ...fila, talle: e.target.value })}
                />
              </div>

              <div>
                <label className={label}>Color</label>
                <input
                  className={input}
                  placeholder="Negro, Violeta..."
                  value={fila.color}
                  disabled={fila.esUnica}
                  onChange={(e) => setFila({ ...fila, color: e.target.value })}
                />
              </div>

              <div>
                <label className={label}>Stock</label>
                <input
                  type="number"
                  className={input}
                  value={fila.stock}
                  onChange={(e) =>
                    setFila({ ...fila, stock: Number(e.target.value) })
                  }
                />
              </div>

              <div>
                <label className={label}>Precio extra</label>
                <input
                  type="number"
                  className={input}
                  placeholder="0"
                  value={fila.precioExtra}
                  onChange={(e) =>
                    setFila({ ...fila, precioExtra: e.target.value })
                  }
                />
              </div>

              <div className="col-span-2">
                <label className={label}>SKU (opcional)</label>
                <input
                  className={input}
                  value={fila.sku}
                  onChange={(e) => setFila({ ...fila, sku: e.target.value })}
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

            <div className="flex gap-3 mt-4">
              <button
                onClick={guardar}
                disabled={guardando}
                className="border border-purple-400 px-5 py-2 rounded-lg text-sm text-purple-200 disabled:opacity-40"
              >
                {guardando ? "Guardando..." : "Guardar"}
              </button>
              <button
                onClick={cancelar}
                className="px-5 py-2 rounded-lg text-sm text-purple-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {!creando && !editandoId && (
          <button
            onClick={empezarCreacion}
            className="border border-purple-400 px-4 py-2 rounded-lg text-sm text-purple-200"
          >
            + Agregar variante
          </button>
        )}

        <div className="mt-8 pt-4 border-t border-purple-800">
          <button
            onClick={onCerrar}
            className="text-purple-400"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}