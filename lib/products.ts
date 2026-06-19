export type Product = {
  slug: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  colors: { name: string; image: string }[];
  sizes: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "essential-hoodie-black",
    name: "Essential Hoodie",
    price: 128,
    description:
      "A heavyweight hoodie cut from brushed cotton fleece. Boxy silhouette, dropped shoulder, built to last.",
    details: [
      "490gsm brushed cotton fleece",
      "Dropped shoulder, boxy fit",
      "Ribbed cuffs and hem",
      "Garment-dyed for depth of color",
    ],
    colors: [
      { name: "Black", image: "/products/hoodie-black.png" },
      { name: "Graphite", image: "/products/hoodie-graphite.png" },
      { name: "Clay", image: "/products/hoodie-clay.png" },
      { name: "Cream", image: "/products/hoodie-cream.png" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
