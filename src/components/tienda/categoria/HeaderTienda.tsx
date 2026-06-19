export default function HeaderTienda() {
  return (
    <header className="w-full border border-purple-500/40 rounded-xl p-4 bg-black/60">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-5xl font-bold text-purple-200">
            Tienda de Remeras
          </h1>

          <p className="text-purple-300 mt-2">
            Objetos del mundo de Haikus Gnósticos
          </p>
        </div>

        <div className="w-16 h-16 rounded-full border border-purple-400 flex items-center justify-center">

          <span className="text-purple-300 text-2xl">
            🦊
          </span>

        </div>

      </div>

    </header>
  );
}