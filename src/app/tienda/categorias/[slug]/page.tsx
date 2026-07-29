import { notFound } from "next/navigation";

import HeaderCategoria from "@/components/tienda/categoria/HeaderCategoria";
import MercaderBanner from "@/components/tienda/categoria/MercaderBanner";
import ProductoCard from "@/components/tienda/ProductoCard";
import { obtenerCategoriaTienda } from "@/lib/tienda/productos";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params;
  const categoria = await obtenerCategoriaTienda(slug);

  if (!categoria) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <section className="max-w-7xl mx-auto">
        <HeaderCategoria titulo={categoria.nombre} />

        <div className="mt-8">
          <MercaderBanner categoria={categoria.slug} />
        </div>

        <div
          className="
            mt-10
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "
        >
          {categoria.productos.map((producto) => (
            <ProductoCard
              key={producto.uuid}
              nombre={producto.nombre}
              descripcion={
                producto.descripcionCorta ?? "Próximamente disponible."
              }
              precio={producto.precio}
              imagenes={producto.imagenes}
            />
          ))}
        </div>
      </section>
    </main>
  );
}