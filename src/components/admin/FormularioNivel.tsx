"use client";

import { useRef, useState } from "react";
import { useAuth } from "@/lib/tienda/AuthContext";
import type { NivelAdmin, NivelPayload } from "@/lib/adminNiveles";

interface Props {
  nivel: NivelAdmin;
  onGuardar: (payload: NivelPayload) => Promise<void>;
  onCancelar: () => void;
}

export default function FormularioNivel({
  nivel,
  onGuardar,
  onCancelar,
}: Props) {
  const { token } = useAuth();

  const [titulo, setTitulo] = useState(nivel.titulo ?? "");
  const [artefacto, setArtefacto] = useState(nivel.artefacto ?? "");
  const [descripcionArtefacto, setDescripcionArtefacto] = useState(
    nivel.descripcionArtefacto ?? ""
  );
  const [loreArtefacto, setLoreArtefacto] = useState(
    nivel.loreArtefacto ?? ""
  );
  const [estiloPersonaje, setEstiloPersonaje] = useState(
    nivel.estiloPersonaje ?? ""
  );
  const [estiloArtefacto, setEstiloArtefacto] = useState(
    nivel.estiloArtefacto ?? ""
  );
  const [xpAcumulada, setXpAcumulada] = useState(nivel.xpAcumulada ?? 0);
  const [imagenA, setImagenA] = useState(nivel.imagenA ?? "");
  const [imagenB, setImagenB] = useState(nivel.imagenB ?? "");
  const [imagenA3d, setImagenA3d] = useState(nivel.imagenA3d ?? "");

  const [subiendo, setSubiendo] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputArchivoA = useRef<HTMLInputElement | null>(null);
  const inputArchivoB = useRef<HTMLInputElement | null>(null);
  const inputArchivo3d = useRef<HTMLInputElement | null>(null);

  async function subirArchivo(
    slot: "a" | "b" | "3d",
    archivo: File,
    setter: (valor: string) => void
  ) {
    if (!token) return;

    setSubiendo(slot);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("imagen", archivo);

      const respuesta = await fetch("/api/admin/uploads", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data?.error || "No se pudo subir la imagen");
      }

      // El nombre del nivel espera solo el nombre de archivo (se arma
      // la ruta /tienda/niveles/xxx en el resto de la tienda), pero la
      // subida vive en /uploads/productos. Guardamos la URL completa
      // que devuelve el backend, funciona igual como referencia.
      setter(data.url);
    } catch (err: any) {
      setError(err.message || "No se pudo subir la imagen.");
    } finally {
      setSubiendo(null);
    }
  }

  async function guardar() {
    setGuardando(true);
    setError(null);

    try {
      await onGuardar({
        titulo: titulo.trim() || null,
        artefacto: artefacto.trim() || null,
        descripcionArtefacto: descripcionArtefacto.trim() || null,
        loreArtefacto: loreArtefacto.trim() || null,
        estiloPersonaje: estiloPersonaje.trim() || null,
        estiloArtefacto: estiloArtefacto.trim() || null,
        xpAcumulada: Number(xpAcumulada) || 0,
        imagenA: imagenA.trim() || null,
        imagenB: imagenB.trim() || null,
        imagenA3d: imagenA3d.trim() || null,
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

  function bloqueImagen(
    titulo: string,
    valor: string,
    setValor: (v: string) => void,
    slot: "a" | "b" | "3d",
    inputRef: React.RefObject<HTMLInputElement | null>
  ) {
    return (
      <div className="border border-purple-700 rounded-lg p-3">
        <p className="text-xs text-purple-300 mb-2">{titulo}</p>

        <div className="flex gap-3 items-start">
          <div className="w-16 h-16 shrink-0 bg-black border border-purple-700 rounded overflow-hidden flex items-center justify-center">
            {valor.trim() ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={valor.startsWith("/uploads") ? valor : `/tienda/niveles/${valor}`}
                alt={titulo}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[9px] text-purple-600 text-center px-1">
                Sin imagen
              </span>
            )}
          </div>

          <div className="flex-1">
            <input
              className={`${input} text-xs`}
              placeholder="nivel_01_a.jpg"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={inputRef}
              onChange={(e) => {
                const archivo = e.target.files?.[0];
                if (archivo) subirArchivo(slot, archivo, setValor);
                e.target.value = "";
              }}
            />

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={subiendo === slot}
              className="mt-2 border border-purple-500 px-3 py-1 rounded-lg text-xs text-purple-200 disabled:opacity-40"
            >
              {subiendo === slot ? "Subiendo..." : "Explorar..."}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto border border-purple-500 rounded-xl bg-black p-6">
        <h2 className="text-2xl font-bold text-purple-100 mb-6">
          Editar nivel {nivel.id}
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className={label}>Título</label>
            <input
              className={input}
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Artefacto</label>
            <input
              className={input}
              value={artefacto}
              onChange={(e) => setArtefacto(e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Descripción del artefacto</label>
            <textarea
              className={input}
              rows={3}
              value={descripcionArtefacto}
              onChange={(e) => setDescripcionArtefacto(e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Lore del artefacto</label>
            <textarea
              className={input}
              rows={3}
              value={loreArtefacto}
              onChange={(e) => setLoreArtefacto(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Estilo del personaje</label>
              <input
                className={input}
                value={estiloPersonaje}
                onChange={(e) => setEstiloPersonaje(e.target.value)}
              />
            </div>

            <div>
              <label className={label}>Estilo del artefacto</label>
              <input
                className={input}
                value={estiloArtefacto}
                onChange={(e) => setEstiloArtefacto(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={label}>XP acumulada necesaria</label>
            <input
              type="number"
              className={input}
              value={xpAcumulada}
              onChange={(e) => setXpAcumulada(Number(e.target.value))}
            />
          </div>

          <p className="text-purple-100 font-bold mt-2">Imágenes</p>

          {bloqueImagen("Imagen A", imagenA, setImagenA, "a", inputArchivoA)}
          {bloqueImagen("Imagen B", imagenB, setImagenB, "b", inputArchivoB)}
          {bloqueImagen(
            "Vista 3D",
            imagenA3d,
            setImagenA3d,
            "3d",
            inputArchivo3d
          )}

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