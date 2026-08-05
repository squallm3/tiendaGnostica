"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/tienda/AuthContext";

export default function BotonAdmin() {
  const { esAdmin, cargando } = useAuth();
  const pathname = usePathname();

  // No lo mostramos si no es admin, o si ya esta dentro del panel
  if (cargando || !esAdmin || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <Link
      href="/admin"
      className="
        fixed
        bottom-42
        right-6
        z-50
        flex
        items-center
        gap-2
        rounded-full
        border
        border-amber-400
        bg-amber-900/80
        px-4
        h-14
        text-amber-100
        font-bold
        shadow-lg
      "
    >
      ⚙️ Administrar
    </Link>
  );
}