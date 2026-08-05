import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://192.168.1.133:3001/api";

export async function POST(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  // Reenviamos el formulario tal cual al backend
  const formData = await request.formData();

  const respuesta = await fetch(`${API_URL}/uploads/producto`, {
    method: "POST",
    headers: {
      Authorization: authorization ?? "",
    },
    body: formData,
  });

  const data = await respuesta.json();
  return NextResponse.json(data, { status: respuesta.status });
}