import Image from "next/image";
import Link from "next/link";
import CategoriaCard from "@/components/tienda/CategoriaCard";
import { obtenerCategoriasTienda } from "@/lib/tienda/productos";

// La base todavía no tiene íconos/banners cargados (vienen null),
// así que mientras tanto mapeamos por slug a las imágenes locales
// que ya existen en /public/tienda/iconos.
const IMAGEN_POR_SLUG: Record<string, string> = {
  remeras: "/tienda/iconos/remera.png",
  hoodies: "/tienda/iconos/hoodie.png",
  joggings: "/tienda/iconos/joggings.png",
  libros: "/tienda/iconos/libro.png",
  artefactos: "/tienda/iconos/medallon.png",
  tazas: "/tienda/iconos/tazas.png",
  stickers: "/tienda/iconos/stickers.png",
  "objetos-personalizados": "/tienda/iconos/objetos-personalizados.png",
};

const IMAGEN_POR_DEFECTO = "/tienda/iconos/accesorios.png";

export default async function CategoriaHome() {
  const categorias = await obtenerCategoriasTienda();

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {/* BOTON PRODUCTOS DE MI NIVEL */}

        <Link
          href="/tienda/niveles"
          className="
            flex
            items-center
            justify-center
            gap-4
            rounded-2xl
            border-2
            border-purple-300
            bg-purple-900/50
            py-6
            px-6
            text-2xl
            font-bold
            text-purple-100
            hover:bg-purple-800/60
            transition
          "
        >
          <Image
            src="/tienda/iconos/productos-nivel.png"
            alt="Productos de mi nivel"
            width={64}
            height={64}
            className="object-contain"
          />
          Productos de mi nivel
        </Link>

        {/* CATEGORIAS */}

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            gap-6
          "
        >
          {categorias.map((categoria) => (
            <CategoriaCard
              key={categoria.uuid}
              nombre={categoria.nombre}
              slug={categoria.slug}
              imagen={
                IMAGEN_POR_SLUG[categoria.slug] ?? IMAGEN_POR_DEFECTO
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}