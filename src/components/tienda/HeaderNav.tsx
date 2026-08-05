"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  titulo?: string;
}

export default function HeaderNav({ titulo }: Props) {
  const router = useRouter();

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        items-center
        gap-4
        border-b
        border-purple-800
        bg-black/80
        backdrop-blur
        px-4
        py-3
        mb-6
      "
    >
      {/* VOLVER ATRAS */}
      <button
        onClick={() => router.back()}
        aria-label="Volver atrás"
        className="
          w-10
          h-10
          shrink-0
          rounded-full
          border
          border-purple-500
          text-purple-200
          text-lg
          flex
          items-center
          justify-center
        "
      >
        ←
      </button>

      {/* LOGO A LA LANDING */}
      <Link href="/" aria-label="Ir a la tienda" className="shrink-0">
        <Image
          src="/tienda/iconos/zorro.png"
          alt="Haikus Gnósticos"
          width={40}
          height={40}
          className="object-contain"
        />
      </Link>

      {titulo && (
        <h1 className="text-lg font-bold text-purple-100 truncate">
          {titulo}
        </h1>
      )}
    </header>
  );
}