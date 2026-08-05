export interface UsuarioAdmin {
  id: string;
  uuid: string;
  email: string;
  nombre: string | null;
  apellido: string | null;
  rol: string;
  activo: number;
  createdAt: string;
}

async function manejar(respuesta: Response) {
  const data = await respuesta.json();
  if (!respuesta.ok) {
    throw new Error(data?.error || "Ocurrió un error");
  }
  return data;
}

export async function listarUsuariosAdmin(
  token: string
): Promise<UsuarioAdmin[]> {
  const respuesta = await fetch("/api/admin/usuarios", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return manejar(respuesta);
}

export async function cambiarRolUsuario(
  token: string,
  id: string,
  rol: "cliente" | "admin"
) {
  const respuesta = await fetch(`/api/admin/usuarios/${id}/rol`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ rol }),
  });
  return manejar(respuesta);
}

export async function cambiarActivoUsuario(
  token: string,
  id: string,
  activo: boolean
) {
  const respuesta = await fetch(`/api/admin/usuarios/${id}/activo`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ activo }),
  });
  return manejar(respuesta);
}