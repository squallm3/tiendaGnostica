"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/tienda/CartContext";

export default function CarritoPage() {
  const { items, total, actualizarCantidad, quitarDelCarrito } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold text-purple-100">
          Tu carrito está vacío
        </h1>
        <Link
          href="/tienda/categorias"
          className="border border-purple-400 px-6 py-3 rounded-lg text-purple-200"
        >
          Ver categorías
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-100 mb-8">
          Carrito
        </h1>

        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="
                flex
                items-center
                gap-4
                border
                border-purple-500
                rounded-xl
                bg-black/40
                p-4
              "
            >
              <div className="relative w-20 h-20 shrink-0 bg-black rounded-lg overflow-hidden">
                {item.imagen ? (
                  <Image
                    src={item.imagen}
                    alt={item.nombre}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-purple-400 text-xs">
                    Sin imagen
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="font-bold text-purple-100">{item.nombre}</p>
                {(item.talle || item.color) && (
                  <p className="text-sm text-purple-300">
                    {[item.talle, item.color].filter(Boolean).join(" / ")}
                  </p>
                )}
                <p className="text-purple-400 mt-1">
                  ${item.precioUnitario.toLocaleString("es-AR")}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    actualizarCantidad(item.id, item.cantidad - 1)
                  }
                  className="border border-purple-400 w-8 h-8 rounded-lg text-purple-200"
                >
                  -
                </button>

                <span className="w-6 text-center">{item.cantidad}</span>

                <button
                  onClick={() =>
                    actualizarCantidad(item.id, item.cantidad + 1)
                  }
                  className="border border-purple-400 w-8 h-8 rounded-lg text-purple-200"
                >
                  +
                </button>
              </div>

              <p className="w-24 text-right font-bold text-purple-200">
                ${(item.precioUnitario * item.cantidad).toLocaleString("es-AR")}
              </p>

              <button
                onClick={() => quitarDelCarrito(item.id)}
                className="text-purple-400 hover:text-purple-200 text-sm ml-2"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center border-t border-purple-500 pt-6">
          <p className="text-xl text-purple-200">Total</p>
          <p className="text-2xl font-bold text-purple-100">
            ${total.toLocaleString("es-AR")}
          </p>
        </div>

        <Link
          href="/tienda/checkout"
          className="
            mt-6
            block
            text-center
            border
            border-purple-400
            px-6
            py-3
            rounded-lg
            text-purple-200
          "
        >
          IR A CHECKOUT
        </Link>
      </section>
    </main>
  );
}