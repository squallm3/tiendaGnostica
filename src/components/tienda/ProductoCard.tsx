type ProductoCardProps = {
  nombre: string;
  descripcion: string;
  precio: number;
};

export default function ProductoCard({
  nombre,
  descripcion,
  precio,
}: ProductoCardProps) {
  return (
    <div className="border border-amber-500 p-4 hover:bg-amber-950 transition">

      <h3 className="text-xl">
        📦 {nombre}
      </h3>

      <p className="mt-2 text-amber-200">
        {descripcion}
      </p>

      <p className="mt-3 text-amber-400">
        Precio: ${precio}
      </p>

      <button className="mt-4 border border-amber-400 px-4 py-2">
        VER DETALLE
      </button>

    </div>
  );
}