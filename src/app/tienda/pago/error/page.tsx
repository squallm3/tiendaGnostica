import Link from "next/link";

export default function PagoErrorPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center gap-6 text-center">
      <span className="text-6xl">⚠️</span>

      <h1 className="text-3xl font-bold text-purple-100">
        No pudimos procesar el pago
      </h1>

      <p className="text-purple-300 max-w-md">
        El pago fue rechazado o cancelado. Tu pedido quedó registrado como
        pendiente, podés intentar de nuevo cuando quieras.
      </p>

      <Link
        href="/tienda/carrito"
        className="border border-purple-400 px-6 py-3 rounded-lg text-purple-200"
      >
        Volver al carrito
      </Link>

      <Link href="/" className="text-purple-400 text-sm">
        Volver a la tienda
      </Link>
    </main>
  );
}