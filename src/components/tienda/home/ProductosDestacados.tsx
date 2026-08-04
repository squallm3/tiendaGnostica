import ProductoCard from "@/components/tienda/ProductoCard";
import { obtenerProductos } from "@/lib/api";

const ORDEN_RAREZA: Record<string, number> = {
  legendario: 0,
  epico: 1,
  raro: 2,
  comun: 3,
};

export default async function ProductosDestacados() {
  const productos = await obtenerProductos();

  const productosOrdenados = [...productos].sort((a: any, b: any) => {
    const rarezaA = ORDEN_RAREZA[a.rareza] ?? 99;
    const rarezaB = ORDEN_RAREZA[b.rareza] ?? 99;
    return rarezaA - rarezaB;
  });

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
        {productosOrdenados.map((producto: any) => (
          <ProductoCard
            key={producto.uuid}
            slug={producto.slug}
            nombre={producto.nombre}
            descripcion={
              producto.descripcionCorta ??
              "Próximamente disponible."
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