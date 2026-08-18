import { NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://192.168.1.133:3001/api";

export async function GET() {
  const respuesta = await fetch(`${API_URL}/tipos-articulo-nivel`, {
    cache: "no-store",
  });

  const data = await respuesta.json();
  return NextResponse.json(data, { status: respuesta.status });
}
