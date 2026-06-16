type CategoriaCardProps = {
  nombre: string;
  icono: string;
  descripcion: string;
};

export default function CategoriaCard({
  nombre,
  icono,
  descripcion,
}: CategoriaCardProps) {
  return (
    <div className="border border-amber-500 p-6 hover:bg-amber-950 transition">

      <h2 className="text-2xl">
        {icono} {nombre}
      </h2>

      <p className="mt-3 text-amber-200">
        {descripcion}
      </p>

      <button className="mt-5 border border-amber-400 px-4 py-2">
        INGRESAR
      </button>

    </div>
  );
}