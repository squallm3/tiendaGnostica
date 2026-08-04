import Link from "next/link";

export default function PagoExitoPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center gap-6 text-center">
      <span className="text-6xl">✨</span>

      <h1 className="text-3xl font-bold text-purple-100">
        ¡Pago acreditado!
      </h1>

      <p className="text-purple-300 max-w-md">
        Recibimos tu pago y ya estamos preparando tu pedido. Te avisamos
        cuando esté en camino.
      </p>

      <Link
        href="/tienda/perfil/pedidos"
        className="border border-purple-400 px-6 py-3 rounded-lg text-purple-200"
      >
        Ver mis pedidos
      </Link>

      <Link href="/" className="text-purple-400 text-sm">
        Volver a la tienda
      </Link>
    </main>
  );
}