"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/tienda/AuthContext";

const IMAGEN_POR_DEFECTO = "/tienda/player-icon/20pers.png";

export default function IconoJugador() {
  const { token, usuario } = useAuth();
  const [imagen, setImagen] = useState<string>(IMAGEN_POR_DEFECTO);
  const [titulo, setTitulo] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !usuario) {
      setImagen(IMAGEN_POR_DEFECTO);
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

  return (
    <div className="flex flex-col items-center gap-2">
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

      {titulo && (
        <span className="text-sm text-purple-300 text-center">
          {titulo}
        </span>
      )}
    </div>
  );
}