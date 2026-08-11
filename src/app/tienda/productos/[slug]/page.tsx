import { notFound } from "next/navigation";

import HeaderNav from "@/components/tienda/HeaderNav";
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

  // El backend ya devuelve fotos y video mezclados, ordenados con el
  // video al final. Los separamos: imagenes para el carrusel de fotos,
  // y el link del video aparte.
  const imagenes = producto.imagenes
    .filter((img: any) => img.tipo !== "video")
    .slice()
    .sort((a: any, b: any) => a.orden - b.orden)
    .map((imagen: any) => imagen.url);

  const videoItem = producto.imagenes.find((img: any) => img.tipo === "video");
  const videoUrl = videoItem?.url ?? null;

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
    <main className="min-h-screen bg-black text-white">
      <HeaderNav titulo={producto.nombre} />

      <section
        className="
          max-w-5xl
          mx-auto
          px-6
          pb-10
          grid
          grid-cols-1
          md:grid-cols-2
          gap-10
        "
      >
        <CarruselProducto imagenes={imagenes} videoUrl={videoUrl} />

        <div>
          <h2 className="text-3xl font-bold text-purple-100">
            {producto.nombre}
          </h2>

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