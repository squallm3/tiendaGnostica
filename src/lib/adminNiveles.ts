export interface NivelAdmin {
  id: number;
  uuid: string;
  titulo: string | null;
  artefacto: string | null;
  descripcionArtefacto: string | null;
  loreArtefacto: string | null;
  estiloPersonaje: string | null;
  estiloArtefacto: string | null;
  xpAcumulada: number | null;
  imagenA: string | null;
  imagenB: string | null;
  imagenA3d: string | null;
}

export interface NivelPayload {
  titulo: string | null;
  artefacto: string | null;
  descripcionArtefacto: string | null;
  loreArtefacto: string | null;
  estiloPersonaje: string | null;
  estiloArtefacto: string | null;
  xpAcumulada: number;
  imagenA: string | null;
  imagenB: string | null;
  imagenA3d: string | null;
}

async function manejar(respuesta: Response) {
  const data = await respuesta.json();
  if (!respuesta.ok) {
    throw new Error(data?.error || "Ocurrió un error");
  }
  return data;
}

export async function listarNivelesAdmin(
  token: string
): Promise<NivelAdmin[]> {
  const respuesta = await fetch("/api/admin/niveles", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return manejar(respuesta);
}

export async function editarNivelAdmin(
  token: string,
  id: number,
  payload: NivelPayload
) {
  const respuesta = await fetch(`/api/admin/niveles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return manejar(respuesta);
}