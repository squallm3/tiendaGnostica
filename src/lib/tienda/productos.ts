import {
  obtenerProductos,
  obtenerCategorias,
  obtenerCategoriaPorSlug,
} from "@/lib/api";
import type { Producto, Categoria, CategoriaDetalle } from "@/lib/tienda/types";

export async function obtenerProductosTienda(): Promise<Producto[]> {
  return obtenerProductos();
}

export async function obtenerCategoriasTienda(): Promise<Categoria[]> {
  return obtenerCategorias();
}

export async function obtenerCategoriaTienda(
  slug: string
): Promise<CategoriaDetalle | null> {
  return obtenerCategoriaPorSlug(slug);
}