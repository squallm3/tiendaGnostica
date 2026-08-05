import Link from "next/link";

const SECCIONES = [
  {
    titulo: "Productos",
    descripcion:
      "Alta, edición, precios, ofertas, variantes e imágenes de los productos.",
    href: "/admin/productos",
    icono: "📦",
    disponible: true,
  },
  {
    titulo: "Categorías",
    descripcion: "Crear, editar y ordenar las categorías de la tienda.",
    href: "/admin/categorias",
    icono: "🗂️",
    disponible: true,
  },
  {
    titulo: "Usuarios",
    descripcion: "Gestionar cuentas y permisos de administración.",
    href: "/admin/usuarios",
    icono: "👤",
    disponible: false,
  },
];

export default function AdminHome() {
  return (
    <section className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-100 mb-2">
        Administración
      </h1>
      <p className="text-purple-300 mb-8">
        Elegí una sección para trabajar.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SECCIONES.map((seccion) => {
          const contenido = (
            <div
              className={`
                border
                border-purple-600
                rounded-xl
                bg-black/40
                p-6
                h-full
                ${seccion.disponible ? "hover:bg-purple-900/30 transition" : "opacity-40"}
              `}
            >
              <span className="text-3xl">{seccion.icono}</span>

              <h2 className="mt-3 text-xl font-bold text-purple-100">
                {seccion.titulo}
              </h2>

              <p className="mt-2 text-sm text-purple-300">
                {seccion.descripcion}
              </p>

              {!seccion.disponible && (
                <p className="mt-3 text-xs text-purple-500 uppercase tracking-wide">
                  Próximamente
                </p>
              )}
            </div>
          );

          return seccion.disponible ? (
            <Link key={seccion.titulo} href={seccion.href}>
              {contenido}
            </Link>
          ) : (
            <div key={seccion.titulo}>{contenido}</div>
          );
        })}
      </div>
    </section>
  );
}