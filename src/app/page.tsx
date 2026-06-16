export default function Home() {
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
    <main className="min-h-screen bg-black text-amber-400 p-8 font-mono">

      <div className="max-w-5xl mx-auto">

        <header className="border border-amber-500 p-6 mb-8 bg-zinc-950">

          <h1 className="text-3xl">
            🧙 ESCUELA DE LOS HAIKUS GNÓSTICOS 🧙
          </h1>

          <p className="mt-4 text-amber-200">
            TERMINAL DEL MERCADER GNÓSTICO
          </p>

          <p className="mt-2 text-sm text-amber-500">
            Sistema online... cargando inventario...
          </p>

        </header>


        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {categorias.map((categoria) => (

            <div
              key={categoria.nombre}
              className="border border-amber-500 p-6 bg-zinc-950 hover:bg-amber-950 transition"
            >

              <h2 className="text-2xl">
                {categoria.icono} {categoria.nombre}
              </h2>

              <p className="mt-3 text-amber-200">
                {categoria.descripcion}
              </p>

              <button className="mt-5 border border-amber-400 px-4 py-2 hover:bg-amber-400 hover:text-black">
                INGRESAR
              </button>

            </div>

          ))}

        </section>


        <footer className="mt-10 border-t border-amber-800 pt-4 text-sm">
          🐺 Fork de la Escuela del Brujo — Derechos Reservados
        </footer>


      </div>

    </main>
  );
}