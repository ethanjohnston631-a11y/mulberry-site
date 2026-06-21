export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  description: string;
  details: string[];
  benefits: { title: string; copy: string }[];
  faqs: { q: string; a: string }[];
  colors: { name: string; image: string }[];
  sizes: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "essential-hoodie-black",
    name: "The Sovereign Hoodie",
    tagline: "The flagship. Silk-lined. Built for the long run.",
    price: 248,
    description:
      "Heavyweight French terry on the outside. Mulberry silk on the inside. The Sovereign is the only hoodie cut to feel like an heirloom — boxy through the body, dropped at the shoulder, and lined at the hood and collar in 22-momme Mulberry silk so the one piece that touches your skin most is also the finest.",
    details: [
      "490gsm heavyweight brushed French terry shell",
      "22-momme Mulberry silk hood and collar lining",
      "Dropped shoulder, boxy silhouette",
      "Double-needle ribbed cuffs and hem",
      "Garment-dyed in small batches for depth of color",
      "Reinforced kangaroo pocket with hidden interior pocket",
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
        title: "Built to Outlast Trends",
        copy: "No seasonal colorways, no logos chasing a moment. One silhouette, refined every year, made to be worn for a decade.",
      },
    ],
    faqs: [
      {
        q: "Why line a hoodie in silk?",
        a: "The hood and collar are the parts of a hoodie that touch your hair, neck, and face most. Lining them in Mulberry silk — the same material used in heirloom bedding — turns the most-touched surface of the garment into the most refined one.",
      },
      {
        q: "How should I size The Sovereign?",
        a: "It's cut boxy and slightly oversized by design. If you prefer a closer fit, size down. Full measurements are in the Care Guide.",
      },
      {
        q: "Is the silk lining washable?",
        a: "Yes. Machine wash cold, inside out, on a gentle cycle, and lay flat to dry. Full instructions are on our Care Guide page.",
      },
      {
        q: "Where is it made?",
        a: "Cut and sewn in small batches to control quality at every stage, from fleece selection to the final silk stitch.",
      },
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
