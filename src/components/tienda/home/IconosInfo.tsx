"use client";

import { useState } from "react";

const ITEMS = [
  {
    icono: "🌎",
    titulo: "Envíos a cualquier parte del mundo",
    texto:
      "Hacemos envíos a todo el país y al exterior. El costo y el tiempo de entrega se calculan según el destino al finalizar la compra.",
  },
  {
    icono: "💳",
    titulo: "Múltiples medios de pago",
    texto:
      "Podés pagar con Mercado Pago (tarjetas, transferencia y más) o en efectivo al retirar tu pedido.",
  },
  {
    icono: "🔒",
    titulo: "Compra con seguridad",
    texto:
      "Tus datos y tus pagos están protegidos. Trabajamos con plataformas de pago seguras y reconocidas.",
  },
];

export default function IconosInfo() {
  const [abierto, setAbierto] = useState<number | null>(null);

  return (
    <section className="max-w-5xl mx-auto mt-20 px-6">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-6
        "
      >
        {ITEMS.map((item, index) => (
          <button
            key={item.titulo}
            onClick={() => setAbierto(index)}
            className="
              flex
              flex-col
              items-center
              text-center
              gap-3
              border
              border-purple-500
              rounded-xl
              bg-black/40
              p-6
              text-purple-200
              hover:bg-purple-900/30
              transition
            "
          >
            <span className="text-4xl">{item.icono}</span>
            <span className="font-bold text-purple-100">
              {item.titulo}
            </span>
          </button>
        ))}
      </div>

      {abierto !== null && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/70
            flex
            items-center
            justify-center
            p-6
          "
          onClick={() => setAbierto(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              max-w-md
              w-full
              border
              border-purple-400
              rounded-xl
              bg-black
              p-6
              text-center
            "
          >
            <span className="text-4xl">{ITEMS[abierto].icono}</span>

            <h3 className="mt-3 text-xl font-bold text-purple-100">
              {ITEMS[abierto].titulo}
            </h3>

            <p className="mt-3 text-purple-200">
              {ITEMS[abierto].texto}
            </p>

            <button
              onClick={() => setAbierto(null)}
              className="
                mt-6
                border
                border-purple-400
                px-6
                py-2
                rounded-lg
                text-purple-200
              "
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}