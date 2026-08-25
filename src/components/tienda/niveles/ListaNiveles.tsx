"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/tienda/AuthContext";
import { useCart } from "@/lib/tienda/CartContext";

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
  precio: string;
}

const COLORES = ["Negro", "Blanco", "Rojo", "Violeta"];
const VARIANTE_GENERICA_ID = 34;

function rutaImagenNivel(valor: string) {
  return valor.startsWith("/uploads") ? valor : `/tienda/niveles/${valor}`;
}

function MiniaturaConLupa({
  src,
  alt,
  seleccionada,
  onSeleccionar,
  onAmpliar,
  seleccionable,
}: {
  src: string;
  alt: string;
  seleccionada?: boolean;
  onSeleccionar?: () => void;
  onAmpliar: () => void;
  seleccionable: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`relative w-24 sm:w-28 aspect-[4/5] shrink-0 rounded-lg overflow-hidden border-2 transition ${
          seleccionada ? "border-purple-300" : "border-purple-700"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover cursor-zoom-in"
          onClick={onAmpliar}
        />

        {seleccionada && (
          <span className="absolute top-1 right-1 bg-purple-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center z-10 pointer-events-none">
            ✓
          </span>
        )}
      </div>

      {seleccionable && (
        <button
          type="button"
          onClick={onSeleccionar}
          className={`text-xs px-2 py-1 rounded-lg border ${
            seleccionada
              ? "border-purple-300 text-purple-100 bg-purple-900/50"
              : "border-purple-600 text-purple-300"
          }`}
        >
          {seleccionada ? "Seleccionada" : "Seleccionar"}
        </button>
      )}
    </div>
  );
}

function TarjetaAlcanzada({
  nivel,
  tipos,
  onAmpliar,
}: {
  nivel: Nivel;
  tipos: TipoArticulo[];
  onAmpliar: (src: string, alt: string) => void;
}) {
  const router = useRouter();
  const { agregarAlCarrito } = useCart();

  const [seleccion, setSeleccion] = useState<"a" | "b" | null>(null);
  const [tipoId, setTipoId] = useState("");
  const [talle, setTalle] = useState("");
  const [color, setColor] = useState("");

  const tipoElegido = tipos.find((t) => String(t.id) === tipoId) ?? null;

  function cambiarTipo(valor: string) {
    setTipoId(valor);
    setTalle("");
    setColor("");
  }

  const puedeContinuar =
    seleccion !== null &&
    tipoElegido !== null &&
    (!tipoElegido.requiereTalle || talle !== "") &&
    (!tipoElegido.requiereColor || color !== "");

  function continuar() {
    if (!tipoElegido || !seleccion) return;

    const imagenElegida = seleccion === "a" ? nivel.imagenA : nivel.imagenB;

    const idItem = `nivel-${nivel.id}-${tipoElegido.id}-${seleccion}-${talle || "sin-talle"}-${color || "sin-color"}`;

    agregarAlCarrito({
      id: idItem,
      productoId: 0,
      varianteId: VARIANTE_GENERICA_ID,
      nombre: `${tipoElegido.nombre} - Nivel ${nivel.id} (${nivel.titulo ?? ""})`,
      precioUnitario: Number(tipoElegido.precio) || 0,
      imagen: imagenElegida ? rutaImagenNivel(imagenElegida) : null,
      talle: talle || null,
      color: color || null,
      personalizacion: {
        nivelId: nivel.id,
        diseno: seleccion,
        tipoArticuloId: tipoElegido.id,
        tipoArticuloNombre: tipoElegido.nombre,
        talle: talle || null,
        color: color || null,
      },
    });

    router.push("/tienda/carrito");
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
        {nivel.imagenA && (
          <MiniaturaConLupa
            src={rutaImagenNivel(nivel.imagenA)}
            alt={`${nivel.titulo ?? "Nivel"} - diseño A`}
            seleccionable
            seleccionada={seleccion === "a"}
            onSeleccionar={() => setSeleccion("a")}
            onAmpliar={() =>
              onAmpliar(
                rutaImagenNivel(nivel.imagenA!),
                `${nivel.titulo ?? "Nivel"} - diseño A`
              )
            }
          />
        )}

        {nivel.imagenB && (
          <MiniaturaConLupa
            src={rutaImagenNivel(nivel.imagenB)}
            alt={`${nivel.titulo ?? "Nivel"} - diseño B`}
            seleccionable
            seleccionada={seleccion === "b"}
            onSeleccionar={() => setSeleccion("b")}
            onAmpliar={() =>
              onAmpliar(
                rutaImagenNivel(nivel.imagenB!),
                `${nivel.titulo ?? "Nivel"} - diseño B`
              )
            }
          />
        )}

        {nivel.imagenA3d && (
          <div className="relative">
            <MiniaturaConLupa
              src={rutaImagenNivel(nivel.imagenA3d)}
              alt={`${nivel.titulo ?? "Nivel"} - vista 3D`}
              seleccionable={false}
              onAmpliar={() =>
                onAmpliar(
                  rutaImagenNivel(nivel.imagenA3d!),
                  `${nivel.titulo ?? "Nivel"} - vista 3D`
                )
              }
            />
            <span className="absolute top-1 right-1 text-[9px] bg-black/70 text-purple-300 px-1.5 py-0.5 rounded z-10 pointer-events-none">
              3D
            </span>
          </div>
        )}

        <div className="flex-1 min-w-[160px] self-center">
          <select
            value={tipoId}
            onChange={(e) => cambiarTipo(e.target.value)}
            className={inputClase}
          >
            <option value="">Seleccioná uno</option>
            {tipos.map((t) => (
              <option key={t.id} value={t.id}>
                {t.nombre} - ${Number(t.precio).toLocaleString("es-AR")}
              </option>
            ))}
          </select>
        </div>
      </div>

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
  const [imagenAmpliada, setImagenAmpliada] = useState<{
    src: string;
    alt: string;
  } | null>(null);

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
            <TarjetaAlcanzada
              key={nivel.uuid}
              nivel={nivel}
              tipos={tipos}
              onAmpliar={(src, alt) => setImagenAmpliada({ src, alt })}
            />
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

      {/* MODAL DE IMAGEN AMPLIADA */}
      {imagenAmpliada && (
        <div
          className="fixed inset-0 z-[60] bg-black/85 flex items-center justify-center p-6"
          onClick={() => setImagenAmpliada(null)}
        >
          <div
            className="relative w-full max-w-md aspect-[4/5]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imagenAmpliada.src}
              alt={imagenAmpliada.alt}
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={() => setImagenAmpliada(null)}
            className="fixed top-6 right-6 border border-purple-400 w-10 h-10 rounded-full text-purple-200 text-xl"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}