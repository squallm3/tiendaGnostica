export interface TipoArticuloAdmin {
  id: number;
  uuid: string;
  nombre: string;
  requiereTalle: number;
  tallesDisponibles: string[];
  requiereColor: number;
  precio: string;
  orden: number;
  activo: number;
}

export interface TipoArticuloPayload {
  nombre: string;
  requiereTalle: boolean;
  tallesDisponibles: string[];
  requiereColor: boolean;
  precio: number;
  activo: boolean;
}

async function manejar(respuesta: Response) {
  const data = await respuesta.json();
  if (!respuesta.ok) {
    throw new Error(data?.error || "Ocurrió un error");
  }
  return data;
}

export async function listarTiposArticuloAdmin(
  token: string
): Promise<TipoArticuloAdmin[]> {
  const respuesta = await fetch("/api/admin/tipos-articulo-nivel", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return manejar(respuesta);
}

export async function crearTipoArticuloAdmin(
  token: string,
  payload: TipoArticuloPayload
) {
  const respuesta = await fetch("/api/admin/tipos-articulo-nivel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return manejar(respuesta);
}

export async function editarTipoArticuloAdmin(
  token: string,
  id: number,
  payload: TipoArticuloPayload
) {
  const respuesta = await fetch(`/api/admin/tipos-articulo-nivel/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return manejar(respuesta);
}

export async function eliminarTipoArticuloAdmin(token: string, id: number) {
  const respuesta = await fetch(`/api/admin/tipos-articulo-nivel/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return manejar(respuesta);
}

export async function actualizarPreciosTipoArticulo(
  token: string,
  precios: { id: number; precio: number }[]
): Promise<TipoArticuloAdmin[]> {
  const respuesta = await fetch("/api/admin/tipos-articulo-nivel/precios", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ precios }),
  });
  return manejar(respuesta);
}