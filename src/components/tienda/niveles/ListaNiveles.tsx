"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/tienda/AuthContext";

interface Nivel {
  id: number;
  uuid: string;
  titulo: string | null;
  artefacto: string | null;
  imagenA: string | null;
  imagenB: string | null;
  imagenA3d: string | null;
  xpAcumulada: number | null;
}

interface TipoArticulo {
  id: number;
  uuid: string;
  nombre: string;
  requiereTalle: number;
  tallesDisponibles: string[];
  requiereColor: number;
}

const COLORES = ["Negro", "Blanco", "Rojo", "Violeta"];

// Las imagenes de nivel viejas se guardan solo con el nombre de archivo
// (van en /tienda/niveles/xxx). Las subidas nuevas con "Explorar" ya
// vienen con la ruta completa (/uploads/productos/xxx).
function rutaImagenNivel(valor: string) {
  return valor.startsWith("/uploads") ? valor : `/tienda/niveles/${valor}`;
}

function TarjetaAlcanzada({
  nivel,
  tipos,
}: {
  nivel: Nivel;
  tipos: TipoArticulo[];
}) {
  const [seleccion, setSeleccion] = useState<"a" | "b" | null>(null);
  const [tipoId, setTipoId] = useState("");
  const [talle, setTalle] = useState("");
  const [color, setColor] = useState("");

  const tipoElegido = tipos.find((t) => String(t.id) === tipoId) ?? null;

  function cambiarTipo(valor: string) {
    setTipoId(valor);
    // Al cambiar de prenda, se resetean las opciones anteriores
    setTalle("");
    setColor("");
  }

  const puedeContinuar =
    seleccion !== null &&
    tipoElegido !== null &&
    (!tipoElegido.requiereTalle || talle !== "") &&
    (!tipoElegido.requiereColor || color !== "");

  function continuar() {
    // Mas adelante esto avanza al checkout real (se agrega como
    // articulo al carrito). Por ahora queda simulado.
    console.log("Continuar con:", {
      nivelId: nivel.id,
      diseno: seleccion,
      tipoArticuloId: tipoElegido?.id,
      tipoArticuloNombre: tipoElegido?.nombre,
      talle: talle || null,
      color: color || null,
    });
  }

  const inputClase =
    "w-full bg-black border border-purple-600 rounded-lg px-3 py-2 text-purple-100 outline-none";

  return (
    <div className="border border-purple-700 rounded-xl bg-black/40 p-5">
      <div className="text-center mb-5">
        <p className="text-purple-400 text-sm uppercase tracking-wide">
          Nivel {nivel.id}
        </p>
        <p className="text-purple-100 font-bold text-lg">
          {nivel.titulo ?? "Sin título"}
        </p>
        {nivel.artefacto && (
          <p className="text-purple-300 text-sm mt-1">{nivel.artefacto}</p>
        )}
      </div>

      <div className="flex flex-wrap items-start justify-center gap-4">
        {/* IMAGEN A */}
        {nivel.imagenA && (
          <button
            type="button"
            onClick={() => setSeleccion("a")}
            className={`relative w-24 sm:w-28 aspect-[4/5] shrink-0 rounded-lg overflow-hidden border-2 transition ${
              seleccion === "a" ? "border-purple-300" : "border-purple-700"
            }`}
          >
            <Image
              src={rutaImagenNivel(nivel.imagenA)}
              alt={`${nivel.titulo ?? "Nivel"} - diseño A`}
              fill
              className="object-cover"
            />
            {seleccion === "a" && (
              <span className="absolute top-1 right-1 bg-purple-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                ✓
              </span>
            )}
          </button>
        )}

        {/* IMAGEN B */}
        {nivel.imagenB && (
          <button
            type="button"
            onClick={() => setSeleccion("b")}
            className={`relative w-24 sm:w-28 aspect-[4/5] shrink-0 rounded-lg overflow-hidden border-2 transition ${
              seleccion === "b" ? "border-purple-300" : "border-purple-700"
            }`}
          >
            <Image
              src={rutaImagenNivel(nivel.imagenB)}
              alt={`${nivel.titulo ?? "Nivel"} - diseño B`}
              fill
              className="object-cover"
            />
            {seleccion === "b" && (
              <span className="absolute top-1 right-1 bg-purple-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                ✓
              </span>
            )}
          </button>
        )}

        {/* IMAGEN 3D (solo vista, no seleccionable) */}
        {nivel.imagenA3d && (
          <div className="relative w-24 sm:w-28 aspect-[4/5] shrink-0 rounded-lg overflow-hidden border-2 border-purple-800">
            <Image
              src={rutaImagenNivel(nivel.imagenA3d)}
              alt={`${nivel.titulo ?? "Nivel"} - vista 3D`}
              fill
              className="object-cover"
            />
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] bg-black/70 text-purple-300 px-1.5 py-0.5 rounded">
              3D
            </span>
          </div>
        )}

        {/* DROPDOWN DE PRENDA, en la misma fila */}
        <div className="flex-1 min-w-[160px] self-center">
          <select
            value={tipoId}
            onChange={(e) => cambiarTipo(e.target.value)}
            className={inputClase}
          >
            <option value="">Seleccioná uno</option>
            {tipos.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* OPCIONES DINAMICAS SEGUN LA PRENDA */}
      {tipoElegido && (tipoElegido.requiereTalle || tipoElegido.requiereColor) && (
        <div className="mt-4 flex flex-wrap gap-4">
          {tipoElegido.requiereTalle && (
            <div className="flex-1 min-w-[140px]">
              <label className="text-xs text-purple-400 block mb-1">
                Talle
              </label>
              <select
                value={talle}
                onChange={(e) => setTalle(e.target.value)}
                className={inputClase}
              >
                <option value="">Seleccioná uno</option>
                {tipoElegido.tallesDisponibles.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          )}

          {tipoElegido.requiereColor && (
            <div className="flex-1 min-w-[140px]">
              <label className="text-xs text-purple-400 block mb-1">
                Color
              </label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className={inputClase}
              >
                <option value="">Seleccioná uno</option>
                {COLORES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      <button
        onClick={continuar}
        disabled={!puedeContinuar}
        className="
          mt-4
          w-full
          border
          border-purple-400
          px-6
          py-3
          rounded-lg
          text-purple-200
          disabled:opacity-30
          disabled:cursor-not-allowed
        "
      >
        Continuar
      </button>
    </div>
  );
}

export default function ListaNiveles({ niveles }: { niveles: Nivel[] }) {
  const { nivelUsuario, personaje } = useAuth();
  const [popup, setPopup] = useState<Nivel | null>(null);
  const [tipos, setTipos] = useState<TipoArticulo[]>([]);
  const [cargandoTipos, setCargandoTipos] = useState(true);

  useEffect(() => {
    fetch("/api/tipos-articulo-nivel")
      .then((r) => r.json())
      .then((data) => setTipos(data))
      .catch((err) => console.error("Error al traer tipos de artículo:", err))
      .finally(() => setCargandoTipos(false));
  }, []);

  const xpActual = personaje?.xpAcumulada ?? 0;

  function xpFaltante(nivel: Nivel) {
    const xpNecesaria = nivel.xpAcumulada ?? 0;
    return Math.max(0, xpNecesaria - xpActual);
  }

  const alcanzados = niveles
    .filter((n) => n.id <= nivelUsuario)
    .sort((a, b) => b.id - a.id);

  const proximoBloqueado = niveles
    .filter((n) => n.id > nivelUsuario)
    .sort((a, b) => a.id - b.id)[0];

  return (
    <>
      <div className="flex flex-col gap-8">
        {proximoBloqueado && (
          <div
            onClick={() => setPopup(proximoBloqueado)}
            className="
              grid
              grid-cols-1
              md:grid-cols-[220px_1fr]
              gap-6
              border
              border-purple-700
              rounded-xl
              bg-black/40
              p-5
              cursor-pointer
            "
          >
            <div className="flex flex-col items-center text-center gap-2">
              {proximoBloqueado.imagenA && (
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-purple-400 opacity-30">
                  <Image
                    src={rutaImagenNivel(proximoBloqueado.imagenA)}
                    alt={proximoBloqueado.titulo ?? `Nivel ${proximoBloqueado.id}`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <p className="text-purple-400 text-sm uppercase tracking-wide">
                Nivel {proximoBloqueado.id}
              </p>

              <p className="text-purple-100 font-bold">
                {proximoBloqueado.titulo ?? "Sin título"}
              </p>

              <span className="text-2xl">🔒</span>
              <p className="text-xs text-purple-500 uppercase tracking-wide">
                Próximo objetivo
              </p>
            </div>

            <div className="flex items-center justify-center">
              <p className="text-purple-500 text-sm text-center">
                Tocá para ver cuánta experiencia te falta.
              </p>
            </div>
          </div>
        )}

        {!cargandoTipos &&
          alcanzados.map((nivel) => (
            <TarjetaAlcanzada key={nivel.uuid} nivel={nivel} tipos={tipos} />
          ))}
      </div>

      {/* POPUP DE NIVEL BLOQUEADO */}
      {popup && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
          onClick={() => setPopup(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-sm w-full border border-purple-400 rounded-xl bg-black p-6 text-center"
          >
            <span className="text-4xl">🔒</span>

            <h3 className="mt-3 text-xl font-bold text-purple-100">
              Nivel {popup.id} bloqueado
            </h3>

            <p className="mt-2 text-purple-300">{popup.titulo ?? ""}</p>

            <p className="mt-4 text-purple-200">
              Te falta{" "}
              <span className="font-bold text-purple-100">
                {xpFaltante(popup).toLocaleString("es-AR")}
              </span>{" "}
              de experiencia para desbloquearlo.
            </p>

            <button
              onClick={() => setPopup(null)}
              className="mt-6 border border-purple-400 px-6 py-2 rounded-lg text-purple-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}