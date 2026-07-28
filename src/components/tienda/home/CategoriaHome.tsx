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
};

const IMAGEN_POR_DEFECTO = "/tienda/iconos/accesorios.png";

export default async function CategoriaHome() {
  const categorias = await obtenerCategoriasTienda();

  return (
    <div className="flex justify-center">
      <div
        className="
          w-full
          max-w-3xl
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
  );
}