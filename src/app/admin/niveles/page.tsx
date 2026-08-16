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

export default function AdminNivelesPage() {
  const { token } = useAuth();
  const [niveles, setNiveles] = useState<NivelAdmin[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editando, setEditando] = useState<NivelAdmin | null>(null);

  async function cargar() {
    if (!token) return;
    try {
      const datos = await listarNivelesAdmin(token);
      setNiveles(datos);
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

      <h1 className="mt-4 text-3xl font-bold text-purple-100 mb-8">
        Niveles
      </h1>

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