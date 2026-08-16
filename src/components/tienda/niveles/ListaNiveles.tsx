"use client";

import Image from "next/image";
import { useState } from "react";
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

const OPCIONES_PRENDA = [
  "Remera",
  "Gorra",
  "Hoodie",
  "Jogging",
  "Taza",
  "Sticker",
  "Otro",
];

function TarjetaAlcanzada({ nivel }: { nivel: Nivel }) {
  const [seleccion, setSeleccion] = useState<"a" | "b" | null>(null);
  const [prenda, setPrenda] = useState("");

  const puedeContinuar = seleccion !== null && prenda !== "";

  function continuar() {
    // La segunda pantalla del flujo se define mas adelante.
    console.log("Continuar con:", {
      nivelId: nivel.id,
      diseno: seleccion,
      prenda,
    });
  }

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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* IMAGEN A */}
        {nivel.imagenA && (
          <button
            type="button"
            onClick={() => setSeleccion("a")}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
              seleccion === "a" ? "border-purple-300" : "border-purple-700"
            }`}
          >
            <Image
              src={`/tienda/niveles/${nivel.imagenA}`}
              alt={`${nivel.titulo ?? "Nivel"} - diseño A`}
              fill
              className="object-cover"
            />
            {seleccion === "a" && (
              <span className="absolute top-2 right-2 bg-purple-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
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
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
              seleccion === "b" ? "border-purple-300" : "border-purple-700"
            }`}
          >
            <Image
              src={`/tienda/niveles/${nivel.imagenB}`}
              alt={`${nivel.titulo ?? "Nivel"} - diseño B`}
              fill
              className="object-cover"
            />
            {seleccion === "b" && (
              <span className="absolute top-2 right-2 bg-purple-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                ✓
              </span>
            )}
          </button>
        )}

        {/* IMAGEN 3D (solo vista, no seleccionable) */}
        {nivel.imagenA3d && (
          <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-purple-800">
            <Image
              src={`/tienda/niveles/${nivel.imagenA3d}`}
              alt={`${nivel.titulo ?? "Nivel"} - vista 3D`}
              fill
              className="object-cover"
            />
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] bg-black/70 text-purple-300 px-2 py-0.5 rounded">
              Vista 3D
            </span>
          </div>
        )}
      </div>

      <div className="mt-5">
        <select
          value={prenda}
          onChange={(e) => setPrenda(e.target.value)}
          className="w-full bg-black border border-purple-600 rounded-lg px-3 py-2 text-purple-100 outline-none"
        >
          <option value="">Seleccioná uno</option>
          {OPCIONES_PRENDA.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      </div>

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

  const xpActual = personaje?.xpAcumulada ?? 0;

  function xpFaltante(nivel: Nivel) {
    const xpNecesaria = nivel.xpAcumulada ?? 0;
    return Math.max(0, xpNecesaria - xpActual);
  }

  // Niveles ya alcanzados, del mas alto al mas bajo
  const alcanzados = niveles
    .filter((n) => n.id <= nivelUsuario)
    .sort((a, b) => b.id - a.id);

  // Solo el proximo nivel bloqueado, como objetivo
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
                    src={`/tienda/niveles/${proximoBloqueado.imagenA}`}
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

        {alcanzados.map((nivel) => (
          <TarjetaAlcanzada key={nivel.uuid} nivel={nivel} />
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