import HeaderTienda from "./HeaderTienda";

export default function CategoriaTienda() {
  return (
    <main className="min-h-screen bg-black text-white p-6">

      <section className="max-w-7xl mx-auto">

        <HeaderTienda />

        <div className="mt-8 border border-purple-500/50 rounded-xl min-h-[400px] flex items-center justify-center">

          <span className="text-purple-300">
            Zona del mercader próximamente
          </span>

        </div>

      </section>

    </main>
  );
}