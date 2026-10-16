import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";

const post = (body: unknown, origin = "http://localhost") =>
  POST(
    new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", origin, host: "localhost" },
      body: JSON.stringify(body),
    })
  );

describe("contact form API", () => {
  it("rejects cross-origin posts", async () => {
    expect((await post({ name: "a", email: "a@b.co", message: "hi" }, "https://evil.com")).status).toBe(403);
  });

  it("tells the visitor when the email is invalid", async () => {
    const res = await post({ name: "Ethan", email: "not-an-email", message: "Hello" });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/valid email/i);
  });

  it("requires name and message", async () => {
    const res = await post({ name: "", email: "a@b.co", message: "" });
    expect((await res.json()).error).toMatch(/every field/i);
  });

  it("silently accepts honeypot submissions without sending", async () => {
    const res = await post({ name: "bot", email: "bot@spam.co", message: "x", website: "http://spam" });
    expect(res.status).toBe(200);
  });
});
