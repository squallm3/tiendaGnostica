// Tipos que reflejan exactamente lo que devuelve hk-backend (puerto 3001)

export type Rareza = "comun" | "raro" | "epico" | "legendario";

// GET /api/productos (listado)
export interface Producto {
  id: number;
  uuid: string;
  categoriaId: number;
  nombre: string;
  slug: string;
  descripcionCorta: string | null;
  descripcionLarga: string | null;
  lore: string | null;
  precio: string; // viene como string desde MySQL (decimal)
  nivelRequerido: number | null;
  rareza: Rareza;
  activo: boolean;
  peso: string | null;
  stock: number;
  fechaAlta: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  categoriaNombre: string;
  imagenes: string[]; // solo las URLs
}

// Imagen completa (viene así en el detalle de producto)
export interface ProductoImagen {
  id: number;
  uuid: string;
  productoId: number;
  url: string;
  tipo: "producto" | "detalle" | "banner" | "miniatura";
  orden: number;
  createdAt: string;
  updatedAt: string;
}

// Variante (talle/color) de un producto
export interface ProductoVariante {
  id: number;
  uuid: string;
  productoId: number;
  talle: string | null;
  color: string | null;
  stock: number;
  precioExtra: string;
  sku: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// GET /api/productos/:slug (detalle)
export interface ProductoDetalle
  extends Omit<Producto, "categoriaNombre" | "imagenes"> {
  variantes: ProductoVariante[];
  imagenes: ProductoImagen[];
}

// GET /api/categorias (listado)
export interface Categoria {
  id: number;
  uuid: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  icono: string | null;
  bannerDesktop: string | null;
  bannerTablet: string | null;
  bannerMobile: string | null;
  orden: number;
  activa: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// GET /api/categorias/:slug (detalle, incluye sus productos)
export interface CategoriaDetalle extends Categoria {
  productos: Omit<Producto, "categoriaNombre">[];
}