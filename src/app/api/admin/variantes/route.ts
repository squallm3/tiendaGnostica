import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://192.168.1.133:3001/api";

// Listar variantes de un producto: /api/admin/variantes?productoId=1
export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  const productoId = request.nextUrl.searchParams.get("productoId");

  if (!productoId) {
    return NextResponse.json(
      { error: "Falta el productoId" },
      { status: 400 }
    );
  }

  const respuesta = await fetch(`${API_URL}/variantes/producto/${productoId}`, {
    headers: { Authorization: authorization ?? "" },
    cache: "no-store",
  });

  const data = await respuesta.json();
  return NextResponse.json(data, { status: respuesta.status });
}

// Crear variante
export async function POST(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  const body = await request.json();

  const respuesta = await fetch(`${API_URL}/variantes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization ?? "",
    },
    body: JSON.stringify(body),
  });

  const data = await respuesta.json();
  return NextResponse.json(data, { status: respuesta.status });
}