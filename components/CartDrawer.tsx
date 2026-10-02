"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { CHECKOUT_OPEN, POLICY, PREORDER_SHIP_ESTIMATE, STORE_MODE } from "@/lib/site-config";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, user, accountsEnabled } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const returnFocus = useRef<Element | null>(null);

  // Dialog behaviour: Escape closes, focus moves into the drawer and is trapped there, then
  // returns to whatever opened it.
  useEffect(() => {
    if (!isOpen) return;
    returnFocus.current = document.activeElement;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("button, a, input")?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
      if (e.key !== "Tab" || !panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>("button:not([disabled]), a, input:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      (returnFocus.current as HTMLElement | null)?.focus?.();
    };
  }, [isOpen, closeCart]);

  async function checkout() {
    if (!accepted) {
      setError("Please agree to the Terms and Returns Policy to continue.");
      return;
    }
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(({ slug, color, size, quantity }) => ({ slug, color, size, quantity })),
          acceptedTerms: true,
        }),
        signal: controller.signal,
      });
      const data = await res.json();

      if (data.url) {
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
            aria-hidden="true"
          />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-bone shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
              <h2 id="cart-title" className="text-sm uppercase tracking-widest2">Your Bag</h2>
              <button onClick={closeCart} aria-label="Close bag" className="-mr-2 p-2 text-xl leading-none">
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
                        <Image src={item.image} alt={`${item.name} in ${item.color}`} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between text-sm">
                          <span>{item.name}</span>
                          <span>${item.price}</span>
                        </div>
                        <p className="mt-1 text-xs text-stone">
                          {item.color} / {item.size}
                          {STORE_MODE === "preorder" && " · Pre-order"}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-3 text-sm">
                            <button
                              onClick={() => updateQuantity(item.slug, item.color, item.size, item.quantity - 1)}
                              aria-label={`Decrease quantity of ${item.color} ${item.size}`}
                              className="h-8 w-8 border border-black/15 transition hover:border-black/40"
                            >
                              −
                            </button>
                            <span aria-live="polite" aria-label={`Quantity ${item.quantity}`}>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.slug, item.color, item.size, item.quantity + 1)}
                              disabled={item.quantity >= POLICY.maxQtyPerLine}
                              aria-label={`Increase quantity of ${item.color} ${item.size}`}
                              className="h-8 w-8 border border-black/15 transition hover:border-black/40 disabled:opacity-40"
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

              {accountsEnabled && !user && items.length > 0 && (
                <p className="mt-8 border-t border-black/10 pt-5 text-xs leading-relaxed text-stone">
                  Your bag is saved on this device.{" "}
                  <Link href="/account" onClick={closeCart} className="text-ink underline underline-offset-2">
                    Sign in
                  </Link>{" "}
                  to keep it across devices and track your orders.
                </p>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-black/10 px-6 py-6">
                <div className="mb-1 flex justify-between text-sm uppercase tracking-widest2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="mb-4 text-xs text-stone">Shipping and any applicable taxes are shown at checkout before you pay.</p>

                {STORE_MODE === "preorder" && PREORDER_SHIP_ESTIMATE && (
                  <p className="mb-4 bg-ivory p-3 text-xs leading-relaxed text-stone">
                    <strong className="font-medium text-ink">Pre-order.</strong> Estimated to ship {PREORDER_SHIP_ESTIMATE}. You
                    can cancel for a full refund any time before your order ships.
                  </p>
                )}

                {CHECKOUT_OPEN ? (
                  <>
                    <label className="mb-4 flex items-start gap-3 text-xs leading-relaxed text-stone">
                      <input
                        type="checkbox"
                        checked={accepted}
                        onChange={(e) => {
                          setAccepted(e.target.checked);
                          setError(null);
                        }}
                        className="mt-0.5 h-4 w-4 accent-ink"
                      />
                      <span>
                        I agree to the{" "}
                        <Link href="/terms" onClick={closeCart} className="text-ink underline underline-offset-2">Terms of Service</Link>{" "}
                        and{" "}
                        <Link href="/returns" onClick={closeCart} className="text-ink underline underline-offset-2">Returns Policy</Link>, and
                        acknowledge the{" "}
                        <Link href="/privacy-policy" onClick={closeCart} className="text-ink underline underline-offset-2">Privacy Policy</Link>.
                      </span>
                    </label>
                    {error && <p role="alert" className="mb-3 text-xs text-red-700">{error}</p>}
                    <button
                      onClick={checkout}
                      disabled={loading}
                      className="w-full bg-ink py-4 text-sm uppercase tracking-widest2 text-bone transition hover:bg-gold disabled:opacity-50"
                    >
                      {loading ? "Redirecting to Secure Checkout…" : STORE_MODE === "preorder" ? "Pre-order Securely" : "Checkout Securely"}
                    </button>
                    <p className="mt-3 text-center text-[11px] text-stone">Payments are processed by Stripe. We never see or store your card details.</p>
                  </>
                ) : (
                  <div className="text-xs leading-relaxed text-stone">
                    <p className="mb-4">
                      The first production run isn&apos;t open for orders yet. We&apos;ve saved your bag. Join the waitlist and
                      you&apos;ll be the first to know when it opens.
                    </p>
                    <Link
                      href="/products/essential-hoodie-black#waitlist"
                      onClick={closeCart}
                      className="block w-full bg-ink py-4 text-center text-sm uppercase tracking-widest2 text-bone transition hover:bg-gold"
                    >
                      Join the Waitlist
                    </Link>
                  </div>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
