"use client";

import Image from "next/image";
import { useState } from "react";

interface CarruselProductoProps {
  imagenes: string[];
}

export default function CarruselProducto({
  imagenes,
}: CarruselProductoProps) {
  const [indice, setIndice] = useState(0);

  const hayImagenes = imagenes && imagenes.length > 0;

  // Frenamos el click para que no dispare el link que envuelve al carrusel
  function anterior(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIndice(indice === 0 ? imagenes.length - 1 : indice - 1);
  }

  function siguiente(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIndice(indice === imagenes.length - 1 ? 0 : indice + 1);
  }

  return (
    <div
      className="
        relative
        w-full
        aspect-[4/5]
        overflow-hidden
        rounded-xl
        bg-black
      "
    >
      {hayImagenes ? (
        <Image
          src={imagenes[indice]}
          alt="Producto"
          fill
          className="object-contain"
        />
      ) : (
        <div
          className="
            w-full
            h-full
            flex
            items-center
            justify-center
            text-purple-400
            text-sm
          "
        >
          Sin imagen
        </div>
      )}

      {hayImagenes && imagenes.length > 1 && (
        <>
          <button
            type="button"
            onClick={anterior}
            aria-label="Imagen anterior"
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              z-10

              bg-black/60
              border
              border-purple-400

              rounded-full

              w-10
              h-10

              text-purple-200
            "
          >
            ‹
          </button>

          <button
            type="button"
            onClick={siguiente}
            aria-label="Imagen siguiente"
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              z-10

              bg-black/60
              border
              border-purple-400

              rounded-full

              w-10
              h-10

              text-purple-200
            "
          >
            ›
          </button>

          {/* Indicador de posicion */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {imagenes.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i === indice ? "bg-purple-300" : "bg-purple-700"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}