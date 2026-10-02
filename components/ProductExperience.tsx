"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Product } from "@/lib/products";
import PurchasePanel from "@/components/PurchasePanel";
import { STORE_MODE } from "@/lib/site-config";

export default function ProductExperience({ product }: { product: Product }) {
  const [colorName, setColorName] = useState(product.colors[0].name);
  const [view, setView] = useState<"front" | "back">("front");

  const activeColor = product.colors.find((c) => c.name === colorName) ?? product.colors[0];
  const activeImage = view === "front" ? activeColor.image : activeColor.backImage;

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
              <Image src={activeImage} alt={`${product.name} — ${colorName} (${view})`} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button
            onClick={() => setView("front")}
            aria-label="Show front view"
            aria-pressed={view === "front"}
            className={`relative aspect-[4/5] overflow-hidden border transition ${
              view === "front" ? "border-ink" : "border-black/10 hover:border-black/30"
            }`}
          >
            <Image src={activeColor.image} alt="" fill sizes="25vw" className="object-cover" />
          </button>
          <button
            onClick={() => setView("back")}
            aria-label="Show back view"
            aria-pressed={view === "back"}
            className={`relative aspect-[4/5] overflow-hidden border transition ${
              view === "back" ? "border-ink" : "border-black/10 hover:border-black/30"
            }`}
          >
            <Image src={activeColor.backImage} alt="" fill sizes="25vw" className="object-cover" />
          </button>
        </div>
        {STORE_MODE !== "live" && (
          <p className="mt-3 text-xs text-stone">Images show the design. Final production pieces may vary slightly.</p>
        )}
      </div>

      {/* BUY BOX */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="mb-1 text-[11px] uppercase tracking-widest3 text-gold">
          {STORE_MODE === "live" ? "The Flagship" : STORE_MODE === "preorder" ? "The Flagship · Pre-order" : "The Flagship · First Run"}
        </p>
        <h1 className="font-serif text-3xl font-normal text-ink md:text-4xl">{product.name}</h1>
        <p className="mt-2 text-xs uppercase tracking-widest2 text-stone">{product.tagline}</p>
        <p className="mt-3 font-serif text-xl text-ink">${product.price}</p>
        <p className="mt-6 max-w-md text-base leading-relaxed text-stone">{product.description}</p>

        <div className="mt-10">
          <PurchasePanel
            product={product}
            colorName={colorName}
            onColorChange={(name) => {
              setColorName(name);
              setView("front");
            }}
          />
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
