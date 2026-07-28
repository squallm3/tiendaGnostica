import { obtenerProductos, obtenerCategorias } from "@/lib/api";
import type { Producto, Categoria } from "@/lib/tienda/types";

export async function obtenerProductosTienda(): Promise<Producto[]> {
  return obtenerProductos();
}

export async function obtenerCategoriasTienda(): Promise<Categoria[]> {
  return obtenerCategorias();
}