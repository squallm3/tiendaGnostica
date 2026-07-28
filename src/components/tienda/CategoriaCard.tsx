import Image from "next/image";
import Link from "next/link";

type CategoriaCardProps = {
  nombre: string;
  slug: string;
  imagen: string;
};

export default function CategoriaCard({
  nombre,
  slug,
  imagen,
}: CategoriaCardProps) {
  return (
    <Link
      href={`/tienda/categorias/${slug}`}
      className="
        rounded-2xl
        border
        border-purple-400
        bg-black/40
        p-6
        flex
        flex-col
        items-center
        justify-center
        text-purple-200
        hover:bg-purple-900/40
        transition
      "
    >
      <Image
        src={imagen}
        alt={nombre}
        width={130}
        height={130}
        className="object-contain"
      />

      <span
        className="
          mt-4
          text-lg
          font-bold
        "
      >
        {nombre}
      </span>
    </Link>
  );
}