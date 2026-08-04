import { notFound } from "next/navigation";

import CarruselProducto from "@/components/tienda/CarruselProducto";
import AgregarCarrito from "@/components/tienda/producto/AgregarCarrito";
import { obtenerProductoTienda } from "@/lib/tienda/productos";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

function formatear(valor: number | string) {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero.toLocaleString("es-AR") : valor;
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const producto: any = await obtenerProductoTienda(slug);

  if (!producto) {
    notFound();
  }

  const imagenes = producto.imagenes
    .slice()
    .sort((a: any, b: any) => a.orden - b.orden)
    .map((imagen: any) => imagen.url);

  const hayOferta =
    producto.precioOferta !== null &&
    producto.precioOferta !== undefined &&
    Number(producto.precioOferta) > 0 &&
    Number(producto.precioOferta) < Number(producto.precio);

  // El precio que realmente se cobra
  const precioFinal = hayOferta
    ? Number(producto.precioOferta)
    : Number(producto.precio);

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

          <div className="mt-6 flex items-baseline gap-4">
            {hayOferta ? (
              <>
                <span className="text-3xl font-bold text-purple-400">
                  ${formatear(producto.precioOferta)}
                </span>
                <span className="text-lg text-purple-600 line-through">
                  ${formatear(producto.precio)}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-purple-400">
                ${formatear(producto.precio)}
              </span>
            )}
          </div>

          <AgregarCarrito
            producto={producto}
            precioNumero={precioFinal}
            imagenPrincipal={imagenes[0] ?? null}
          />
        </div>
      </section>
    </main>
  );
}