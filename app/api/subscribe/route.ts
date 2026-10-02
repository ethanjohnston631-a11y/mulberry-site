import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { setMarketingConsent } from "@/lib/server/subscribers";
import { clientIp, isSameOrigin, jsonError, normalizeEmail, rateLimit, readJson } from "@/lib/server/security";

// Newsletter and waitlist sign-up. Requires an explicit consent tick; nothing is pre-checked.
export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return jsonError("Forbidden.", 403);
  if (!(await rateLimit("subscribe", clientIp(req), 10, 3600))) {
    return jsonError("Too many requests. Please try again later.", 429);
  }

  const body = await readJson(req);
  if (typeof body?.website === "string" && body.website) return NextResponse.json({ ok: true }); // honeypot

  const email = normalizeEmail(body?.email);
  if (!email) return jsonError("Please enter a valid email address.", 400);
  if (body?.consent !== true) return jsonError("Please confirm you'd like to receive emails from us.", 400);

  const source = body?.source === "waitlist" ? "waitlist" : "newsletter";
  let interest: { color?: string; size?: string } | undefined;
  if (source === "waitlist") {
    const product = getProduct(String(body?.slug ?? ""));
    const color = product?.colors.find((c) => c.name === body?.color)?.name;
    const size = product?.sizes.find((s) => s === body?.size);
    interest = { color, size };
  }

  const ok = await setMarketingConsent(email, true, source, interest);
  if (!ok) return jsonError("We couldn't add you right now. Please try again shortly.", 502);
  return NextResponse.json({ ok: true });
}
