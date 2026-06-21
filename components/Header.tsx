"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";

const EXPLORE = [
  { href: "/our-story", label: "Our Story" },
  { href: "/why-silk", label: "Why Silk" },
  { href: "/history", label: "The History of Mulberry Silk" },
  { href: "/care-guide", label: "Care Guide" },
  { href: "/journal", label: "Journal" },
];

export default function Header() {
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Mulberry Empire" width={30} height={30} className="h-7 w-7 object-contain" />
          <span className="font-serif text-lg tracking-widest2 uppercase">Mulberry Empire</span>
        </Link>

        <nav className="hidden items-center gap-9 text-[11px] uppercase tracking-widest2 md:flex">
          <Link href="/products" className="transition-opacity hover:opacity-60">
            Shop
          </Link>

          <div className="relative" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
            <button className="flex items-center gap-1.5 transition-opacity hover:opacity-60">Explore</button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 top-full w-64 -translate-x-1/2 border border-black/10 bg-ivory pt-2 shadow-xl"
                >
                  {EXPLORE.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-5 py-3 text-left normal-case tracking-normal text-[13px] text-ink/80 transition hover:bg-bone hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/faq" className="transition-opacity hover:opacity-60">
            FAQ
          </Link>
          <Link href="/contact" className="transition-opacity hover:opacity-60">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-5">
          <button
            onClick={openCart}
            className="flex items-center gap-2 text-[11px] uppercase tracking-widest2 transition-opacity hover:opacity-60"
            aria-label="Open cart"
          >
            Bag {count > 0 && <span className="text-gold">({count})</span>}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="text-[11px] uppercase tracking-widest2 md:hidden"
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-black/5 bg-ivory md:hidden"
          >
            <div className="flex flex-col px-6 py-4 text-sm uppercase tracking-widest2">
              <Link href="/products" className="py-3" onClick={() => setMobileOpen(false)}>
                Shop
              </Link>
              {EXPLORE.map((item) => (
                <Link key={item.href} href={item.href} className="py-3" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ))}
              <Link href="/faq" className="py-3" onClick={() => setMobileOpen(false)}>
                FAQ
              </Link>
              <Link href="/contact" className="py-3" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
