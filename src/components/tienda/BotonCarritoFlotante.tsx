"use client";

import { useRouter } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useCart } from "@/lib/tienda/CartContext";
import { useAuth } from "@/lib/tienda/AuthContext";

export default function BotonCarritoFlotante() {
  const { cantidadTotal } = useCart();
  const { usuario } = useAuth();
  const router = useRouter();

  async function handleClick() {
    if (!usuario) {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
      return;
    }

    router.push("/tienda/carrito");
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Ver carrito"
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
    </button>
  );
}