"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCTS } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";

export default function ProductsPage() {
  const product = PRODUCTS[0];
  const { addItem } = useCart();
  const [activeColor, setActiveColor] = useState(product.colors[0]);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);

  function handleAddToBag() {
    if (!activeSize) {
      setSizeError(true);
      return;
    }
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      color: activeColor.name,
      size: activeSize,
      image: activeColor.image,
    });
  }

  return (
    <main className="bg-ivory">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <Reveal>
          <SectionLabel>The Collection</SectionLabel>
          <h1 className="font-serif text-4xl font-normal text-ink md:text-5xl">The Sovereign Hoodie</h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-stone">
            One silhouette. Five colorways. Lined in Mulberry silk.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Animated product image */}
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeColor.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeColor.image}
                    alt={`The Sovereign Hoodie — ${activeColor.name}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Buy panel */}
          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] uppercase tracking-widest3 text-gold">The Flagship</p>
              <h2 className="mt-2 font-serif text-3xl font-normal text-ink md:text-4xl">{product.name}</h2>
              <p className="mt-1 text-xs uppercase tracking-widest2 text-stone">{product.tagline}</p>
              <p className="mt-4 font-serif text-2xl text-ink">${product.price}</p>

              {/* Color selector */}
              <div className="mt-8">
                <p className="mb-3 text-xs uppercase tracking-widest2 text-stone">Color — {activeColor.name}</p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setActiveColor(c)}
                      aria-label={c.name}
                      title={c.name}
                      className="group relative h-11 w-11"
                    >
                      <span
                        className={`absolute inset-0 rounded-full transition-all duration-200 ${
                          activeColor.name === c.name
                            ? "ring-2 ring-gold ring-offset-2 ring-offset-ivory scale-100"
                            : "ring-1 ring-black/10 ring-offset-2 ring-offset-ivory scale-90 group-hover:scale-100 group-hover:ring-gold/50"
                        }`}
                      />
                      <span
                        className="absolute inset-1.5 rounded-full shadow-inner transition-transform duration-200 group-hover:scale-105"
                        style={{ backgroundColor: c.swatch }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selector */}
              <div className="mt-8">
                <p className="mb-3 text-xs uppercase tracking-widest2 text-stone">Size</p>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setActiveSize(s); setSizeError(false); }}
                      className={`border py-3 text-xs uppercase transition ${
                        activeSize === s
                          ? "border-ink bg-ink text-bone"
                          : "border-black/15 text-ink hover:border-gold"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p className="mt-2 text-xs text-red-600">Please select a size.</p>
                )}
              </div>

              <motion.button
                onClick={handleAddToBag}
                whileTap={{ scale: 0.98 }}
                className="mt-8 w-full bg-ink py-4 text-sm uppercase tracking-widest2 text-bone transition hover:bg-gold"
              >
                Add to Bag — ${product.price}
              </motion.button>

              <Link
                href={`/products/${product.slug}`}
                className="mt-4 block text-center text-[11px] uppercase tracking-widest2 text-stone transition hover:text-ink"
              >
                View Full Details →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
