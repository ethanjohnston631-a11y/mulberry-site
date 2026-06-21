"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center bg-ivory px-6 text-center">
      <p className="text-[11px] uppercase tracking-widest2 text-gold">Order Confirmed</p>
      <h1 className="mt-4 font-serif text-4xl font-normal text-ink">Welcome to the few.</h1>
      <p className="mt-4 leading-relaxed text-stone">
        Your Sovereign is being prepared. A confirmation has been sent to your email with tracking details to follow.
      </p>
      <Link
        href="/products"
        className="mt-8 bg-ink px-8 py-4 text-[11px] uppercase tracking-widest2 text-bone transition hover:bg-gold"
      >
        Continue Shopping
      </Link>
    </main>
  );
}
