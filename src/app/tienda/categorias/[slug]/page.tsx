interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoriaPage({ params }: Props) {
  const { slug } = await params;

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">
        Categoría: {slug}
      </h1>

      <p className="mt-6">
        Esta página será construida en la próxima microtarea.
      </p>
    </main>
  );
}