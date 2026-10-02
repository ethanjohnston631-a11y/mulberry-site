"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { cartCount, lineKey, sanitizeCart, type CartItem } from "@/lib/cart-items";

export type { CartItem };

export type AccountUser = { email: string; marketingOptIn: boolean };

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
  user: AccountUser | null;
  accountsEnabled: boolean;
  sessionLoaded: boolean;
  refreshSession: () => Promise<void>;
  setUser: (user: AccountUser | null) => void;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "mulberry-cart";

function readLocal(): CartItem[] {
  try {
    return sanitizeCart(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
  } catch {
    return [];
  }
}

function writeLocal(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

async function pushServerCart(items: CartItem[]) {
  const res = await fetch("/api/cart", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  if (!res.ok) throw new Error("cart sync failed");
}

// The bag is always saved on the device. When the customer is signed in it is also saved to their
// account, so it follows them across devices; on sign-in the device bag and account bag are merged.
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [user, setUserState] = useState<AccountUser | null>(null);
  const [accountsEnabled, setAccountsEnabled] = useState(false);
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const syncedFor = useRef<string | null>(null);
  const skipNextPush = useRef(false);

  useEffect(() => {
    setItems(readLocal());
    setHydrated(true);
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session", { cache: "no-store" });
      const data = await res.json();
      setAccountsEnabled(!!data.accountsEnabled);
      setUserState(data.user ?? null);
    } catch {
      setUserState(null);
    } finally {
      setSessionLoaded(true);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  // Merge the device bag into the account bag once per sign-in.
  useEffect(() => {
    if (!hydrated || !user) {
      if (!user) syncedFor.current = null;
      return;
    }
    if (syncedFor.current === user.email) return;
    syncedFor.current = user.email;

    (async () => {
      try {
        const res = await fetch("/api/cart", { cache: "no-store" });
        if (!res.ok) return;
        const { items: remote } = await res.json();
        const merged = sanitizeCart([...(remote as CartItem[]), ...readLocal()].reduce<CartItem[]>((acc, item) => {
          const existing = acc.find((i) => lineKey(i.slug, i.color, i.size) === lineKey(item.slug, item.color, item.size));
          if (existing) existing.quantity = Math.max(existing.quantity, item.quantity);
          else acc.push({ ...item });
          return acc;
        }, []));
        skipNextPush.current = true;
        setItems(merged);
        writeLocal(merged);
        await pushServerCart(merged);
      } catch {}
    })();
  }, [hydrated, user]);

  useEffect(() => {
    if (!hydrated) return;
    writeLocal(items);
    if (skipNextPush.current) {
      skipNextPush.current = false;
      return;
    }
    if (user && syncedFor.current === user.email) pushServerCart(items).catch(() => {});
  }, [items, hydrated, user]);

  function addItem(item: Omit<CartItem, "quantity">, quantity = 1) {
    setItems((prev) => sanitizeCart([...prev, { ...item, quantity }]));
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
      sanitizeCart(prev.map((i) => (lineKey(i.slug, i.color, i.size) === lineKey(slug, color, size) ? { ...i, quantity } : i)))
    );
  }

  const clearCart = useCallback(() => setItems([]), []);

  const setUser = useCallback((next: AccountUser | null) => {
    setUserState(next);
    if (!next) {
      // Signing out removes the account's bag from this device.
      skipNextPush.current = true;
      setItems([]);
    }
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

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
        count: cartCount(items),
        user,
        accountsEnabled,
        sessionLoaded,
        refreshSession,
        setUser,
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
