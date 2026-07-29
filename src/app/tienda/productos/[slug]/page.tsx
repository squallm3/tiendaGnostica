import { notFound } from "next/navigation";

import CarruselProducto from "@/components/tienda/CarruselProducto";
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

          {producto.variantes.length > 0 && (
            <div className="mt-6">
              <p className="text-purple-200 mb-2">Elegí una opción:</p>

              <div className="flex flex-wrap gap-3">
                {producto.variantes.map((variante) => (
                  <span
                    key={variante.uuid}
                    className="
                      border
                      border-purple-400
                      px-3
                      py-1
                      rounded-lg
                      text-sm
                      text-purple-200
                    "
                  >
                    {[variante.talle, variante.color]
                      .filter(Boolean)
                      .join(" / ") || "Única"}
                    {variante.stock === 0 && " (sin stock)"}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            className="
              mt-8
              border
              border-purple-400
              px-6
              py-3
              rounded-lg
              text-purple-200
            "
          >
            AGREGAR AL CARRITO
          </button>
        </div>
      </section>
    </main>
  );
}