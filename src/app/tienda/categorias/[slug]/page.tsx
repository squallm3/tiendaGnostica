import { notFound } from "next/navigation";

import HeaderNav from "@/components/tienda/HeaderNav";
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
    <main className="min-h-screen bg-black text-white">
      <HeaderNav titulo={categoria.nombre} />

      <section className="max-w-7xl mx-auto px-6 pb-10">
        <MercaderBanner categoria={categoria.slug} />

        {categoria.productos.length === 0 ? (
          <p className="mt-10 text-purple-300">
            Todavía no hay productos cargados en esta categoría.
          </p>
        ) : (
          <div
            className="
              mt-10
              grid
              grid-cols-1
              md:grid-cols-3
              gap-6
            "
          >
            {categoria.productos.map((producto: any) => (
              <ProductoCard
                key={producto.uuid}
                slug={producto.slug}
                nombre={producto.nombre}
                descripcion={
                  producto.descripcionCorta ?? "Próximamente disponible."
                }
                precio={producto.precio}
                precioOferta={producto.precioOferta}
                imagenes={producto.imagenes}
                nivelRequerido={producto.nivelRequerido}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}