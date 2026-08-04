"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useAuth } from "@/lib/tienda/AuthContext";

export default function IconoJugador() {
  const { token, usuario, cargando } = useAuth();
  const [imagen, setImagen] = useState<string | null>(null);
  const [titulo, setTitulo] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !usuario) {
      setImagen(null);
      setTitulo(null);
      return;
    }

    async function traerPerfil() {
      try {
        const respuesta = await fetch("/api/usuarios/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!respuesta.ok) return;

        const perfil = await respuesta.json();

        if (perfil?.personaje?.imagenA) {
          setImagen(`/tienda/niveles/${perfil.personaje.imagenA}`);
          setTitulo(perfil.personaje.titulo ?? null);
        }
      } catch (error) {
        console.error("Error al traer el perfil:", error);
      }
    }

    traerPerfil();
  }, [token, usuario]);

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

  // Deslogueado: solo el botón de login
  if (!usuario) {
    return (
      <button
        onClick={iniciarSesion}
        className="
          border
          border-purple-400
          px-6
          py-3
          rounded-lg
          text-purple-200
        "
      >
        Iniciar sesión con Google
      </button>
    );
  }

  // Logueado: imagen del nivel + título + botón de cerrar sesión
  return (
    <div className="flex flex-col items-center gap-3">
      {imagen && (
        <div
          className="
            relative
            w-32
            h-32
            rounded-full
            overflow-hidden
            border-2
            border-purple-400
          "
        >
          <Image
            src={imagen}
            alt="Tu personaje"
            fill
            className="object-cover"
          />
        </div>
      )}

      {titulo && (
        <span className="text-sm text-purple-300 text-center">
          {titulo}
        </span>
      )}

      <button
        onClick={cerrarSesion}
        className="
          border
          border-purple-400
          px-4
          py-2
          rounded-lg
          text-purple-200
          text-sm
        "
      >
        Cerrar sesión
      </button>
    </div>
  );
}