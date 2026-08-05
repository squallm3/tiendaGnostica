"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HeaderNav from "@/components/tienda/HeaderNav";
import { useAuth } from "@/lib/tienda/AuthContext";
import { obtenerMisPedidos } from "@/lib/api";

interface PedidoItem {
  uuid: string;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: string;
}

interface Pedido {
  id: number;
  uuid: string;
  estado: string;
  total: string;
  metodoPago: string | null;
  fechaPedido: string;
  items: PedidoItem[];
}

const COLOR_ESTADO: Record<string, string> = {
  pendiente: "text-yellow-400 border-yellow-400",
  pagado: "text-green-400 border-green-400",
  enviado: "text-blue-400 border-blue-400",
  entregado: "text-purple-300 border-purple-300",
  cancelado: "text-red-400 border-red-400",
};

export default function PedidosPage() {
  const { token } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    async function traerPedidos() {
      try {
        const datos = await obtenerMisPedidos(token!);
        setPedidos(datos);
      } catch (err) {
        console.error(err);
        setError("No pudimos cargar tus pedidos.");
      } finally {
        setCargando(false);
      }
    }

    traerPedidos();
  }, [token]);

  return (
    <main className="min-h-screen bg-black text-white">
      <HeaderNav titulo="Mis pedidos" />

      <section className="max-w-3xl mx-auto px-6 pb-10">
        {cargando && <p className="text-purple-300">Cargando...</p>}

        {error && <p className="text-red-400">{error}</p>}

        {!cargando && !error && pedidos.length === 0 && (
          <div className="flex flex-col items-start gap-4">
            <p className="text-purple-300">Todavía no hiciste ningún pedido.</p>
            <Link
              href="/tienda/categorias"
              className="border border-purple-400 px-6 py-3 rounded-lg text-purple-200"
            >
              Ver categorías
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-5">
          {pedidos.map((pedido) => (
            <div
              key={pedido.uuid}
              className="border border-purple-600 rounded-xl bg-black/40 p-5"
            >
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div>
                  <p className="text-purple-100 font-bold">
                    Pedido #{pedido.id}
                  </p>
                  <p className="text-xs text-purple-400">
                    {new Date(pedido.fechaPedido).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <span
                  className={`border px-3 py-1 rounded-full text-xs uppercase ${
                    COLOR_ESTADO[pedido.estado] ??
                    "text-purple-300 border-purple-300"
                  }`}
                >
                  {pedido.estado}
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-1">
                {pedido.items.map((item) => (
                  <div
                    key={item.uuid}
                    className="flex justify-between text-sm text-purple-200"
                  >
                    <span>
                      {item.nombreProducto} x{item.cantidad}
                    </span>
                    <span>
                      $
                      {(
                        Number(item.precioUnitario) * item.cantidad
                      ).toLocaleString("es-AR")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-purple-700 flex justify-between items-center">
                <span className="text-xs text-purple-400 uppercase">
                  {pedido.metodoPago ?? "Sin método de pago"}
                </span>
                <span className="text-purple-100 font-bold">
                  Total ${Number(pedido.total).toLocaleString("es-AR")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}