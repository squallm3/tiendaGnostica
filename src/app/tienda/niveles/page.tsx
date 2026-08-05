import HeaderNav from "@/components/tienda/HeaderNav";
import ListaNiveles from "@/components/tienda/niveles/ListaNiveles";
import { obtenerNivelesConProductos } from "@/lib/api";

export default async function NivelesPage() {
  const niveles = await obtenerNivelesConProductos();

  return (
    <main className="min-h-screen bg-black text-white">
      <HeaderNav titulo="Productos de mi nivel" />

      <section className="max-w-7xl mx-auto px-6 pb-10">
        <ListaNiveles niveles={niveles} />
      </section>
    </main>
  );
}