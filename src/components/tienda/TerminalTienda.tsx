import ProductoCard from "./ProductoCard";
import CategoriaCard from "./CategoriaCard";
import { obtenerProductos } from "@/lib/api";

export default async function TerminalTienda() {
  const productos = await obtenerProductos();

  const categorias = [
    {
      nombre: "Remeras",
      slug: "remeras",
      imagen: "/tienda/iconos/remera.png",
    },
    {
      nombre: "Hoodies",
      slug: "hoodies",
      imagen: "/tienda/iconos/hoodie.png",
    },
    {
      nombre: "Joggings",
      slug: "joggings",
      imagen: "/tienda/iconos/joggings.png",
    },
    {
      nombre: "Artefactos",
      slug: "artefactos",
      imagen: "/tienda/iconos/medallon.png",
    },
  ];

  return (
    <section className="min-h-screen bg-black text-amber-400 font-mono p-8">
      <div className="max-w-5xl mx-auto">
        <header className="border border-amber-500 p-6 mb-8">
          <h1 className="text-3xl">
            🧙 ESCUELA DE LOS HAIKUS GNÓSTICOS 🧙
          </h1>

          <p className="mt-4 text-amber-200">
            TERMINAL DEL MERCADER
          </p>

          <p className="mt-2 text-sm text-amber-500">
            Sistema online... cargando inventario...
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categorias.map((categoria) => (
            <CategoriaCard
              key={categoria.slug}
              {...categoria}
            />
          ))}
        </section>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {productos.map((producto: any) => (
            <ProductoCard
              key={producto.id}
              nombre={producto.nombre}
              descripcion={producto.descripcion}
              precio={producto.precio}
              imagenes={producto.imagenes}
            />
          ))}
        </section>
      </div>
    </section>
  );
}