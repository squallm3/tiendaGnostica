import ProductoCard from "@/components/tienda/ProductoCard";

export default function ProductosDestacados() {
  const imagenesDemo = [
    "/tienda/mercader/remeras/01.jpg",
    "/tienda/mercader/remeras/02.jpg",
    "/tienda/mercader/remeras/03.jpg",
    "/tienda/mercader/remeras/04.jpg",
    "/tienda/mercader/remeras/05.jpg",
  ];

  const productos = [
    {
      nombre: "Remera Haiku",
      descripcion: "Diseño oficial de la Escuela.",
      precio: 25000,
      imagenes: imagenesDemo,
    },
    {
      nombre: "Remera Lobo",
      descripcion: "La primera prenda del iniciado.",
      precio: 28000,
      imagenes: imagenesDemo,
    },
    {
      nombre: "Hoodie Valis",
      descripcion: "Protección para los días fríos.",
      precio: 48000,
      imagenes: imagenesDemo,
    },
    {
      nombre: "Medallón Gnóstico",
      descripcion: "Artefacto de poder.",
      precio: 32000,
      imagenes: imagenesDemo,
    },
  ];

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
        {productos.map((producto) => (
          <ProductoCard
            key={producto.nombre}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            precio={producto.precio}
            imagenes={producto.imagenes}
          />
        ))}
      </div>
    </section>
  );
}