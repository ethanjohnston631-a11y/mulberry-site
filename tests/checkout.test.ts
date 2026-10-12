import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/checkout/route";

// Default store mode is "waitlist": checkout must refuse to take payment.
describe("checkout in waitlist mode", () => {
  it("refuses to create a payment session", async () => {
    const res = await POST(
      new NextRequest("http://localhost/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json", origin: "http://localhost", host: "localhost" },
        body: JSON.stringify({ acceptedTerms: true, items: [{ slug: "essential-hoodie-black", color: "Black", size: "M", quantity: 1 }] }),
      })
    );
    expect(res.status).toBe(403);
  });

  it("rejects cross-origin requests first", async () => {
    const res = await POST(
      new NextRequest("http://localhost/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json", origin: "https://evil.com", host: "localhost" },
        body: "{}",
      })
    );
    expect(res.status).toBe(403);
    expect((await res.json()).error).toBe("Forbidden.");
  });
});
