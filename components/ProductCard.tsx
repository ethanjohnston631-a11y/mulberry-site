"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <motion.div
        className="relative aspect-[4/5] overflow-hidden bg-white"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Image
          src={product.colors[0].image}
          alt={product.name}
          fill
          className="object-cover transition-shadow duration-500 group-hover:shadow-xl"
        />
      </motion.div>
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-sm uppercase tracking-widest2">{product.name}</h3>
        <span className="text-sm text-stone">${product.price}</span>
      </div>
    </Link>
  );
}
