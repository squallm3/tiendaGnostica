"use client";

import { useEffect, useState } from "react";

const CLAVE_STORAGE = "hk-newsletter-visto";

export default function PopupNewsletter() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    // Si ya lo vio o ya se suscribio, no lo mostramos de nuevo
    if (localStorage.getItem(CLAVE_STORAGE)) return;

    const timer = setTimeout(() => setVisible(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  function cerrar() {
    localStorage.setItem(CLAVE_STORAGE, "1");
    setVisible(false);
  }

  async function suscribir() {
    if (!email.includes("@")) {
      setMensaje("Ingresá un email válido.");
      return;
    }

    setEnviando(true);
    setMensaje(null);

    try {
      const respuesta = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!respuesta.ok) throw new Error();

      localStorage.setItem(CLAVE_STORAGE, "1");
      setListo(true);
    } catch {
      setMensaje("No pudimos suscribirte. Probá más tarde.");
    } finally {
      setEnviando(false);
    }
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6"
      onClick={cerrar}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-md w-full border border-purple-400 rounded-xl bg-black p-6 text-center"
      >
        {listo ? (
          <>
            <h3 className="text-xl font-bold text-purple-100">
              ¡Listo!
            </h3>
            <p className="mt-3 text-purple-200">
              Ya sos parte de la Escuela. Vas a recibir novedades pronto.
            </p>
            <button
              onClick={cerrar}
              className="mt-6 border border-purple-400 px-6 py-2 rounded-lg text-purple-200"
            >
              Cerrar
            </button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold text-purple-100">
              Sumate a la Escuela
            </h3>
            <p className="mt-3 text-purple-200">
              Dejanos tu correo y enterate antes que nadie de nuevos
              productos y novedades.
            </p>

            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-5 w-full bg-black border border-purple-500 rounded-lg px-3 py-2 text-purple-100 placeholder-purple-500 outline-none"
            />

            {mensaje && (
              <p className="mt-3 text-sm text-red-400">{mensaje}</p>
            )}

            <button
              onClick={suscribir}
              disabled={enviando}
              className="mt-5 w-full border border-purple-400 px-6 py-2 rounded-lg text-purple-200 disabled:opacity-40"
            >
              {enviando ? "Enviando..." : "Suscribirme"}
            </button>

            <button
              onClick={cerrar}
              className="mt-3 text-sm text-purple-400"
            >
              Ahora no
            </button>
          </>
        )}
      </div>
    </div>
  );
}