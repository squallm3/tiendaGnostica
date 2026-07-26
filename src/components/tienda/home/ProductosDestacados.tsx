import ProductoCard from "@/components/tienda/ProductoCard";
import { obtenerProductos } from "@/lib/api";

export default async function ProductosDestacados() {
  const productos = await obtenerProductos();

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
        Productos Destacados
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
            nombre={producto.nombre}
            descripcion={
              producto.descripcionCorta ??
              "Próximamente disponible."
            }
            precio={Number(producto.precio)}
            imagenes={producto.imagenes}
          />
        ))}
      </div>
    </section>
  );
}