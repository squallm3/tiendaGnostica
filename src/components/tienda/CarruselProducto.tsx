"use client";

import Image from "next/image";
import { useState } from "react";

interface CarruselProductoProps {
  imagenes: string[];
  videoUrl?: string | null;
}

// Extrae el ID de video de distintos formatos de link de YouTube
function obtenerIdYoutube(url: string): string | null {
  const patrones = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?]+)/,
    /(?:youtube\.com\/embed\/)([^?]+)/,
    /(?:youtube\.com\/shorts\/)([^?]+)/,
  ];

  for (const patron of patrones) {
    const match = url.match(patron);
    if (match) return match[1];
  }

  return null;
}

export default function CarruselProducto({
  imagenes,
  videoUrl,
}: CarruselProductoProps) {
  const [indice, setIndice] = useState(0);

  const idVideo = videoUrl ? obtenerIdYoutube(videoUrl) : null;

  // Armamos la lista de slides: fotos primero, video al final si existe
  type Slide = { tipo: "foto"; url: string } | { tipo: "video"; idVideo: string };

  const slides: Slide[] = [
    ...imagenes.map((url): Slide => ({ tipo: "foto", url })),
    ...(idVideo ? [{ tipo: "video" as const, idVideo }] : []),
  ];

  const haySlides = slides.length > 0;
  const slideActual = haySlides ? slides[indice] : null;

  function anterior(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIndice(indice === 0 ? slides.length - 1 : indice - 1);
  }

  function siguiente(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIndice(indice === slides.length - 1 ? 0 : indice + 1);
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
      {slideActual?.tipo === "foto" && (
        <Image
          src={slideActual.url}
          alt="Producto"
          fill
          className="object-contain"
        />
      )}

      {slideActual?.tipo === "video" && (
        <iframe
          src={`https://www.youtube.com/embed/${slideActual.idVideo}`}
          title="Video del producto"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      )}

      {!haySlides && (
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

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={anterior}
            aria-label="Anterior"
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
            aria-label="Siguiente"
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
            {slides.map((slide, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i === indice ? "bg-purple-300" : "bg-purple-700"
                } ${slide.tipo === "video" ? "ring-1 ring-red-500" : ""}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}