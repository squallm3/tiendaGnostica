import HeaderTienda from "@/components/tienda/categoria/HeaderTienda";
import CategoriaCard from "@/components/tienda/CategoriaCard";
import { obtenerCategoriasTienda } from "@/lib/tienda/productos";

// Igual que en CategoriaHome: la base todavia no tiene iconos/banners
// cargados, mapeamos por slug a las imagenes locales existentes.
const IMAGEN_POR_SLUG: Record<string, string> = {
  remeras: "/tienda/iconos/remera.png",
  hoodies: "/tienda/iconos/hoodie.png",
  joggings: "/tienda/iconos/joggings.png",
  libros: "/tienda/iconos/libro.png",
  artefactos: "/tienda/iconos/medallon.png",
};

const IMAGEN_POR_DEFECTO = "/tienda/iconos/accesorios.png";

export default async function CategoriasPage() {
  const categorias = await obtenerCategoriasTienda();

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <HeaderTienda />

      <section className="max-w-7xl mx-auto mt-10">
        <h1 className="text-3xl font-bold text-purple-100 mb-8">
          Categorías
        </h1>

        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
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
      </section>
    </main>
  );
}