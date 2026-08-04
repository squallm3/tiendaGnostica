"use client";

import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useCart } from "@/lib/tienda/CartContext";
import { useAuth } from "@/lib/tienda/AuthContext";
import type { ProductoDetalle } from "@/lib/tienda/types";

interface Props {
  producto: ProductoDetalle;
  precioNumero: number;
  imagenPrincipal: string | null;
}

export default function AgregarCarrito({
  producto,
  precioNumero,
  imagenPrincipal,
}: Props) {
  const { agregarAlCarrito } = useCart();
  const { usuario } = useAuth();
  const [varianteId, setVarianteId] = useState<number | null>(
    producto.variantes[0]?.id ?? null
  );
  const [agregado, setAgregado] = useState(false);

  const variante = producto.variantes.find((v) => v.id === varianteId) ?? null;
  const sinStock = variante ? variante.stock === 0 : false;

  async function handleAgregar() {
    // Si no hay sesion, primero pedimos login
    if (!usuario) {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
      return;
    }

    const id =
      varianteId !== null ? `variante-${varianteId}` : `producto-${producto.id}`;

    agregarAlCarrito({
      id,
      productoId: producto.id,
      varianteId,
      nombre: producto.nombre,
      precioUnitario: precioNumero,
      imagen: imagenPrincipal,
      talle: variante?.talle ?? null,
      color: variante?.color ?? null,
    });

    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  }

  return (
    <div>
      {producto.variantes.length > 0 && (
        <div className="mt-6">
          <p className="text-purple-200 mb-2">Elegí una opción:</p>

          <div className="flex flex-wrap gap-3">
            {producto.variantes.map((v) => (
              <button
                key={v.uuid}
                onClick={() => setVarianteId(v.id)}
                disabled={v.stock === 0}
                className={`
                  border px-3 py-1 rounded-lg text-sm
                  ${varianteId === v.id
                    ? "border-purple-200 bg-purple-900/50 text-purple-100"
                    : "border-purple-400 text-purple-200"}
                  ${v.stock === 0 ? "opacity-40 cursor-not-allowed" : ""}
                `}
              >
                {[v.talle, v.color].filter(Boolean).join(" / ") || "Única"}
                {v.stock === 0 && " (sin stock)"}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleAgregar}
        disabled={sinStock}
        className="
          mt-8
          border
          border-purple-400
          px-6
          py-3
          rounded-lg
          text-purple-200
          disabled:opacity-40
          disabled:cursor-not-allowed
        "
      >
        {!usuario
          ? "INICIÁ SESIÓN PARA COMPRAR"
          : agregado
          ? "¡Agregado!"
          : "AGREGAR AL CARRITO"}
      </button>
    </div>
  );
}