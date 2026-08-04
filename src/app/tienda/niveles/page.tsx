import Link from "next/link";
import ListaNiveles from "@/components/tienda/niveles/ListaNiveles";
import { obtenerNivelesConProductos } from "@/lib/api";

export default async function NivelesPage() {
  const niveles = await obtenerNivelesConProductos();

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <section className="max-w-7xl mx-auto">
        <Link href="/" className="text-purple-400 text-sm">
          ← Volver a la tienda
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-purple-100 mb-8">
          Productos de mi nivel
        </h1>

        <ListaNiveles niveles={niveles} />
      </section>
    </main>
  );
}