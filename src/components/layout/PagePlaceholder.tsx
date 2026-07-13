interface PagePlaceholderProps {
  titulo: string;
  descripcion: string;
}

export default function PagePlaceholder({
  titulo,
  descripcion,
}: PagePlaceholderProps) {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-8">

      <section
        className="
          w-full
          max-w-5xl
          border
          border-purple-500
          rounded-xl
          bg-black/50
          p-10
          text-center
        "
      >
        <h1 className="text-5xl font-bold text-purple-300">
          {titulo}
        </h1>

        <p className="mt-4 text-xl text-purple-200">
          {descripcion}
        </p>

        <div
          className="
            mt-12
            h-80
            border
            border-dashed
            border-purple-500/40
            rounded-lg
            flex
            items-center
            justify-center
            text-purple-400
          "
        >
          Próximamente
        </div>

      </section>

    </main>
  );
}