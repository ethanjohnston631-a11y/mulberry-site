"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";

export default function AddToCart({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const { addItem } = useCart();

  const activeImage = product.colors.find((c) => c.name === color)?.image ?? product.colors[0].image;

  function handleAdd() {
    if (!size) {
      setError(true);
      return;
    }
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      color,
      size,
      image: activeImage,
    });
  }

  return (
    <div>
      <div className="mb-8">
        <p className="mb-3 text-xs uppercase tracking-widest2 text-stone">Color — {color}</p>
        <div className="flex gap-3">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c.name)}
              className={`h-9 w-9 overflow-hidden border transition ${
                color === c.name ? "border-ink" : "border-black/15 hover:border-black/40"
              }`}
              aria-label={c.name}
            >
              <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
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
  );
}
