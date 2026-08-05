"use client";

import Link from "next/link";
import CarruselProducto from "./CarruselProducto";
import { useAuth } from "@/lib/tienda/AuthContext";

type ProductoCardProps = {
  nombre: string;
  descripcion: string;
  precio: number | string;
  precioOferta?: number | string | null;
  imagenes: string[];
  categoriaNombre?: string;
  slug?: string;
  nivelRequerido?: number | null;
};

function formatear(valor: number | string) {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero.toLocaleString("es-AR") : valor;
}

export default function ProductoCard({
  nombre,
  descripcion,
  precio,
  precioOferta,
  imagenes,
  categoriaNombre,
  slug,
  nivelRequerido,
}: ProductoCardProps) {
  const { nivelUsuario } = useAuth();

  const nivelNecesario = nivelRequerido ?? 1;
  const bloqueado = nivelNecesario > nivelUsuario;
  const navegable = Boolean(slug) && !bloqueado;
  const href = `/tienda/productos/${slug}`;

  const hayOferta =
    precioOferta !== null &&
    precioOferta !== undefined &&
    Number(precioOferta) > 0 &&
    Number(precioOferta) < Number(precio);

  return (
    <div
      className="
        relative
        border
        border-purple-500
        rounded-xl
        bg-black/40
        p-4
        overflow-hidden
      "
    >
      <div className={bloqueado ? "opacity-30" : ""}>
        {/* IMAGEN */}
        {navegable ? (
          <Link href={href} className="block">
            <CarruselProducto imagenes={imagenes} />
          </Link>
        ) : (
          <CarruselProducto imagenes={imagenes} />
        )}

        {categoriaNombre && (
          <p className="mt-4 text-xs uppercase tracking-wide text-purple-400">
            {categoriaNombre}
          </p>
        )}

        {/* NOMBRE */}
        {navegable ? (
          <Link href={href}>
            <h3 className="mt-1 text-xl font-bold text-purple-100 hover:text-purple-300 transition">
              {nombre}
            </h3>
          </Link>
        ) : (
          <h3 className="mt-1 text-xl font-bold text-purple-100">
            {nombre}
          </h3>
        )}

        <p className="mt-2 text-purple-200">{descripcion}</p>

        <div className="mt-3 flex items-baseline gap-3">
          {hayOferta ? (
            <>
              <span className="text-purple-400 font-bold text-lg">
                ${formatear(precioOferta!)}
              </span>
              <span className="text-purple-600 line-through text-sm">
                ${formatear(precio)}
              </span>
            </>
          ) : (
            <span className="text-purple-400 font-bold text-lg">
              ${formatear(precio)}
            </span>
          )}
        </div>
      </div>

      {bloqueado ? (
        <div className="mt-4 flex flex-col items-center gap-1 text-center">
          <span className="text-3xl">🔒</span>
          <span className="text-sm text-purple-300">
            Alcanzá el nivel {nivelNecesario} para desbloquear
          </span>
        </div>
      ) : slug ? (
        <Link
          href={href}
          className="
            mt-4
            block
            text-center
            border
            border-purple-400
            px-4
            py-2
            rounded-lg
            text-purple-200
          "
        >
          VER DETALLE
        </Link>
      ) : (
        <button
          disabled
          className="
            mt-4
            w-full
            border
            border-purple-400
            px-4
            py-2
            rounded-lg
            text-purple-200
            opacity-40
            cursor-not-allowed
          "
        >
          VER DETALLE
        </button>
      )}
    </div>
  );
}