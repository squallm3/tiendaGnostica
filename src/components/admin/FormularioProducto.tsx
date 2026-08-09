"use client";

import { useRef, useState } from "react";
import { useAuth } from "@/lib/tienda/AuthContext";
import type { ProductoAdmin, ProductoPayload } from "@/lib/adminApi";

interface Categoria {
  id: number;
  nombre: string;
}

interface Props {
  producto: ProductoAdmin | null;
  categorias: Categoria[];
  onGuardar: (payload: ProductoPayload) => Promise<void>;
  onCancelar: () => void;
}

const RAREZAS = ["comun", "raro", "epico", "legendario"];

export default function FormularioProducto({
  producto,
  categorias,
  onGuardar,
  onCancelar,
}: Props) {
  const { token } = useAuth();

  const [nombre, setNombre] = useState(producto?.nombre ?? "");
  const [slug, setSlug] = useState(producto?.slug ?? "");
  const [categoriaId, setCategoriaId] = useState(
    producto?.categoriaId ?? categorias[0]?.id ?? 1
  );
  const [descripcionCorta, setDescripcionCorta] = useState(
    producto?.descripcionCorta ?? ""
  );
  const [descripcionLarga, setDescripcionLarga] = useState(
    producto?.descripcionLarga ?? ""
  );
  const [lore, setLore] = useState(producto?.lore ?? "");
  const [precio, setPrecio] = useState(producto?.precio ?? "");
  const [precioOferta, setPrecioOferta] = useState(
    producto?.precioOferta ?? ""
  );
  const [esGeneral, setEsGeneral] = useState(
    producto ? (producto.nivelRequerido ?? 1) === 1 : true
  );
  const [nivelRequerido, setNivelRequerido] = useState(
    producto?.nivelRequerido ?? 1
  );
  const [rareza, setRareza] = useState(producto?.rareza ?? "comun");
  const [peso, setPeso] = useState(producto?.peso ?? "");
  const [activo, setActivo] = useState(
    producto ? producto.activo === 1 : true
  );
  const [imagenes, setImagenes] = useState<string[]>(
    producto?.imagenes?.length ? producto.imagenes : [""]
  );

  const [subiendo, setSubiendo] = useState<number | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputsArchivo = useRef<(HTMLInputElement | null)[]>([]);

  function generarSlug(texto: string) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  }

  function cambiarImagen(indice: number, valor: string) {
    const copia = [...imagenes];
    copia[indice] = valor;
    setImagenes(copia);
  }

  function agregarImagen() {
    setImagenes([...imagenes, ""]);
  }

  function quitarImagen(indice: number) {
    const copia = imagenes.filter((_, i) => i !== indice);
    setImagenes(copia.length ? copia : [""]);
  }

  async function subirArchivo(indice: number, archivo: File) {
    if (!token) return;

    setSubiendo(indice);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("imagen", archivo);

      const respuesta = await fetch("/api/admin/uploads", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(data?.error || "No se pudo subir la imagen");
      }

      cambiarImagen(indice, data.url);
    } catch (err: any) {
      setError(err.message || "No se pudo subir la imagen.");
    } finally {
      setSubiendo(null);
    }
  }

  async function guardar() {
    if (!nombre.trim() || !slug.trim()) {
      setError("El nombre y el slug son obligatorios.");
      return;
    }

    setGuardando(true);
    setError(null);

    try {
      await onGuardar({
        categoriaId: Number(categoriaId),
        nombre: nombre.trim(),
        slug: slug.trim(),
        descripcionCorta: descripcionCorta.trim() || null,
        descripcionLarga: descripcionLarga.trim() || null,
        lore: lore.trim() || null,
        precio: Number(precio) || 0,
        precioOferta: precioOferta ? Number(precioOferta) : null,
        nivelRequerido: esGeneral ? 1 : Number(nivelRequerido),
        rareza,
        peso: peso ? Number(peso) : null,
        activo,
        imagenes: imagenes.map((i) => i.trim()).filter(Boolean),
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
      <div className="max-w-2xl mx-auto border border-purple-500 rounded-xl bg-black p-6">
        <h2 className="text-2xl font-bold text-purple-100 mb-6">
          {producto ? "Editar producto" : "Nuevo producto"}
        </h2>

        <div className="flex flex-col gap-4">
          {/* IMAGENES */}
          <div className="border border-purple-700 rounded-lg p-4">
            <p className="text-purple-100 font-bold mb-3">Imágenes</p>

            {imagenes.map((url, indice) => (
              <div key={indice} className="flex gap-3 items-start mb-4">
                <div className="w-20 h-20 shrink-0 bg-black border border-purple-700 rounded overflow-hidden flex items-center justify-center">
                  {url.trim() ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={url}
                      alt="Vista previa"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-[10px] text-purple-600 text-center px-1">
                      Sin imagen
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <input
                    className={input}
                    placeholder="/tienda/mercader/remeras/01.jpg"
                    value={url}
                    onChange={(e) => cambiarImagen(indice, e.target.value)}
                  />

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={(el) => {
                      inputsArchivo.current[indice] = el;
                    }}
                    onChange={(e) => {
                      const archivo = e.target.files?.[0];
                      if (archivo) subirArchivo(indice, archivo);
                      e.target.value = "";
                    }}
                  />

                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() => inputsArchivo.current[indice]?.click()}
                      disabled={subiendo === indice}
                      className="border border-purple-500 px-3 py-1 rounded-lg text-xs text-purple-200 disabled:opacity-40"
                    >
                      {subiendo === indice ? "Subiendo..." : "Explorar..."}
                    </button>

                    <button
                      type="button"
                      onClick={() => quitarImagen(indice)}
                      className="text-xs text-red-400"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={agregarImagen}
              className="text-xs text-purple-400 underline"
            >
              + Agregar otra imagen
            </button>

            <p className="mt-3 text-xs text-purple-500">
              Podés subir un archivo desde tu computadora con Explorar, o
              escribir la ruta de una imagen que ya esté en el proyecto.
              Máximo 5 MB.
            </p>
          </div>

          <div>
            <label className={label}>Nombre</label>
            <input
              className={input}
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
                if (!producto) setSlug(generarSlug(e.target.value));
              }}
            />
          </div>

          <div>
            <label className={label}>
              Slug (aparece en la URL del producto)
            </label>
            <input
              className={input}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            {producto && (
              <p className="mt-1 text-xs text-amber-400">
                Si lo cambiás, la URL vieja del producto deja de funcionar.
              </p>
            )}
            <button
              type="button"
              onClick={() => setSlug(generarSlug(nombre))}
              className="mt-2 text-xs text-purple-400 underline"
            >
              Generar desde el nombre
            </button>
          </div>

          <div>
            <label className={label}>Categoría</label>
            <select
              className={input}
              value={categoriaId}
              onChange={(e) => setCategoriaId(Number(e.target.value))}
            >
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={label}>Descripción corta</label>
            <input
              className={input}
              value={descripcionCorta}
              onChange={(e) => setDescripcionCorta(e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Descripción larga</label>
            <textarea
              className={input}
              rows={3}
              value={descripcionLarga}
              onChange={(e) => setDescripcionLarga(e.target.value)}
            />
          </div>

          <div>
            <label className={label}>Lore</label>
            <textarea
              className={input}
              rows={2}
              value={lore}
              onChange={(e) => setLore(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Precio</label>
              <input
                type="number"
                className={input}
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>

            <div>
              <label className={label}>
                Precio de oferta (vacío = sin oferta)
              </label>
              <input
                type="number"
                className={input}
                value={precioOferta ?? ""}
                onChange={(e) => setPrecioOferta(e.target.value)}
              />
            </div>
          </div>

          {/* PRODUCTO GENERAL */}
          <div className="border border-purple-700 rounded-lg p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={esGeneral}
                onChange={(e) => setEsGeneral(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-purple-100 font-bold">
                ¿Es un producto general?
              </span>
            </label>

            <p className="mt-2 text-xs text-purple-400">
              Si está marcado, lo puede ver y comprar cualquiera (nivel 1).
              Si lo desmarcás, se bloquea hasta que el usuario alcance el
              nivel que elijas.
            </p>

            {!esGeneral && (
              <div className="mt-3">
                <label className={label}>Nivel requerido</label>
                <input
                  type="number"
                  min={1}
                  className={input}
                  value={nivelRequerido}
                  onChange={(e) => setNivelRequerido(Number(e.target.value))}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Rareza</label>
              <select
                className={input}
                value={rareza}
                onChange={(e) => setRareza(e.target.value)}
              >
                {RAREZAS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={label}>Peso (kg)</label>
              <input
                type="number"
                className={input}
                value={peso ?? ""}
                onChange={(e) => setPeso(e.target.value)}
              />
            </div>
          </div>

          <p className="text-xs text-purple-500 -mt-2">
            El stock se maneja desde "Variantes", después de guardar este
            producto.
          </p>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={activo}
              onChange={(e) => setActivo(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-purple-200">
              Activo (visible en la tienda)
            </span>
          </label>

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