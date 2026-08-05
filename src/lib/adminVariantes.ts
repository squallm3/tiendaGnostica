export interface VarianteAdmin {
  id: number;
  uuid: string;
  productoId: number;
  talle: string | null;
  color: string | null;
  stock: number;
  precioExtra: string;
  sku: string | null;
}

export interface VariantePayload {
  productoId?: number;
  talle: string | null;
  color: string | null;
  stock: number;
  precioExtra: number;
  sku: string | null;
}

async function manejar(respuesta: Response) {
  const data = await respuesta.json();
  if (!respuesta.ok) {
    throw new Error(data?.error || "Ocurrió un error");
  }
  return data;
}

export async function listarVariantesAdmin(
  token: string,
  productoId: number
): Promise<VarianteAdmin[]> {
  const respuesta = await fetch(
    `/api/admin/variantes?productoId=${productoId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return manejar(respuesta);
}

export async function crearVarianteAdmin(
  token: string,
  payload: VariantePayload
) {
  const respuesta = await fetch("/api/admin/variantes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return manejar(respuesta);
}

export async function editarVarianteAdmin(
  token: string,
  id: number,
  payload: VariantePayload
) {
  const respuesta = await fetch(`/api/admin/variantes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return manejar(respuesta);
}

export async function eliminarVarianteAdmin(token: string, id: number) {
  const respuesta = await fetch(`/api/admin/variantes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return manejar(respuesta);
}