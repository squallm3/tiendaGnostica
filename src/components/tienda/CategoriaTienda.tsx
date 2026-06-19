export default function CategoriaTienda() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <section className="max-w-7xl mx-auto">

        <div className="border border-purple-500 rounded-xl p-6">
          <h1 className="text-4xl font-bold text-purple-300">
            Tienda de Remeras
          </h1>

          <p className="mt-2 text-purple-200">
            Explorá la colección oficial de la Escuela.
          </p>
        </div>

        <div className="mt-8 border border-purple-500/50 rounded-xl min-h-[400px] flex items-center justify-center">

          <span className="text-purple-300">
            Zona del mercader próximamente
          </span>

        </div>

      </section>
    </main>
  );
}