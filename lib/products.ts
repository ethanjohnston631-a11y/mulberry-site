export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  description: string;
  details: string[];
  benefits: { title: string; copy: string }[];
  faqs: { q: string; a: string }[];
  colors: { name: string; swatch: string; image: string; backImage: string }[];
  sizes: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "essential-hoodie-black",
    name: "The Sovereign Hoodie",
    tagline: "The flagship. Silk-lined. Built for the long run.",
    price: 248,
    description:
      "Heavyweight washed cotton on the outside. Mulberry silk on the inside. The Sovereign is cut oversized and boxy, finished with a garment wash and raised graphic detailing, and lined at the hood in 22-momme Mulberry silk so the part that touches your hair and neck most is also the finest.",
    details: [
      "Heavyweight washed 100% cotton shell",
      "22-momme Mulberry silk hood lining",
      "Oversized, boxy silhouette with dropped shoulder",
      "Garment-washed finish with raised graphic detailing",
      "Embroidered silkworm mark on the chest",
      "Reinforced kangaroo pocket",
    ],
    benefits: [
      {
        title: "Less Friction",
        copy: "Mulberry silk's long, smooth filament has a far slicker surface than cotton, so the hood glides over hair and skin instead of catching and tugging.",
      },
      {
        title: "Softness Where It Counts",
        copy: "The hood is the part of a hoodie that sits against your neck and face. Lining it in silk means the surface you feel most is also the softest.",
      },
      {
        title: "Breathable Natural Fiber",
        copy: "Silk is a breathable natural protein fiber with light insulating qualities. The heavyweight cotton shell does the heavy lifting; the lining adds comfort.",
      },
      {
        title: "Made in Small Batches",
        copy: "Produced in limited runs rather than continuous mass production. Garment washing gives each batch subtle variation, and when a run sells out, it doesn't come back the same way twice.",
      },
    ],
    faqs: [
      {
        q: "Why line a hoodie in silk?",
        a: "The hood is the part of a hoodie that touches your hair and neck most. Lining it in Mulberry silk — the same material used in heirloom bedding — turns the most-touched surface of the garment into the most refined one.",
      },
      {
        q: "How should I size The Sovereign?",
        a: "It's cut oversized and boxy by design. If you prefer a closer fit, size down. A full measurement chart will be published with the first production run.",
      },
      {
        q: "Is the silk lining washable?",
        a: "Yes. Machine wash cold, inside out, on a gentle cycle, and lay flat to dry. Full instructions are on our Care Guide page.",
      },
      {
        q: "Where is it made?",
        a: "We're finalizing our production partner for the first run. The country of origin will be listed on this page and on the garment's label before any order ships.",
      },
    ],
    colors: [
      { name: "Black", swatch: "#19191b", image: "/products/black.png", backImage: "/products/black-back.png" },
      { name: "Brown", swatch: "#9c7e63", image: "/products/brown.png", backImage: "/products/brown-back.png" },
      { name: "Green", swatch: "#5c6b5e", image: "/products/green.png", backImage: "/products/green-back.png" },
      { name: "Grey", swatch: "#83837c", image: "/products/grey.png", backImage: "/products/grey-back.png" },
      { name: "Navy Blue", swatch: "#454f63", image: "/products/navy-blue.png", backImage: "/products/navy-blue-back.png" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
