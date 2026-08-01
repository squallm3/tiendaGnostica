import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://192.168.1.133:3001/api";

export async function POST(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  const respuesta = await fetch(`${API_URL}/usuarios/sync`, {
    method: "POST",
    headers: {
      Authorization: authorization ?? "",
    },
  });

  const data = await respuesta.json();

  return NextResponse.json(data, { status: respuesta.status });
}