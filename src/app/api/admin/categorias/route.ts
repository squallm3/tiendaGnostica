import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://192.168.1.133:3001/api";

// Listado de categorias.
// Si viene con token de admin, trae el listado completo (incluye inactivas).
// Si no, trae solo las activas (se usa para los desplegables).
export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  const url = authorization
    ? `${API_URL}/categorias/admin`
    : `${API_URL}/categorias`;

  const respuesta = await fetch(url, {
    headers: authorization ? { Authorization: authorization } : {},
    cache: "no-store",
  });

  const data = await respuesta.json();
  return NextResponse.json(data, { status: respuesta.status });
}

// Crear categoria
export async function POST(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  const body = await request.json();

  const respuesta = await fetch(`${API_URL}/categorias`, {
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