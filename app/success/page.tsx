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
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-widest2 text-stone">Order Confirmed</p>
      <h1 className="mt-4 text-3xl font-light">Thank you.</h1>
      <p className="mt-4 leading-relaxed text-stone">
        Your order has been placed. A confirmation has been sent to your email with tracking details to follow.
      </p>
      <Link
        href="/products"
        className="mt-8 bg-ink px-8 py-4 text-sm uppercase tracking-widest2 text-bone transition hover:opacity-90"
      >
        Continue Shopping
      </Link>
    </main>
  );
}
