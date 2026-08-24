"use client";

import { useState } from "react";
import Link from "next/link";
import HeaderNav from "@/components/tienda/HeaderNav";
import RequiereSesion from "@/components/tienda/RequiereSesion";
import { useAuth } from "@/lib/tienda/AuthContext";
import { useCart } from "@/lib/tienda/CartContext";
import { crearPedido, crearPreferenciaPago } from "@/lib/api";

type Entrega = "envio" | "retiro";
type MetodoPago = "mercadopago" | "efectivo";

function FormularioCheckout() {
  const { token, usuario } = useAuth();
  const { items, total, vaciarCarrito } = useCart();

  const [entrega, setEntrega] = useState<Entrega>("envio");
  const [direccion, setDireccion] = useState({
    calle: "",
    ciudad: "",
    codigoPostal: "",
  });
  const [metodoPago, setMetodoPago] = useState<MetodoPago>("efectivo");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pedidoUuid, setPedidoUuid] = useState<string | null>(null);

  async function confirmarPedido() {
    if (!token) return;

    setEnviando(true);
    setError(null);

    try {
      const pedido = await crearPedido(token, {
        items: items.map((item) => ({
          varianteId: item.varianteId,
          personalizacion: item.personalizacion ?? null,
          cantidad: item.cantidad,
          precioUnitario: item.precioUnitario,
          nombreProducto: item.nombre,
        })),
        metodoPago,
        direccionEnvio:
          entrega === "envio"
            ? { tipo: "envio", ...direccion }
            : { tipo: "retiro" },
      });

      if (metodoPago === "mercadopago") {
        const preferencia = await crearPreferenciaPago(token, pedido.id);
        vaciarCarrito();
        window.location.href = preferencia.initPoint;
        return;
      }

      setPedidoUuid(pedido.uuid);
      vaciarCarrito();
    } catch (err) {
      console.error(err);
      setError("No pudimos crear el pedido. Probá de nuevo en un momento.");
    } finally {
      setEnviando(false);
    }
  }

  if (pedidoUuid) {
    return (
      <main className="min-h-screen bg-black text-white">
        <HeaderNav titulo="Pedido confirmado" />

        <section className="flex flex-col items-center justify-center gap-6 px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-purple-100">
            ¡Pedido confirmado!
          </h2>
          <p className="text-purple-300">
            Número de pedido:{" "}
            <span className="text-purple-100">{pedidoUuid}</span>
          </p>
          <p className="text-purple-300">
            Coordinamos el pago en efectivo al momento de la entrega o el
            retiro.
          </p>
          <Link
            href="/"
            className="border border-purple-400 px-6 py-3 rounded-lg text-purple-200"
          >
            Volver a la tienda
          </Link>
        </section>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white">
        <HeaderNav titulo="Checkout" />

        <section className="flex flex-col items-center justify-center gap-6 px-6 py-20">
          <h2 className="text-3xl font-bold text-purple-100 text-center">
            Tu carrito está vacío
          </h2>
          <Link
            href="/tienda/categorias"
            className="border border-purple-400 px-6 py-3 rounded-lg text-purple-200"
          >
            Ver categorías
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <HeaderNav titulo="Checkout" />

      <section className="max-w-3xl mx-auto px-6 pb-10">
        <p className="text-purple-300 mb-8">{usuario?.email}</p>

        {/* Resumen */}
        <div className="border border-purple-500 rounded-xl bg-black/40 p-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="py-1">
              <div className="flex justify-between text-purple-200">
                <span>
                  {item.nombre} x{item.cantidad}
                </span>
                <span>
                  ${(item.precioUnitario * item.cantidad).toLocaleString("es-AR")}
                </span>
              </div>
              {item.personalizacion && (
                <p className="text-xs text-purple-500 mt-0.5">
                  Nivel {item.personalizacion.nivelId} · Diseño{" "}
                  {item.personalizacion.diseno.toUpperCase()}
                  {item.personalizacion.talle &&
                    ` · Talle ${item.personalizacion.talle}`}
                  {item.personalizacion.color &&
                    ` · Color ${item.personalizacion.color}`}
                </p>
              )}
            </div>
          ))}
          <div className="flex justify-between text-purple-100 font-bold pt-3 mt-3 border-t border-purple-500">
            <span>Total</span>
            <span>${total.toLocaleString("es-AR")}</span>
          </div>
        </div>

        {/* Entrega */}
        <div className="mb-8">
          <p className="text-purple-200 mb-3">Entrega</p>
          <div className="flex gap-3">
            <button
              onClick={() => setEntrega("envio")}
              className={`border px-4 py-2 rounded-lg ${
                entrega === "envio"
                  ? "border-purple-200 bg-purple-900/50 text-purple-100"
                  : "border-purple-400 text-purple-200"
              }`}
            >
              Envío
            </button>
            <button
              onClick={() => setEntrega("retiro")}
              className={`border px-4 py-2 rounded-lg ${
                entrega === "retiro"
                  ? "border-purple-200 bg-purple-900/50 text-purple-100"
                  : "border-purple-400 text-purple-200"
              }`}
            >
              Retiro
            </button>
          </div>

          {entrega === "envio" && (
            <div className="flex flex-col gap-3 mt-4">
              <input
                placeholder="Calle y número"
                value={direccion.calle}
                onChange={(e) =>
                  setDireccion({ ...direccion, calle: e.target.value })
                }
                className="bg-black border border-purple-500 rounded-lg px-3 py-2 text-purple-100"
              />
              <input
                placeholder="Ciudad"
                value={direccion.ciudad}
                onChange={(e) =>
                  setDireccion({ ...direccion, ciudad: e.target.value })
                }
                className="bg-black border border-purple-500 rounded-lg px-3 py-2 text-purple-100"
              />
              <input
                placeholder="Código postal"
                value={direccion.codigoPostal}
                onChange={(e) =>
                  setDireccion({ ...direccion, codigoPostal: e.target.value })
                }
                className="bg-black border border-purple-500 rounded-lg px-3 py-2 text-purple-100"
              />
            </div>
          )}
        </div>

        {/* Pago */}
        <div className="mb-8">
          <p className="text-purple-200 mb-3">Método de pago</p>
          <div className="flex gap-3">
            <button
              onClick={() => setMetodoPago("efectivo")}
              className={`border px-4 py-2 rounded-lg ${
                metodoPago === "efectivo"
                  ? "border-purple-200 bg-purple-900/50 text-purple-100"
                  : "border-purple-400 text-purple-200"
              }`}
            >
              Efectivo
            </button>
            <button
              onClick={() => setMetodoPago("mercadopago")}
              className={`border px-4 py-2 rounded-lg ${
                metodoPago === "mercadopago"
                  ? "border-purple-200 bg-purple-900/50 text-purple-100"
                  : "border-purple-400 text-purple-200"
              }`}
            >
              Mercado Pago
            </button>
          </div>
        </div>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <button
          onClick={confirmarPedido}
          disabled={enviando}
          className="
            w-full
            border
            border-purple-400
            px-6
            py-3
            rounded-lg
            text-purple-200
            disabled:opacity-40
          "
        >
          {enviando
            ? "Procesando..."
            : metodoPago === "mercadopago"
            ? "PAGAR CON MERCADO PAGO"
            : "CONFIRMAR PEDIDO"}
        </button>
      </section>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <RequiereSesion>
      <FormularioCheckout />
    </RequiereSesion>
  );
}