"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  id: string; // identificador unico del item en el carrito (ej: varianteId o productoId-slug)
  productoId: number;
  varianteId: number | null;
  nombre: string;
  precioUnitario: number;
  imagen: string | null;
  talle?: string | null;
  color?: string | null;
  cantidad: number;
}

interface CartContextValue {
  items: CartItem[];
  cantidadTotal: number;
  total: number;
  agregarAlCarrito: (item: Omit<CartItem, "cantidad">, cantidad?: number) => void;
  quitarDelCarrito: (id: string) => void;
  actualizarCantidad: (id: string, cantidad: number) => void;
  vaciarCarrito: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "hk-carrito";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cargado, setCargado] = useState(false);

  // Cargar el carrito guardado al iniciar
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (guardado) {
        setItems(JSON.parse(guardado));
      }
    } catch (error) {
      console.error("Error al leer el carrito guardado:", error);
    } finally {
      setCargado(true);
    }
  }, []);

  // Guardar cada vez que cambian los items (una vez que ya cargamos el inicial)
  useEffect(() => {
    if (!cargado) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, cargado]);

  function agregarAlCarrito(
    item: Omit<CartItem, "cantidad">,
    cantidad: number = 1
  ) {
    setItems((prev) => {
      const existente = prev.find((i) => i.id === item.id);

      if (existente) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, cantidad: i.cantidad + cantidad }
            : i
        );
      }

      return [...prev, { ...item, cantidad }];
    });
  }

  function quitarDelCarrito(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function actualizarCantidad(id: string, cantidad: number) {
    if (cantidad <= 0) {
      quitarDelCarrito(id);
      return;
    }

    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, cantidad } : i))
    );
  }

  function vaciarCarrito() {
    setItems([]);
  }

  const cantidadTotal = items.reduce((acc, i) => acc + i.cantidad, 0);
  const total = items.reduce(
    (acc, i) => acc + i.precioUnitario * i.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        cantidadTotal,
        total,
        agregarAlCarrito,
        quitarDelCarrito,
        actualizarCantidad,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}