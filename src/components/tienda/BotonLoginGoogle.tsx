"use client";

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useAuth } from "@/lib/tienda/AuthContext";

export default function BotonLoginGoogle() {
  const { usuario, cargando } = useAuth();

  async function iniciarSesion() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  }

  async function cerrarSesion() {
    await signOut(auth);
  }

  if (cargando) {
    return null;
  }

  if (usuario) {
    return (
      <div className="flex items-center gap-3 text-purple-200">
        <span className="text-sm">{usuario.email}</span>
        <button
          onClick={cerrarSesion}
          className="border border-purple-400 px-3 py-1 rounded-lg text-sm"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={iniciarSesion}
      className="border border-purple-400 px-4 py-2 rounded-lg text-purple-200"
    >
      Iniciar sesión con Google
    </button>
  );
}