import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { isSameOrigin, normalizeEmail, randomCode, safeEqual } from "@/lib/server/security";

const req = (headers: Record<string, string>) =>
  new NextRequest("https://www.mulberryempire.com/api/x", { method: "POST", headers });

describe("normalizeEmail", () => {
  it("lowercases and trims valid emails", () => {
    expect(normalizeEmail("  Ethan@Example.COM ")).toBe("ethan@example.com");
  });
  it("rejects invalid input", () => {
    for (const bad of ["", "no-at", "a@b", "a b@c.com", "<x>@y.com", 42, null, "a@" + "b".repeat(260) + ".com"]) {
      expect(normalizeEmail(bad)).toBeNull();
    }
  });
});

describe("isSameOrigin", () => {
  it("accepts same-host origins", () => {
    expect(isSameOrigin(req({ origin: "https://www.mulberryempire.com", host: "www.mulberryempire.com" }))).toBe(true);
  });
  it("rejects cross-site origins", () => {
    expect(isSameOrigin(req({ origin: "https://evil.com", host: "www.mulberryempire.com" }))).toBe(false);
  });
  it("rejects requests without origin unless the browser marks them same-origin", () => {
    expect(isSameOrigin(req({ host: "www.mulberryempire.com" }))).toBe(false);
    expect(isSameOrigin(req({ host: "www.mulberryempire.com", "sec-fetch-site": "same-origin" }))).toBe(true);
  });
});

describe("codes and comparison", () => {
  it("generates 6-digit codes", () => {
    for (let i = 0; i < 50; i++) expect(randomCode()).toMatch(/^\d{6}$/);
  });
  it("compares in constant time and handles length mismatch", () => {
    expect(safeEqual("abc", "abc")).toBe(true);
    expect(safeEqual("abc", "abd")).toBe(false);
    expect(safeEqual("abc", "abcd")).toBe(false);
  });
});
