"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkout() {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
        signal: controller.signal,
      });

      const data = await res.json();

      if (data.url) {
        // Stay in loading state while browser navigates to Stripe
        window.location.href = data.url;
        return;
      }

      setError(data.error ?? "Checkout failed. Please try again.");
      setLoading(false);
    } catch (err) {
      const isTimeout = err instanceof Error && err.name === "AbortError";
      setError(isTimeout ? "Request timed out. Please try again." : "Could not reach checkout. Please try again.");
      setLoading(false);
    } finally {
      clearTimeout(timeout);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-bone shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
              <h2 className="text-sm uppercase tracking-widest2">Your Bag</h2>
              <button onClick={closeCart} aria-label="Close cart" className="text-xl leading-none">
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <p className="text-sm text-stone">Your bag is empty.</p>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={`${item.slug}-${item.color}-${item.size}`} className="flex gap-4">
                      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-white">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between text-sm">
                          <span>{item.name}</span>
                          <span>${item.price}</span>
                        </div>
                        <p className="mt-1 text-xs text-stone">
                          {item.color} / {item.size}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-3 text-sm">
                            <button
                              onClick={() => updateQuantity(item.slug, item.color, item.size, item.quantity - 1)}
                              className="h-6 w-6 border border-black/15 transition hover:border-black/40"
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.slug, item.color, item.size, item.quantity + 1)}
                              className="h-6 w-6 border border-black/15 transition hover:border-black/40"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.slug, item.color, item.size)}
                            className="text-xs uppercase text-stone underline-offset-2 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-black/10 px-6 py-6">
                <div className="mb-4 flex justify-between text-sm uppercase tracking-widest2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {error && (
                  <p className="mb-3 text-xs text-red-600">{error}</p>
                )}
                <button
                  onClick={checkout}
                  disabled={loading}
                  className="w-full bg-ink py-4 text-sm uppercase tracking-widest2 text-bone transition hover:bg-gold disabled:opacity-50"
                >
                  {loading ? "Redirecting to Checkout…" : "Checkout"}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
