const API_URL = "http://192.168.1.133:3001/api";

export async function obtenerProductos() {
  const respuesta = await fetch(`${API_URL}/productos`, {
    cache: "no-store",
  });

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los productos.");
  }

  return respuesta.json();
}