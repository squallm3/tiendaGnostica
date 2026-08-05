"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/tienda/AuthContext";
import {
  listarCategoriasAdmin,
  crearCategoriaAdmin,
  editarCategoriaAdmin,
  eliminarCategoriaAdmin,
  reordenarCategoriasAdmin,
  type CategoriaAdmin,
  type CategoriaPayload,
} from "@/lib/adminApi";

function generarSlug(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

interface FormularioProps {
  categoria: CategoriaAdmin | null;
  onGuardar: (payload: CategoriaPayload) => Promise<void>;
  onCancelar: () => void;
}

function FormularioCategoria({
  categoria,
  onGuardar,
  onCancelar,
}: FormularioProps) {
  const [nombre, setNombre] = useState(categoria?.nombre ?? "");
  const [slug, setSlug] = useState(categoria?.slug ?? "");
  const [descripcion, setDescripcion] = useState(categoria?.descripcion ?? "");
  const [icono, setIcono] = useState(categoria?.icono ?? "");
  const [activa, setActiva] = useState(
    categoria ? categoria.activa === 1 : true
  );
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function guardar() {
    if (!nombre.trim() || !slug.trim()) {
      setError("El nombre y el slug son obligatorios.");
      return;
    }

    setGuardando(true);
    setError(null);

    try {
      await onGuardar({
        nombre: nombre.trim(),
        slug: slug.trim(),
        descripcion: descripcion.trim() || null,
        icono: icono.trim() || null,
        activa,
      });
    } catch (err: any) {
      setError(err.message || "No se pudo guardar.");
    } finally {
      setGuardando(false);
    }
  }

  const input =
    "w-full bg-black border border-purple-600 rounded-lg px-3 py-2 text-purple-100 placeholder-purple-600 outline-none";
  const label = "text-sm text-purple-300 mb-1 block";

  return (
    <div className="fixed inset-0 z-50 bg-black/80 overflow-y-auto p-6">
      <div className="max-w-xl mx-auto border border-purple-500 rounded-xl bg-black p-6">
        <h2 className="text-2xl font-bold text-purple-100 mb-6">
          {categoria ? "Editar categoría" : "Nueva categoría"}
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className={label}>Nombre</label>
            <input
              className={input}
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                if (!categoria) setSlug(generarSlug(e.target.value));
              }}
            />
          </div>

          <div>
            <label className={label}>Slug</label>
            <input
              className={input}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            {categoria && (
              <p className="mt-1 text-xs text-amber-400">
                El slug se usa para la URL y para buscar el ícono y la escena
                de la categoría. Si lo cambiás, esas imágenes dejan de
                encontrarse hasta que las renombres.
              </p>
            )}
          </div>

          <div>
            <label className={label}>Descripción</label>
            <textarea
              className={input}
              rows={2}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Ícono (nombre interno)</label>
            <input
              className={input}
              value={icono}
              onChange={(e) => setIcono(e.target.value)}
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={activa}
              onChange={(e) => setActiva(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-purple-200">
              Activa (visible en la tienda)
            </span>
          </label>

          <p className="text-xs text-purple-500">
            El orden se cambia arrastrando las categorías desde el listado.
          </p>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex gap-3 mt-2">
            <button
              onClick={guardar}
              disabled={guardando}
              className="flex-1 border border-purple-400 px-6 py-3 rounded-lg text-purple-200 disabled:opacity-40"
            >
              {guardando ? "Guardando..." : "Guardar"}
            </button>

            <button
              onClick={onCancelar}
              className="px-6 py-3 rounded-lg text-purple-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminCategoriasPage() {
  const { token } = useAuth();
  const [categorias, setCategorias] = useState<CategoriaAdmin[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editando, setEditando] = useState<CategoriaAdmin | null>(null);
  const [creando, setCreando] = useState(false);
  const [arrastrando, setArrastrando] = useState<number | null>(null);
  const [guardandoOrden, setGuardandoOrden] = useState(false);

  async function cargar() {
    if (!token) return;
    try {
      const datos = await listarCategoriasAdmin(token);
      setCategorias(datos);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "No pudimos cargar las categorías.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, [token]);

  async function guardar(payload: CategoriaPayload) {
    if (!token) return;

    if (editando) {
      await editarCategoriaAdmin(token, editando.id, payload);
    } else {
      await crearCategoriaAdmin(token, payload);
    }

    setEditando(null);
    setCreando(false);
    await cargar();
  }

  async function eliminar(categoria: CategoriaAdmin) {
    if (!token) return;
    const ok = confirm(`¿Seguro que querés eliminar "${categoria.nombre}"?`);
    if (!ok) return;

    try {
      await eliminarCategoriaAdmin(token, categoria.id);
      await cargar();
    } catch (err: any) {
      alert(err.message || "No se pudo eliminar.");
    }
  }

  function alSoltar(indiceDestino: number) {
    if (arrastrando === null || arrastrando === indiceDestino) {
      setArrastrando(null);
      return;
    }

    const copia = [...categorias];
    const [movida] = copia.splice(arrastrando, 1);
    copia.splice(indiceDestino, 0, movida);

    // Actualizamos los numeros de orden en pantalla
    const reordenadas = copia.map((c, i) => ({ ...c, orden: i + 1 }));
    setCategorias(reordenadas);
    setArrastrando(null);

    guardarOrden(reordenadas.map((c) => c.id));
  }

  async function guardarOrden(ids: number[]) {
    if (!token) return;
    setGuardandoOrden(true);
    try {
      await reordenarCategoriasAdmin(token, ids);
    } catch (err: any) {
      alert(err.message || "No se pudo guardar el orden.");
      await cargar();
    } finally {
      setGuardandoOrden(false);
    }
  }

  return (
    <section className="max-w-4xl mx-auto">
      <Link href="/admin" className="text-purple-400 text-sm">
        ← Volver al panel
      </Link>

      <div className="mt-4 flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-purple-100">Categorías</h1>

        <button
          onClick={() => setCreando(true)}
          className="border border-purple-400 px-4 py-2 rounded-lg text-purple-200"
        >
          + Nueva categoría
        </button>
      </div>

      <p className="text-sm text-purple-400 mb-6">
        Arrastrá desde el ícono ☰ para cambiar el orden.
        {guardandoOrden && (
          <span className="ml-2 text-purple-300">Guardando orden...</span>
        )}
      </p>

      {cargando && <p className="text-purple-300">Cargando...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="flex flex-col gap-3">
        {categorias.map((categoria, indice) => (
          <div
            key={categoria.uuid}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => alSoltar(indice)}
            className={`
              border rounded-xl bg-black/40 p-4 flex flex-wrap items-center gap-4
              ${arrastrando === indice
                ? "border-purple-300 opacity-50"
                : "border-purple-700"}
            `}
          >
            {/* AGARRE PARA ARRASTRAR */}
            <div
              draggable
              onDragStart={() => setArrastrando(indice)}
              onDragEnd={() => setArrastrando(null)}
              className="cursor-grab active:cursor-grabbing text-purple-400 text-xl select-none px-1"
              title="Arrastrar para reordenar"
            >
              ☰
            </div>

            <span className="w-8 h-8 shrink-0 rounded-lg border border-purple-700 flex items-center justify-center text-purple-400 text-sm">
              {categoria.orden}
            </span>

            <div className="flex-1 min-w-[180px]">
              <p className="text-purple-100 font-bold">
                {categoria.nombre}
                {categoria.activa === 0 && (
                  <span className="ml-2 text-xs text-red-400">(inactiva)</span>
                )}
              </p>
              <p className="text-xs text-purple-500">/{categoria.slug}</p>
              <p className="text-xs text-purple-400 mt-1">
                {categoria.cantidadProductos} producto(s)
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditando(categoria)}
                className="border border-purple-500 px-3 py-1 rounded-lg text-sm text-purple-200"
              >
                Editar
              </button>
              <button
                onClick={() => eliminar(categoria)}
                className="border border-red-500 px-3 py-1 rounded-lg text-sm text-red-300"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {(creando || editando) && (
        <FormularioCategoria
          categoria={editando}
          onGuardar={guardar}
          onCancelar={() => {
            setCreando(false);
            setEditando(null);
          }}
        />
      )}
    </section>
  );
}