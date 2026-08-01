"use client";

import Link from "next/link";
import { useCart } from "@/lib/tienda/CartContext";

export default function BotonCarritoFlotante() {
  const { cantidadTotal } = useCart();

  return (
    <Link
      href="/tienda/carrito"
      className="
        fixed
        bottom-6
        right-6
        z-50
        w-14
        h-14
        rounded-full
        bg-purple-900
        border
        border-purple-400
        flex
        items-center
        justify-center
        text-2xl
        shadow-lg
      "
    >
      🛒
      {cantidadTotal > 0 && (
        <span
          className="
            absolute
            -top-1
            -right-1
            bg-purple-400
            text-black
            text-xs
            font-bold
            w-6
            h-6
            rounded-full
            flex
            items-center
            justify-center
          "
        >
          {cantidadTotal}
        </span>
      )}
    </Link>
  );
}