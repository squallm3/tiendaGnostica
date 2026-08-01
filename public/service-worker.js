// Service worker minimo, solo para que la app sea instalable.
// No cachea nada todavia (para evitar mostrar carrito/catalogo desactualizado).

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  self.clients.claim();
});

self.addEventListener("fetch", () => {
  // No-op: dejamos pasar todo directo a la red.
});