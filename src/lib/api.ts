const API_URL = process.env.API_URL || "http://192.168.1.133:3001/api";

export async function obtenerProductos() {
  const respuesta = await fetch(`${API_URL}/productos`, {
    cache: "no-store",
  });

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los productos.");
  }

  return respuesta.json();
}

export async function obtenerCategorias() {
  const respuesta = await fetch(`${API_URL}/categorias`, {
    cache: "no-store",
  });

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener las categorías.");
  }

  return respuesta.json();
}

export async function obtenerCategoriaPorSlug(slug: string) {
  const respuesta = await fetch(`${API_URL}/categorias/${slug}`, {
    cache: "no-store",
  });

  if (respuesta.status === 404) {
    return null;
  }

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener la categoría.");
  }

  return respuesta.json();
}