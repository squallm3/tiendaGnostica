import ProductoCard from "@/components/tienda/ProductoCard";
import { obtenerProductosMasVendidos } from "@/lib/api";

export default async function MasVendidos() {
  let productos: any[] = [];

  try {
    productos = await obtenerProductosMasVendidos(4);
  } catch (error) {
    console.error("Error al obtener los más vendidos:", error);
    return null;
  }

  // Si todavía no hay ventas reales, no mostramos la sección.
  if (!productos || productos.length === 0) {
    return null;
  }

  return (
    <section
      className="
        max-w-7xl
        mx-auto
        mt-24
      "
    >
      <h2
        className="
          text-4xl
          font-bold
          text-center
          text-purple-200
          mb-10
        "
      >
        Los más vendidos
      </h2>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-8
        "
      >
        {productos.map((producto: any) => (
          <ProductoCard
            key={producto.uuid}
            slug={producto.slug}
            nombre={producto.nombre}
            descripcion={
              producto.descripcionCorta ?? "Próximamente disponible."
            }
            precio={Number(producto.precio)}
            imagenes={producto.imagenes}
            categoriaNombre={producto.categoriaNombre}
          />
        ))}
      </div>
    </section>
  );
}