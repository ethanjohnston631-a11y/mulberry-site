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
      "Heavyweight washed fleece on the outside. Mulberry silk on the inside. The Sovereign is cut oversized and boxy, finished with a hand-distressed wash and raised metallic graphics — and lined at the hood in 22-momme Mulberry silk so the one piece that touches your skin most is also the finest.",
    details: [
      "Heavyweight washed cotton fleece shell",
      "22-momme Mulberry silk hood lining",
      "Oversized, boxy silhouette with dropped shoulder",
      "Hand-distressed wash, raised metallic graphic detailing",
      "Embroidered silkworm mark on the chest",
      "Reinforced kangaroo pocket",
    ],
    benefits: [
      {
        title: "Hair Protection",
        copy: "Mulberry silk's smooth filament reduces friction against hair and skin compared to cotton — less breakage, less tugging, less static, night or day.",
      },
      {
        title: "Skin Comfort",
        copy: "Silk holds less moisture and bacteria than cotton against the skin, and its natural proteins are gentler on sensitive skin around the neck and face.",
      },
      {
        title: "Temperature Regulation",
        copy: "Silk breathes and insulates at once — warmer when you need it, cooler when you don't. The fleece shell does the heavy lifting; the lining does the rest.",
      },
      {
        title: "Made in Small Batches",
        copy: "Each wash and graphic is applied by hand in limited runs, so no two batches are perfectly identical — and once a run sells out, it doesn't come back the same way twice.",
      },
    ],
    faqs: [
      {
        q: "Why line a hoodie in silk?",
        a: "The hood is the part of a hoodie that touches your hair and neck most. Lining it in Mulberry silk — the same material used in heirloom bedding — turns the most-touched surface of the garment into the most refined one.",
      },
      {
        q: "How should I size The Sovereign?",
        a: "It's cut oversized and boxy by design. If you prefer a closer fit, size down. Full measurements are in the Care Guide.",
      },
      {
        q: "Is the silk lining washable?",
        a: "Yes. Machine wash cold, inside out, on a gentle cycle, and lay flat to dry. Full instructions are on our Care Guide page.",
      },
      {
        q: "Where is it made?",
        a: "Cut, washed, and finished in small batches to control quality at every stage, from fleece selection to the final silk stitch.",
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
