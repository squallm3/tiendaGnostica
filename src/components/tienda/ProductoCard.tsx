import Link from "next/link";
import CarruselProducto from "./CarruselProducto";

type ProductoCardProps = {
  nombre: string;
  descripcion: string;
  precio: number | string;
  imagenes: string[];
  categoriaNombre?: string;
  slug?: string;
};

export default function ProductoCard({
  nombre,
  descripcion,
  precio,
  imagenes,
  categoriaNombre,
  slug,
}: ProductoCardProps) {
  const precioNumero = Number(precio);
  const precioFormateado = Number.isFinite(precioNumero)
    ? precioNumero.toLocaleString("es-AR")
    : precio;

  return (
    <div
      className="
        border
        border-purple-500
        rounded-xl
        bg-black/40
        p-4
        overflow-hidden
      "
    >
      <CarruselProducto imagenes={imagenes} />

      {categoriaNombre && (
        <p
          className="
            mt-4
            text-xs
            uppercase
            tracking-wide
            text-purple-400
          "
        >
          {categoriaNombre}
        </p>
      )}

      <h3
        className="
          mt-1
          text-xl
          font-bold
          text-purple-100
        "
      >
        {nombre}
      </h3>

      <p
        className="
          mt-2
          text-purple-200
        "
      >
        {descripcion}
      </p>

      <p
        className="
          mt-3
          text-purple-400
          font-bold
        "
      >
        ${precioFormateado}
      </p>

      {slug ? (
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