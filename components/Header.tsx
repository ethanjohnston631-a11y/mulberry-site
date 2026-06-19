"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const { count, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-bone/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Mulberry" width={28} height={28} className="h-7 w-7 object-contain" />
          <span className="text-lg font-medium tracking-widest2 uppercase">Mulberry</span>
        </Link>

        <nav className="hidden items-center gap-10 text-sm uppercase tracking-widest2 md:flex">
          <Link href="/products" className="transition-opacity hover:opacity-60">
            Shop
          </Link>
          <Link href="/#about" className="transition-opacity hover:opacity-60">
            About
          </Link>
        </nav>

        <button
          onClick={openCart}
          className="flex items-center gap-2 text-sm uppercase tracking-widest2 transition-opacity hover:opacity-60"
          aria-label="Open cart"
        >
          Bag {count > 0 && <span className="text-stone">({count})</span>}
        </button>
      </div>
    </header>
  );
}
