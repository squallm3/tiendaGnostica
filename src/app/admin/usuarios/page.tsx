"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/tienda/AuthContext";
import {
  listarUsuariosAdmin,
  cambiarRolUsuario,
  cambiarActivoUsuario,
  type UsuarioAdmin,
} from "@/lib/adminUsuarios";

export default function AdminUsuariosPage() {
  const { token, usuario } = useAuth();
  const [usuarios, setUsuarios] = useState<UsuarioAdmin[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [procesando, setProcesando] = useState<string | null>(null);

  async function cargar() {
    if (!token) return;
    try {
      const datos = await listarUsuariosAdmin(token);
      setUsuarios(datos);
    } catch (err: any) {
      setError(err.message || "No pudimos cargar los usuarios.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, [token]);

  async function alternarRol(u: UsuarioAdmin) {
    if (!token) return;
    const nuevoRol = u.rol === "admin" ? "cliente" : "admin";

    const ok = confirm(
      nuevoRol === "admin"
        ? `¿Convertir a "${u.email}" en administrador?`
        : `¿Quitarle los permisos de administrador a "${u.email}"?`
    );
    if (!ok) return;

    setProcesando(u.id);
    try {
      await cambiarRolUsuario(token, u.id, nuevoRol);
      await cargar();
    } catch (err: any) {
      alert(err.message || "No se pudo cambiar el rol.");
    } finally {
      setProcesando(null);
    }
  }

  async function alternarActivo(u: UsuarioAdmin) {
    if (!token) return;
    const nuevoEstado = u.activo === 1 ? false : true;

    const ok = confirm(
      nuevoEstado
        ? `¿Reactivar la cuenta de "${u.email}"?`
        : `¿Desactivar la cuenta de "${u.email}"? No va a poder iniciar sesión.`
    );
    if (!ok) return;

    setProcesando(u.id);
    try {
      await cambiarActivoUsuario(token, u.id, nuevoEstado);
      await cargar();
    } catch (err: any) {
      alert(err.message || "No se pudo cambiar el estado.");
    } finally {
      setProcesando(null);
    }
  }

  return (
    <section className="max-w-4xl mx-auto">
      <Link href="/admin" className="text-purple-400 text-sm">
        ← Volver al panel
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-purple-100 mb-8">
        Usuarios
      </h1>

      {cargando && <p className="text-purple-300">Cargando...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="flex flex-col gap-3">
        {usuarios.map((u) => {
          const esUnoMismo = u.id === usuario?.uid;

          return (
            <div
              key={u.uuid}
              className="border border-purple-700 rounded-xl bg-black/40 p-4 flex flex-wrap items-center gap-4"
            >
              <div className="flex-1 min-w-[220px]">
                <p className="text-purple-100 font-bold">
                  {u.email}
                  {esUnoMismo && (
                    <span className="ml-2 text-xs text-purple-500">(vos)</span>
                  )}
                </p>
                <p className="text-xs text-purple-500 mt-1">
                  Alta:{" "}
                  {new Date(u.createdAt).toLocaleDateString("es-AR")}
                </p>
              </div>

              <span
                className={`border px-3 py-1 rounded-full text-xs uppercase ${
                  u.rol === "admin"
                    ? "text-amber-300 border-amber-400"
                    : "text-purple-300 border-purple-400"
                }`}
              >
                {u.rol}
              </span>

              <span
                className={`border px-3 py-1 rounded-full text-xs uppercase ${
                  u.activo === 1
                    ? "text-green-400 border-green-400"
                    : "text-red-400 border-red-400"
                }`}
              >
                {u.activo === 1 ? "activo" : "inactivo"}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => alternarRol(u)}
                  disabled={procesando === u.id || (esUnoMismo && u.rol === "admin")}
                  title={
                    esUnoMismo && u.rol === "admin"
                      ? "No podés quitarte el rol a vos mismo"
                      : undefined
                  }
                  className="border border-purple-500 px-3 py-1 rounded-lg text-sm text-purple-200 disabled:opacity-30"
                >
                  {u.rol === "admin" ? "Quitar admin" : "Hacer admin"}
                </button>

                <button
                  onClick={() => alternarActivo(u)}
                  disabled={procesando === u.id || esUnoMismo}
                  title={
                    esUnoMismo
                      ? "No podés desactivar tu propia cuenta"
                      : undefined
                  }
                  className="border border-red-500 px-3 py-1 rounded-lg text-sm text-red-300 disabled:opacity-30"
                >
                  {u.activo === 1 ? "Desactivar" : "Reactivar"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}