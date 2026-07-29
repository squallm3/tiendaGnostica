import { notFound } from "next/navigation";

import CarruselProducto from "@/components/tienda/CarruselProducto";
import AgregarCarrito from "@/components/tienda/producto/AgregarCarrito";
import { obtenerProductoTienda } from "@/lib/tienda/productos";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const producto = await obtenerProductoTienda(slug);

  if (!producto) {
    notFound();
  }

  const imagenes = producto.imagenes
    .slice()
    .sort((a, b) => a.orden - b.orden)
    .map((imagen) => imagen.url);

  const precioNumero = Number(producto.precio);
  const precioFormateado = Number.isFinite(precioNumero)
    ? precioNumero.toLocaleString("es-AR")
    : producto.precio;

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <section
        className="
          max-w-5xl
          mx-auto
          grid
          grid-cols-1
          md:grid-cols-2
          gap-10
        "
      >
        <CarruselProducto imagenes={imagenes} />

        <div>
          <h1 className="text-3xl font-bold text-purple-100">
            {producto.nombre}
          </h1>

          <p className="mt-4 text-purple-200">
            {producto.descripcionCorta ?? "Próximamente disponible."}
          </p>

          {producto.descripcionLarga && (
            <p className="mt-4 text-purple-300 text-sm">
              {producto.descripcionLarga}
            </p>
          )}

          <p className="mt-6 text-2xl font-bold text-purple-400">
            ${precioFormateado}
          </p>

          <AgregarCarrito
            producto={producto}
            precioNumero={precioNumero}
            imagenPrincipal={imagenes[0] ?? null}
          />
        </div>
      </section>
    </main>
  );
}