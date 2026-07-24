export default async function TestApiPage() {
  const respuesta = await fetch("http://192.168.1.133:3001/api/productos", {
    cache: "no-store",
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo conectar con la API.");
  }

  const productos = await respuesta.json();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Prueba de conexión con la API
      </h1>

      <p className="mb-6">
        Productos recibidos: <strong>{productos.length}</strong>
      </p>

      <ul className="space-y-4">
        {productos.map((producto: any) => (
          <li
            key={producto.uuid}
            className="border p-4 rounded-lg"
          >
            <p><strong>{producto.nombre}</strong></p>
            <p>Precio: ${producto.precio}</p>
            <p>Categoría: {producto.categoriaNombre}</p>
            <p>Nivel requerido: {producto.nivelRequerido}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}