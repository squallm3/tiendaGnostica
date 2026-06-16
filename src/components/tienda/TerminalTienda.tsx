import CategoriaCard from "./CategoriaCard";

export default function TerminalTienda() {
  const categorias = [
    {
      nombre: "REMERAS",
      icono: "👕",
      descripcion: "Indumentaria oficial de la Escuela",
    },
    {
      nombre: "HOODIES",
      icono: "🥋",
      descripcion: "Abrigos para los iniciados",
    },
    {
      nombre: "JOGGINGS",
      icono: "👖",
      descripcion: "Equipamiento cómodo para el camino",
    },
    {
      nombre: "ARTEFACTOS",
      icono: "🧙‍♂️",
      descripcion: "Objetos especiales del mercader",
    },
  ];

  return (
    <section className="min-h-screen bg-black text-amber-400 font-mono p-8">

      <div className="max-w-5xl mx-auto">

        <header className="border border-amber-500 p-6 mb-8">

          <h1 className="text-3xl">
            🧙 ESCUELA DE LOS HAIKUS GNÓSTICOS 🧙
          </h1>

          <p className="mt-4 text-amber-200">
            TERMINAL DEL MERCADER
          </p>

          <p className="mt-2 text-sm text-amber-500">
            Sistema online... cargando inventario...
          </p>

        </header>


        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {categorias.map((categoria) => (
            <CategoriaCard
              key={categoria.nombre}
              {...categoria}
            />
          ))}

        </section>

      </div>

    </section>
  );
}