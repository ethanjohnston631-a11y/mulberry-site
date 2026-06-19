"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  color: string;
  size: string;
  image: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (slug: string, color: string, size: string) => void;
  updateQuantity: (slug: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  subtotal: number;
  count: number;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "mulberry-cart";

function lineKey(slug: string, color: string, size: string) {
  return `${slug}__${color}__${size}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(item: Omit<CartItem, "quantity">, quantity = 1) {
    setItems((prev) => {
      const key = lineKey(item.slug, item.color, item.size);
      const existing = prev.find((i) => lineKey(i.slug, i.color, i.size) === key);
      if (existing) {
        return prev.map((i) =>
          lineKey(i.slug, i.color, i.size) === key ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setIsOpen(true);
  }

  function removeItem(slug: string, color: string, size: string) {
    setItems((prev) => prev.filter((i) => lineKey(i.slug, i.color, i.size) !== lineKey(slug, color, size)));
  }

  function updateQuantity(slug: string, color: string, size: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(slug, color, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (lineKey(i.slug, i.color, i.size) === lineKey(slug, color, size) ? { ...i, quantity } : i))
    );
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        subtotal,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
