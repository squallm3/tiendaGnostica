import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://192.168.1.133:3001/api";

interface Props {
  params: Promise<{ id: string }>;
}

// Editar variante
export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const authorization = request.headers.get("authorization");
  const body = await request.json();

  const respuesta = await fetch(`${API_URL}/variantes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization ?? "",
    },
    body: JSON.stringify(body),
  });

  const data = await respuesta.json();
  return NextResponse.json(data, { status: respuesta.status });
}

// Eliminar variante (baja logica)
export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const authorization = request.headers.get("authorization");

  const respuesta = await fetch(`${API_URL}/variantes/${id}`, {
    method: "DELETE",
    headers: { Authorization: authorization ?? "" },
  });

  const data = await respuesta.json();
  return NextResponse.json(data, { status: respuesta.status });
}