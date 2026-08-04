"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/tienda/AuthContext";

interface ProductoNivel {
  uuid: string;
  nombre: string;
  slug: string;
  precio: string;
  imagenes: string[];
  categoriaNombre: string | null;
}

interface Nivel {
  id: number;
  uuid: string;
  titulo: string | null;
  artefacto: string | null;
  imagenA: string | null;
  xpAcumulada: number | null;
  productos: ProductoNivel[];
}

export default function ListaNiveles({ niveles }: { niveles: Nivel[] }) {
  const { nivelUsuario, personaje } = useAuth();
  const [popup, setPopup] = useState<Nivel | null>(null);

  const xpActual = personaje?.xpAcumulada ?? 0;

  function xpFaltante(nivel: Nivel) {
    const xpNecesaria = nivel.xpAcumulada ?? 0;
    return Math.max(0, xpNecesaria - xpActual);
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        {niveles.map((nivel) => {
          const bloqueado = nivel.id > nivelUsuario;

          return (
            <div
              key={nivel.uuid}
              onClick={() => bloqueado && setPopup(nivel)}
              className={`
                grid
                grid-cols-1
                md:grid-cols-[220px_1fr]
                gap-6
                border
                border-purple-700
                rounded-xl
                bg-black/40
                p-5
                ${bloqueado ? "cursor-pointer" : ""}
              `}
            >
              {/* NIVEL */}
              <div className="flex flex-col items-center text-center gap-2">
                {nivel.imagenA && (
                  <div
                    className={`relative w-24 h-24 rounded-full overflow-hidden border-2 border-purple-400 ${
                      bloqueado ? "opacity-30" : ""
                    }`}
                  >
                    <Image
                      src={`/tienda/niveles/${nivel.imagenA}`}
                      alt={nivel.titulo ?? `Nivel ${nivel.id}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <p className="text-purple-400 text-sm uppercase tracking-wide">
                  Nivel {nivel.id}
                </p>

                <p className="text-purple-100 font-bold">
                  {nivel.titulo ?? "Sin título"}
                </p>

                {bloqueado && <span className="text-2xl">🔒</span>}
              </div>

              {/* PRODUCTOS */}
              <div>
                {nivel.productos.length === 0 ? (
                  <p className="text-purple-500 text-sm">
                    Todavía no hay productos en este nivel.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {nivel.productos.map((producto) => {
                      const contenido = (
                        <div
                          className={`border border-purple-600 rounded-lg p-2 ${
                            bloqueado ? "opacity-30" : ""
                          }`}
                        >
                          <div className="relative w-full aspect-square bg-black rounded overflow-hidden">
                            {producto.imagenes[0] ? (
                              <Image
                                src={producto.imagenes[0]}
                                alt={producto.nombre}
                                fill
                                className="object-contain"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-purple-500 text-xs">
                                Sin imagen
                              </div>
                            )}
                          </div>

                          <p className="mt-2 text-xs text-purple-200 line-clamp-2">
                            {producto.nombre}
                          </p>

                          <p className="text-xs text-purple-400 font-bold">
                            ${Number(producto.precio).toLocaleString("es-AR")}
                          </p>
                        </div>
                      );

                      return bloqueado ? (
                        <div key={producto.uuid}>{contenido}</div>
                      ) : (
                        <Link
                          key={producto.uuid}
                          href={`/tienda/productos/${producto.slug}`}
                        >
                          {contenido}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
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

            <p className="mt-2 text-purple-300">
              {popup.titulo ?? ""}
            </p>

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