"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export default function ProductExperience({ product }: { product: Product }) {
  const [colorName, setColorName] = useState(product.colors[0].name);
  const [view, setView] = useState<"front" | "back">("front");
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const { addItem } = useCart();

  const activeColor = product.colors.find((c) => c.name === colorName) ?? product.colors[0];
  const activeImage = view === "front" ? activeColor.image : activeColor.backImage;

  function handleAdd() {
    if (!size) {
      setError(true);
      return;
    }
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      color: colorName,
      size,
      image: activeColor.image,
    });
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
      {/* GALLERY */}
      <div>
        <div className="relative aspect-[4/5] overflow-hidden bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${colorName}-${view}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image src={activeImage} alt={`${product.name} — ${colorName} (${view})`} fill className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            onClick={() => setView("front")}
            className={`relative aspect-[4/5] overflow-hidden border transition ${
              view === "front" ? "border-ink" : "border-black/10 hover:border-black/30"
            }`}
          >
            <Image src={activeColor.image} alt={`${colorName} front`} fill className="object-cover" />
          </button>
          <button
            onClick={() => setView("back")}
            className={`relative aspect-[4/5] overflow-hidden border transition ${
              view === "back" ? "border-ink" : "border-black/10 hover:border-black/30"
            }`}
          >
            <Image src={activeColor.backImage} alt={`${colorName} back`} fill className="object-cover" />
          </button>
        </div>
      </div>

      {/* BUY BOX */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="mb-1 text-[11px] uppercase tracking-widest3 text-gold">The Flagship</p>
        <h1 className="font-serif text-3xl font-normal text-ink md:text-4xl">{product.name}</h1>
        <p className="mt-2 text-xs uppercase tracking-widest2 text-stone">{product.tagline}</p>
        <p className="mt-3 font-serif text-xl text-ink">${product.price}</p>
        <p className="mt-6 max-w-md text-base leading-relaxed text-stone">{product.description}</p>

        <div className="mt-10">
          <div className="mb-8">
            <p className="mb-3 text-xs uppercase tracking-widest2 text-stone">Color — {colorName}</p>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setColorName(c.name);
                    setView("front");
                  }}
                  aria-label={c.name}
                  title={c.name}
                  className="group relative h-11 w-11"
                >
                  <span
                    className={`absolute inset-0 rounded-full transition-all duration-200 ${
                      colorName === c.name
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

          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-widest2 text-stone">Size</p>
              <button className="text-xs text-stone underline-offset-2 hover:underline">Size guide</button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSize(s);
                    setError(false);
                  }}
                  className={`border py-3 text-xs uppercase transition ${
                    size === s ? "border-ink bg-ink text-bone" : "border-black/15 hover:border-gold"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {error && <p className="mt-2 text-xs text-red-600">Please select a size.</p>}
          </div>

          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-ink py-4 text-sm uppercase tracking-widest2 text-bone transition hover:bg-gold"
          >
            Add to Bag — ${product.price}
          </motion.button>
        </div>

        <ul className="mt-10 space-y-2 border-t border-black/10 pt-6 text-sm text-stone">
          {product.details.map((d) => (
            <li key={d}>— {d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
