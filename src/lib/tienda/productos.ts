import {
  obtenerProductos,
  obtenerProductoPorSlug,
  obtenerCategorias,
  obtenerCategoriaPorSlug,
} from "@/lib/api";
import type {
  Producto,
  ProductoDetalle,
  Categoria,
  CategoriaDetalle,
} from "@/lib/tienda/types";

export async function obtenerProductosTienda(): Promise<Producto[]> {
  return obtenerProductos();
}

export async function obtenerProductoTienda(
  slug: string
): Promise<ProductoDetalle | null> {
  return obtenerProductoPorSlug(slug);
}

export async function obtenerCategoriasTienda(): Promise<Categoria[]> {
  return obtenerCategorias();
}

export async function obtenerCategoriaTienda(
  slug: string
): Promise<CategoriaDetalle | null> {
  return obtenerCategoriaPorSlug(slug);
}