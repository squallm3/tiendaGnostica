"use client";

import Link from "next/link";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useAuth } from "@/lib/tienda/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { usuario, cargando, esAdmin } = useAuth();

  async function iniciarSesion() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  }

  if (cargando) {
    return (
      <main className="min-h-screen bg-black text-purple-200 flex items-center justify-center">
        Cargando...
      </main>
    );
  }

  // Sin sesion: mostramos el login del panel
  if (!usuario) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 p-6 text-center">
        <h1 className="text-3xl font-bold text-purple-100">
          Panel de administración
        </h1>
        <p className="text-purple-300">
          Iniciá sesión para continuar.
        </p>
        <button
          onClick={iniciarSesion}
          className="border border-purple-400 px-6 py-3 rounded-lg text-purple-200"
        >
          Iniciar sesión con Google
        </button>
      </main>
    );
  }

  // Con sesion pero sin permisos
  if (!esAdmin) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 p-6 text-center">
        <span className="text-5xl">🔒</span>
        <h1 className="text-2xl font-bold text-purple-100">
          Acceso restringido
        </h1>
        <p className="text-purple-300">
          Tu cuenta no tiene permisos de administración.
        </p>
        <Link
          href="/"
          className="border border-purple-400 px-6 py-3 rounded-lg text-purple-200"
        >
          Volver a la tienda
        </Link>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-purple-700 px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="text-purple-100 font-bold">
          Panel de administración
        </Link>

        <Link href="/" className="text-purple-400 text-sm">
          Ir a la tienda →
        </Link>
      </header>

      <div className="p-6">{children}</div>
    </div>
  );
}