import { NextResponse } from 'next/server';

// Evita que Next.js cachee esta ruta: el feed siempre tiene que
// reflejar el stock y los precios actuales.
export const dynamic = 'force-dynamic';

const SITIO_PUBLICO = 'https://haikusgnosticos.duckdns.org';

// Nombre a usar como "marca" en el feed. Tu catálogo no tiene un
// campo de marca por producto (usa categoría/rareza en su lugar),
// así que por ahora usamos el nombre de la tienda. Cambialo si querés.
const MARCA_POR_DEFECTO = 'Haikus Gnósticos';

// Forma real que devuelve GET /api/productos en tu backend
// (routes/productos.js)
interface Producto {
  id: number;
  uuid: string;
  nombre: string;
  slug: string;
  descripcionCorta: string | null;
  descripcionLarga: string | null;
  precio: number | string;       // mysql2 a veces devuelve decimales como string
  precioOferta: number | string | null;
  stock: number;
  categoriaNombre: string | null;
  imagenes: string[];            // ej: ["/uploads/productos/abc123.webp"]
}

function escapeCsvField(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function productoToFeedRow(p: Producto): string | null {
  // Si no tiene ninguna imagen, Meta lo va a rechazar igual -> lo salteamos
  if (!p.imagenes || p.imagenes.length === 0) return null;

  const precio = Number(p.precio);
  const precioOferta = p.precioOferta ? Number(p.precioOferta) : null;

  const fields = [
    p.uuid,
    p.nombre,
    (p.descripcionCorta || p.descripcionLarga || '').slice(0, 5000),
    p.stock > 0 ? 'in stock' : 'out of stock',
    'new',
    `${precio.toFixed(2)} ARS`,
    `${SITIO_PUBLICO}/tienda/productos/${p.slug}`,
    // La imagen viene del backend como ruta relativa (/uploads/productos/xxx.webp).
    // Tu next.config.ts ya la resuelve con un rewrite, así que esto funciona tal cual.
    `${SITIO_PUBLICO}${p.imagenes[0]}`,
    p.categoriaNombre || MARCA_POR_DEFECTO,
    String(p.stock),
    precioOferta ? `${precioOferta.toFixed(2)} ARS` : ''
  ];

  return fields.map(escapeCsvField).join(',');
}

export async function GET() {
  try {
    // API_URL ya está definida en tu docker-compose.yml del frontend:
    // API_URL=http://192.168.1.133:3001/api
    const apiUrl = process.env.API_URL;

    const res = await fetch(`${apiUrl}/productos`, { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`API interna respondió ${res.status}`);
    }

    const productos: Producto[] = await res.json();

    const headers = [
      'id', 'title', 'description', 'availability', 'condition',
      'price', 'link', 'image_link', 'brand',
      'quantity_to_sell_on_facebook', 'sale_price'
    ].join(',');

    const rows = productos
      .map(productoToFeedRow)
      .filter((row): row is string => row !== null);

    const csv = [headers, ...rows].join('\n');

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (err) {
    console.error('Error generando feed de productos:', err);
    return new NextResponse('Error generando el feed', { status: 500 });
  }
}