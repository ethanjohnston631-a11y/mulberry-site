import { describe, expect, it } from "vitest";
import { sanitizeCart, cartCount } from "@/lib/cart-items";
import { PRODUCTS } from "@/lib/products";
import { POLICY } from "@/lib/site-config";

const product = PRODUCTS[0];
const line = (over: Record<string, unknown> = {}) => ({ slug: product.slug, color: "Black", size: "M", quantity: 1, ...over });

describe("sanitizeCart", () => {
  it("ignores client-supplied price, name and image", () => {
    const [item] = sanitizeCart([line({ price: 0.01, name: "hacked", image: "https://evil.example/x.png" })]);
    expect(item.price).toBe(product.price);
    expect(item.name).toBe(product.name);
    expect(item.image).toBe(product.colors.find((c) => c.name === "Black")!.image);
  });

  it("drops unknown products, colors and sizes", () => {
    expect(
      sanitizeCart([line({ slug: "nope" }), line({ color: "Purple" }), line({ size: "XXXL" })])
    ).toEqual([]);
  });

  it("drops non-positive and non-numeric quantities", () => {
    expect(sanitizeCart([line({ quantity: 0 }), line({ quantity: -3 }), line({ quantity: "lots" })])).toEqual([]);
  });

  it("merges duplicate lines and clamps quantity", () => {
    const items = sanitizeCart([line({ quantity: 6 }), line({ quantity: 9 })]);
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(POLICY.maxQtyPerLine);
  });

  it("rejects garbage input", () => {
    expect(sanitizeCart(null)).toEqual([]);
    expect(sanitizeCart("x")).toEqual([]);
    expect(sanitizeCart([null, 1, "a", {}])).toEqual([]);
  });

  it("counts items", () => {
    expect(cartCount(sanitizeCart([line({ quantity: 2 }), line({ size: "L", quantity: 3 })]))).toBe(5);
  });
});
