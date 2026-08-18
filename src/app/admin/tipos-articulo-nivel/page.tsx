"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/tienda/AuthContext";
import {
  listarTiposArticuloAdmin,
  crearTipoArticuloAdmin,
  editarTipoArticuloAdmin,
  eliminarTipoArticuloAdmin,
  type TipoArticuloAdmin,
  type TipoArticuloPayload,
} from "@/lib/adminTiposArticulo";

interface FormularioProps {
  tipo: TipoArticuloAdmin | null;
  onGuardar: (payload: TipoArticuloPayload) => Promise<void>;
  onCancelar: () => void;
}

function FormularioTipo({ tipo, onGuardar, onCancelar }: FormularioProps) {
  const [nombre, setNombre] = useState(tipo?.nombre ?? "");
  const [requiereTalle, setRequiereTalle] = useState(
    tipo ? tipo.requiereTalle === 1 : false
  );
  const [tallesTexto, setTallesTexto] = useState(
    tipo?.tallesDisponibles?.join(", ") ?? ""
  );
  const [requiereColor, setRequiereColor] = useState(
    tipo ? tipo.requiereColor === 1 : false
  );
  const [precio, setPrecio] = useState(tipo?.precio ?? "0");
  const [activo, setActivo] = useState(tipo ? tipo.activo === 1 : true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function guardar() {
    if (!nombre.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    if (requiereTalle && !tallesTexto.trim()) {
      setError("Cargá los talles separados por coma.");
      return;
    }

    setGuardando(true);
    setError(null);

    try {
      await onGuardar({
        nombre: nombre.trim(),
        requiereTalle,
        tallesDisponibles: requiereTalle
          ? tallesTexto.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
        requiereColor,
        precio: Number(precio) || 0,
        activo,
      });
    } catch (err: any) {
      setError(err.message || "No se pudo guardar.");
    } finally {
      setGuardando(false);
    }
  }

  const input =
    "w-full bg-black border border-purple-600 rounded-lg px-3 py-2 text-purple-100 placeholder-purple-600 outline-none";
  const label = "text-sm text-purple-300 mb-1 block";

  return (
    <div className="fixed inset-0 z-50 bg-black/80 overflow-y-auto p-6">
      <div className="max-w-xl mx-auto border border-purple-500 rounded-xl bg-black p-6">
        <h2 className="text-2xl font-bold text-purple-100 mb-6">
          {tipo ? "Editar tipo de artículo" : "Nuevo tipo de artículo"}
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className={label}>Nombre</label>
            <input
              className={input}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Precio</label>
            <input
              type="number"
              className={input}
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={requiereTalle}
              onChange={(e) => setRequiereTalle(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-purple-200">Requiere talle</span>
          </label>

          {requiereTalle && (
            <div>
              <label className={label}>
                Talles disponibles (separados por coma)
              </label>
              <input
                className={input}
                placeholder="S, M, L, XL, XXL"
                value={tallesTexto}
                onChange={(e) => setTallesTexto(e.target.value)}
              />
            </div>
          )}

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={requiereColor}
              onChange={(e) => setRequiereColor(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-purple-200">Requiere color</span>
          </label>

          <p className="text-xs text-purple-500">
            Los colores disponibles (Negro, Blanco, Rojo, Violeta) son
            fijos por ahora para todos los tipos que requieran color.
          </p>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={activo}
              onChange={(e) => setActivo(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-purple-200">
              Activo (visible en Productos de mi nivel)
            </span>
          </label>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 mt-2">
            <button
              onClick={guardar}
              disabled={guardando}
              className="flex-1 border border-purple-400 px-6 py-3 rounded-lg text-purple-200 disabled:opacity-40"
            >
              {guardando ? "Guardando..." : "Guardar"}
            </button>

            <button
              onClick={onCancelar}
              className="px-6 py-3 rounded-lg text-purple-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminTiposArticuloPage() {
  const { token } = useAuth();
  const [tipos, setTipos] = useState<TipoArticuloAdmin[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editando, setEditando] = useState<TipoArticuloAdmin | null>(null);
  const [creando, setCreando] = useState(false);

  async function cargar() {
    if (!token) return;
    try {
      const datos = await listarTiposArticuloAdmin(token);
      setTipos(datos);
    } catch (err: any) {
      setError(err.message || "No pudimos cargar los tipos.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, [token]);

  async function guardar(payload: TipoArticuloPayload) {
    if (!token) return;

    if (editando) {
      await editarTipoArticuloAdmin(token, editando.id, payload);
    } else {
      await crearTipoArticuloAdmin(token, payload);
    }

    setEditando(null);
    setCreando(false);
    await cargar();
  }

  async function eliminar(tipo: TipoArticuloAdmin) {
    if (!token) return;
    const ok = confirm(`¿Desactivar "${tipo.nombre}"?`);
    if (!ok) return;

    try {
      await eliminarTipoArticuloAdmin(token, tipo.id);
      await cargar();
    } catch (err: any) {
      alert(err.message || "No se pudo desactivar.");
    }
  }

  return (
    <section className="max-w-4xl mx-auto">
      <Link href="/admin" className="text-purple-400 text-sm">
        ← Volver al panel
      </Link>

      <div className="mt-4 flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-purple-100">
          Tipos de artículo para nivel
        </h1>

        <button
          onClick={() => setCreando(true)}
          className="border border-purple-400 px-4 py-2 rounded-lg text-purple-200"
        >
          + Nuevo tipo
        </button>
      </div>

      {cargando && <p className="text-purple-300">Cargando...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="flex flex-col gap-3">
        {tipos.map((tipo) => (
          <div
            key={tipo.uuid}
            className="border border-purple-700 rounded-xl bg-black/40 p-4 flex flex-wrap items-center gap-4"
          >
            <div className="flex-1 min-w-[180px]">
              <p className="text-purple-100 font-bold">
                {tipo.nombre}
                {tipo.activo === 0 && (
                  <span className="ml-2 text-xs text-red-400">(inactivo)</span>
                )}
              </p>
              <p className="text-xs text-purple-400 mt-1">
                ${Number(tipo.precio).toLocaleString("es-AR")} ·{" "}
                {tipo.requiereTalle
                  ? `Talles: ${tipo.tallesDisponibles.join(", ")}`
                  : "Sin talle"}
                {" · "}
                {tipo.requiereColor ? "Requiere color" : "Sin color"}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditando(tipo)}
                className="border border-purple-500 px-3 py-1 rounded-lg text-sm text-purple-200"
              >
                Editar
              </button>
              <button
                onClick={() => eliminar(tipo)}
                className="border border-red-500 px-3 py-1 rounded-lg text-sm text-red-300"
              >
                Desactivar
              </button>
            </div>
          </div>
        ))}
      </div>

      {(creando || editando) && (
        <FormularioTipo
          tipo={editando}
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