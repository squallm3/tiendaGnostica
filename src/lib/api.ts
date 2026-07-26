const API_URL = "http://192.168.1.133:3001/api";

export async function obtenerProductos() {
  const respuesta = await fetch(`${API_URL}/productos`, {
    cache: "no-store",
  });

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los productos.");
  }

  const productos = await respuesta.json();

  console.log("API productos:", JSON.stringify(productos, null, 2));

  return productos;
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