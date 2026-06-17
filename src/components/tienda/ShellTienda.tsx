export default function ShellTienda() {
  return (
    <main className="min-h-screen bg-black text-white font-mono">

      <section className="min-h-screen flex items-center justify-center p-8">

        <div className="w-full max-w-6xl">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="border border-purple-500 rounded-xl p-8 bg-black/60">

              <h1 className="text-4xl text-purple-300">
                Tienda de los Haikus Gnósticos
              </h1>

              <p className="mt-6 text-purple-200">
                Bienvenido al mercado de la Escuela.
              </p>

              <p className="mt-2 text-purple-400">
                Explora los objetos disponibles.
              </p>

            </div>


            <div className="border border-purple-500 rounded-xl p-8 bg-black/60">

              <h2 className="text-2xl text-purple-300">
                Inventario
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-4">

                <button className="border border-purple-400 p-4 hover:bg-purple-950">
                  👕 Remeras
                </button>

                <button className="border border-purple-400 p-4 hover:bg-purple-950">
                  🥋 Hoodies
                </button>

                <button className="border border-purple-400 p-4 hover:bg-purple-950">
                  👖 Joggings
                </button>

                <button className="border border-purple-400 p-4 hover:bg-purple-950">
                  🧙 Artefactos
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}