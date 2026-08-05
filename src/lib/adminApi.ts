export interface ProductoAdmin {
  id: number;
  uuid: string;
  categoriaId: number;
  categoriaNombre: string | null;
  nombre: string;
  slug: string;
  descripcionCorta: string | null;
  descripcionLarga: string | null;
  lore: string | null;
  precio: string;
  precioOferta: string | null;
  nivelRequerido: number | null;
  rareza: string;
  peso: string | null;
  stock: number;
  activo: number;
  imagenes: string[];
}

export interface ProductoPayload {
  categoriaId: number;
  nombre: string;
  slug: string;
  descripcionCorta: string | null;
  descripcionLarga: string | null;
  lore: string | null;
  precio: number;
  precioOferta: number | null;
  nivelRequerido: number;
  rareza: string;
  peso: number | null;
  stock: number;
  activo: boolean;
  imagenes: string[];
}

export interface CategoriaAdmin {
  id: number;
  uuid: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  icono: string | null;
  orden: number;
  activa: number;
  cantidadProductos: number;
}

export interface CategoriaPayload {
  nombre: string;
  slug: string;
  descripcion: string | null;
  icono: string | null;
  orden: number;
  activa: boolean;
}

async function manejar(respuesta: Response) {
  const data = await respuesta.json();
  if (!respuesta.ok) {
    throw new Error(data?.error || "Ocurrió un error");
  }
  return data;
}

// ---------- PRODUCTOS ----------

export async function listarProductosAdmin(
  token: string
): Promise<ProductoAdmin[]> {
  const respuesta = await fetch("/api/admin/productos", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return manejar(respuesta);
}

export async function crearProductoAdmin(
  token: string,
  payload: ProductoPayload
) {
  const respuesta = await fetch("/api/admin/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return manejar(respuesta);
}

export async function editarProductoAdmin(
  token: string,
  id: number,
  payload: ProductoPayload
) {
  const respuesta = await fetch(`/api/admin/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return manejar(respuesta);
}

export async function eliminarProductoAdmin(token: string, id: number) {
  const respuesta = await fetch(`/api/admin/productos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return manejar(respuesta);
}

// ---------- CATEGORIAS ----------

export async function listarCategoriasAdmin(
  token: string
): Promise<CategoriaAdmin[]> {
  const respuesta = await fetch("/api/admin/categorias", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return manejar(respuesta);
}

export async function crearCategoriaAdmin(
  token: string,
  payload: CategoriaPayload
) {
  const respuesta = await fetch("/api/admin/categorias", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return manejar(respuesta);
}

export async function editarCategoriaAdmin(
  token: string,
  id: number,
  payload: CategoriaPayload
) {
  const respuesta = await fetch(`/api/admin/categorias/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return manejar(respuesta);
}

export async function eliminarCategoriaAdmin(token: string, id: number) {
  const respuesta = await fetch(`/api/admin/categorias/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return manejar(respuesta);
}