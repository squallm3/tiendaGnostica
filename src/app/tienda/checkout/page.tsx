"use client";

import { useState } from "react";
import Link from "next/link";
import HeaderNav from "@/components/tienda/HeaderNav";
import RequiereSesion from "@/components/tienda/RequiereSesion";
import { useAuth } from "@/lib/tienda/AuthContext";
import { useCart } from "@/lib/tienda/CartContext";
import { crearPedido } from "@/lib/api";

type Entrega = "envio" | "retiro";
type MetodoPago = "mercadopago" | "efectivo";

const NUMERO_WHATSAPP = "5491134126968";
const ALIAS_TRANSFERENCIA = "mmarra.mp";

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
  const [pedidoConfirmado, setPedidoConfirmado] = useState<{
    uuid: string;
    linkWhatsApp: string;
  } | null>(null);

  function armarMensajeWhatsApp(pedidoUuid: string) {
    const lineas: string[] = [];

    lineas.push("Nuevo pedido - Haikus Gnosticos");
    lineas.push(`Pedido: ${pedidoUuid}`);
    lineas.push(`Cliente: ${usuario?.email ?? ""}`);
    lineas.push("");
    lineas.push("Productos:");

    items.forEach((item) => {
      let linea = `- ${item.nombre} x${item.cantidad} - $${(
        item.precioUnitario * item.cantidad
      ).toLocaleString("es-AR")}`;

      if (item.personalizacion) {
        const detalles = [];
        detalles.push(`Nivel ${item.personalizacion.nivelId}`);
        detalles.push(`Diseno ${item.personalizacion.diseno.toUpperCase()}`);
        if (item.personalizacion.talle)
          detalles.push(`Talle ${item.personalizacion.talle}`);
        if (item.personalizacion.color)
          detalles.push(`Color ${item.personalizacion.color}`);
        linea += `\n   (${detalles.join(" - ")})`;
      } else {
        if (item.talle) linea += `\n   Talle: ${item.talle}`;
        if (item.color) linea += `\n   Color: ${item.color}`;
      }

      lineas.push(linea);
    });

    lineas.push("");
    lineas.push(`Total: $${total.toLocaleString("es-AR")}`);
    lineas.push("");

    if (entrega === "envio") {
      lineas.push("Entrega: Envio");
      lineas.push(
        `${direccion.calle}, ${direccion.ciudad} (CP ${direccion.codigoPostal})`
      );
    } else {
      lineas.push("Entrega: Retiro");
    }

    lineas.push("");

    if (metodoPago === "mercadopago") {
      lineas.push(`Pago: Transferencia a alias ${ALIAS_TRANSFERENCIA}`);
      lineas.push("Te adjunto el comprobante de la transferencia.");
    } else {
      lineas.push("Pago: Efectivo al momento de la entrega/retiro");
    }

    return lineas.join("\n");
  }

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

      const mensaje = armarMensajeWhatsApp(pedido.uuid);
      const linkWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(
        mensaje
      )}`;

      vaciarCarrito();
      setPedidoConfirmado({ uuid: pedido.uuid, linkWhatsApp });

      window.open(linkWhatsApp, "_blank");
    } catch (err) {
      console.error(err);
      setError("No pudimos crear el pedido. Probá de nuevo en un momento.");
    } finally {
      setEnviando(false);
    }
  }

  if (pedidoConfirmado) {
    return (
      <main className="min-h-screen bg-black text-white">
        <HeaderNav titulo="Pedido confirmado" />

        <section className="flex flex-col items-center justify-center gap-6 px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-purple-100">
            ¡Pedido confirmado!
          </h2>
          <p className="text-purple-300">
            Número de pedido:{" "}
            <span className="text-purple-100">{pedidoConfirmado.uuid}</span>
          </p>
          <p className="text-purple-300 max-w-md">
            Te abrimos WhatsApp con el detalle de tu pedido. Si no se abrió
            solo, tocá el botón de abajo para enviarlo vos.
          </p>

          <Link
            href={pedidoConfirmado.linkWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-green-500 bg-green-900/30 px-6 py-3 rounded-lg text-green-300"
          >
            Abrir WhatsApp
          </Link>

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
              Transferencia
            </button>
          </div>

          {metodoPago === "mercadopago" && (
            <div className="mt-4 border border-purple-600 bg-purple-950/30 rounded-lg p-4">
              <p className="text-purple-200 text-sm">
                Transferí el total a este alias de Mercado Pago:
              </p>
              <p className="text-purple-100 font-bold text-lg mt-1">
                {ALIAS_TRANSFERENCIA}
              </p>
              <p className="text-purple-400 text-xs mt-2">
                Al confirmar, se va a abrir WhatsApp con tu pedido — adjuntá
                ahí el comprobante de la transferencia.
              </p>
            </div>
          )}
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
          {enviando ? "Procesando..." : "CONFIRMAR PEDIDO Y ENVIAR POR WHATSAPP"}
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