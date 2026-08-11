import ProductoCard from "@/components/tienda/ProductoCard";
import { obtenerProductosDestacados } from "@/lib/api";

export default async function ProductosDestacados() {
  const productos = await obtenerProductosDestacados();

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
        Destacados
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
              producto.descripcionCorta ??
              "Próximamente disponible."
            }
            precio={producto.precio}
            precioOferta={producto.precioOferta}
            imagenes={producto.imagenes}
            categoriaNombre={producto.categoriaNombre}
            nivelRequerido={producto.nivelRequerido}
          />
        ))}
      </div>
    </section>
  );
}