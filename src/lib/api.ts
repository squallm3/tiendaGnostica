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

export async function obtenerProductoPorSlug(slug: string) {
  const respuesta = await fetch(`${API_URL}/productos/${slug}`, {
    cache: "no-store",
  });

  if (respuesta.status === 404) {
    return null;
  }

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener el producto.");
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

export async function sincronizarUsuario(token: string) {
  const respuesta = await fetch(`${API_URL}/usuarios/sync`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo sincronizar el usuario.");
  }

  return respuesta.json();
}

interface CrearPedidoPayload {
  items: {
    varianteId: number | null;
    cantidad: number;
    precioUnitario: number;
    nombreProducto: string;
  }[];
  metodoPago: string;
  direccionEnvio: Record<string, unknown> | null;
  notas?: string;
}

export async function crearPedido(token: string, payload: CrearPedidoPayload) {
  const respuesta = await fetch(`${API_URL}/pedidos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo crear el pedido.");
  }

  return respuesta.json();
}