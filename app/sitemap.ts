import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";

const BASE_URL = "https://www.mulberryempire.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/our-story",
    "/why-silk",
    "/history",
    "/care-guide",
    "/journal",
    "/faq",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/shipping",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...productRoutes];
}
