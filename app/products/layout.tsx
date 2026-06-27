import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Shop",
  description: "The Sovereign Hoodie — one silhouette, five colorways, lined in 22-momme Mulberry silk.",
};

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return children;
}
