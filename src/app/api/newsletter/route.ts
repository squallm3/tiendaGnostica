import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const prefix = process.env.MAILCHIMP_SERVER_PREFIX;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!apiKey || !prefix || !audienceId) {
      console.error("Faltan variables de entorno de Mailchimp");
      return NextResponse.json(
        { error: "Servicio no disponible" },
        { status: 500 }
      );
    }

    const respuesta = await fetch(
      `https://${prefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `anystring:${apiKey}`
          ).toString("base64")}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
        }),
      }
    );

    const data = await respuesta.json();

    // Mailchimp devuelve 400 si el mail ya estaba suscripto.
    // Para el usuario eso no es un error.
    if (respuesta.status === 400 && data.title === "Member Exists") {
      return NextResponse.json({ ok: true, yaEstaba: true });
    }

    if (!respuesta.ok) {
      console.error("Error de Mailchimp:", data);
      return NextResponse.json(
        { error: "No se pudo suscribir" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error en /api/newsletter:", error);
    return NextResponse.json(
      { error: "No se pudo suscribir" },
      { status: 500 }
    );
  }
}