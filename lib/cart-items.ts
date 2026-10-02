import { getProduct } from "@/lib/products";
import { POLICY } from "@/lib/site-config";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  color: string;
  size: string;
  image: string;
  quantity: number;
};

export function lineKey(slug: string, color: string, size: string) {
  return `${slug}__${color}__${size}`;
}

// Rebuilds cart lines from the catalog so name, price and image always come from our data, never
// from the browser or a stored copy. Unknown products, colors or sizes are dropped; duplicate
// lines are merged; quantities are clamped.
export function sanitizeCart(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const merged = new Map<string, CartItem>();

  for (const entry of raw.slice(0, 50)) {
    if (!entry || typeof entry !== "object") continue;
    const { slug, color, size, quantity } = entry as Record<string, unknown>;
    if (typeof slug !== "string" || typeof color !== "string" || typeof size !== "string") continue;

    const product = getProduct(slug);
    const variant = product?.colors.find((c) => c.name === color);
    if (!product || !variant || !product.sizes.includes(size)) continue;

    const qty = Math.floor(Number(quantity));
    if (!Number.isFinite(qty) || qty < 1) continue;

    const key = lineKey(slug, color, size);
    const prevQty = merged.get(key)?.quantity ?? 0;
    merged.set(key, {
      slug,
      name: product.name,
      price: product.price,
      color,
      size,
      image: variant.image,
      quantity: Math.min(prevQty + qty, POLICY.maxQtyPerLine),
    });
  }

  return Array.from(merged.values());
}

export function cartCount(items: CartItem[]) {
  return items.reduce((n, i) => n + i.quantity, 0);
}
