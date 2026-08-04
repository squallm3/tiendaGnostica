import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "http://192.168.1.133:3001/api";

export async function POST(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  const body = await request.json();

  const respuesta = await fetch(`${API_URL}/pagos/preferencia`, {
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