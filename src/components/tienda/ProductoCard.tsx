"use client";

import Link from "next/link";
import CarruselProducto from "./CarruselProducto";
import { useAuth } from "@/lib/tienda/AuthContext";

type ProductoCardProps = {
  nombre: string;
  descripcion: string;
  precio: number | string;
  imagenes: string[];
  categoriaNombre?: string;
  slug?: string;
  nivelRequerido?: number | null;
};

export default function ProductoCard({
  nombre,
  descripcion,
  precio,
  imagenes,
  categoriaNombre,
  slug,
  nivelRequerido,
}: ProductoCardProps) {
  const { nivelUsuario } = useAuth();

  const nivelNecesario = nivelRequerido ?? 1;
  const bloqueado = nivelNecesario > nivelUsuario;

  const precioNumero = Number(precio);
  const precioFormateado = Number.isFinite(precioNumero)
    ? precioNumero.toLocaleString("es-AR")
    : precio;

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
        <CarruselProducto imagenes={imagenes} />

        {categoriaNombre && (
          <p className="mt-4 text-xs uppercase tracking-wide text-purple-400">
            {categoriaNombre}
          </p>
        )}

        <h3 className="mt-1 text-xl font-bold text-purple-100">
          {nombre}
        </h3>

        <p className="mt-2 text-purple-200">{descripcion}</p>

        <p className="mt-3 text-purple-400 font-bold">
          ${precioFormateado}
        </p>
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
          href={`/tienda/productos/${slug}`}
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