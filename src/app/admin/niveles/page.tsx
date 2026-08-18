"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/tienda/AuthContext";
import FormularioNivel from "@/components/admin/FormularioNivel";
import {
  listarNivelesAdmin,
  editarNivelAdmin,
  type NivelAdmin,
  type NivelPayload,
} from "@/lib/adminNiveles";
import {
  listarTiposArticuloAdmin,
  actualizarPreciosTipoArticulo,
  type TipoArticuloAdmin,
} from "@/lib/adminTiposArticulo";

function PanelPrecios({
  tipos,
  onGuardado,
}: {
  tipos: TipoArticuloAdmin[];
  onGuardado: (tipos: TipoArticuloAdmin[]) => void;
}) {
  const { token } = useAuth();
  const [valores, setValores] = useState<Record<number, string>>(() =>
    Object.fromEntries(tipos.map((t) => [t.id, t.precio]))
  );
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  async function guardar() {
    if (!token) return;
    setGuardando(true);
    setMensaje(null);

    try {
      const precios = tipos.map((t) => ({
        id: t.id,
        precio: Number(valores[t.id]) || 0,
      }));
      const actualizados = await actualizarPreciosTipoArticulo(token, precios);
      onGuardado(actualizados);
      setMensaje("Precios actualizados.");
    } catch (err: any) {
      setMensaje(err.message || "No se pudo guardar.");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="border border-purple-500 rounded-xl bg-black/40 p-5 mb-8">
      <p className="text-purple-100 font-bold mb-1">
        Precios de artículos personalizados
      </p>
      <p className="text-xs text-purple-400 mb-4">
        Precio único por tipo de artículo, sin importar el nivel o el diseño
        elegido.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {tipos.map((t) => (
          <div key={t.id}>
            <label className="text-xs text-purple-400 block mb-1">
              {t.nombre}
            </label>
            <input
              type="number"
              value={valores[t.id] ?? ""}
              onChange={(e) =>
                setValores({ ...valores, [t.id]: e.target.value })
              }
              className="w-full bg-black border border-purple-600 rounded-lg px-3 py-2 text-purple-100 outline-none"
            />
          </div>
        ))}
      </div>

      {mensaje && <p className="text-xs text-purple-300 mt-3">{mensaje}</p>}

      <button
        onClick={guardar}
        disabled={guardando}
        className="mt-4 border border-purple-400 px-4 py-2 rounded-lg text-sm text-purple-200 disabled:opacity-40"
      >
        {guardando ? "Guardando..." : "Guardar precios"}
      </button>
    </div>
  );
}

export default function AdminNivelesPage() {
  const { token } = useAuth();
  const [niveles, setNiveles] = useState<NivelAdmin[]>([]);
  const [tipos, setTipos] = useState<TipoArticuloAdmin[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editando, setEditando] = useState<NivelAdmin | null>(null);

  async function cargar() {
    if (!token) return;
    try {
      const [datosNiveles, datosTipos] = await Promise.all([
        listarNivelesAdmin(token),
        listarTiposArticuloAdmin(token),
      ]);
      setNiveles(datosNiveles);
      setTipos(datosTipos);
    } catch (err: any) {
      setError(err.message || "No pudimos cargar los niveles.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, [token]);

  async function guardar(payload: NivelPayload) {
    if (!token || !editando) return;
    await editarNivelAdmin(token, editando.id, payload);
    setEditando(null);
    await cargar();
  }

  return (
    <section className="max-w-5xl mx-auto">
      <Link href="/admin" className="text-purple-400 text-sm">
        ← Volver al panel
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-purple-100 mb-6">
        Modificar Artículos de Mi Nivel
      </h1>

      {!cargando && tipos.length > 0 && (
        <PanelPrecios tipos={tipos} onGuardado={setTipos} />
      )}

      {cargando && <p className="text-purple-300">Cargando...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="flex flex-col gap-2">
        {niveles.map((nivel) => (
          <div
            key={nivel.uuid}
            className="border border-purple-700 rounded-lg bg-black/40 p-3 flex items-center gap-4"
          >
            <span className="w-10 text-center text-purple-400 text-sm shrink-0">
              #{nivel.id}
            </span>

            <div className="w-10 h-10 shrink-0 bg-black border border-purple-700 rounded-full overflow-hidden flex items-center justify-center">
              {nivel.imagenA ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={
                    nivel.imagenA.startsWith("/uploads")
                      ? nivel.imagenA
                      : `/tienda/niveles/${nivel.imagenA}`
                  }
                  alt={nivel.titulo ?? `Nivel ${nivel.id}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[8px] text-purple-600">—</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-purple-100 font-bold truncate">
                {nivel.titulo ?? "Sin título"}
              </p>
              <p className="text-xs text-purple-500 truncate">
                {nivel.artefacto ?? "Sin artefacto"} · XP{" "}
                {nivel.xpAcumulada ?? 0}
              </p>
            </div>

            <button
              onClick={() => setEditando(nivel)}
              className="border border-purple-500 px-3 py-1 rounded-lg text-sm text-purple-200 shrink-0"
            >
              Editar
            </button>
          </div>
        ))}
      </div>

      {editando && (
        <FormularioNivel
          nivel={editando}
          onGuardar={guardar}
          onCancelar={() => setEditando(null)}
        />
      )}
    </section>
  );
}