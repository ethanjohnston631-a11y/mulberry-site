import { NextRequest, NextResponse } from "next/server";
import { BUSINESS } from "@/lib/site-config";
import { sendMail } from "@/lib/server/email";
import { clientIp, isSameOrigin, jsonError, normalizeEmail, rateLimit, readJson } from "@/lib/server/security";

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return jsonError("Forbidden.", 403);
  if (!(await rateLimit("contact", clientIp(req), 5, 3600))) {
    return jsonError("Too many messages. Please email us directly.", 429);
  }

  const body = await readJson(req);
  if (typeof body?.website === "string" && body.website) return NextResponse.json({ success: true }); // honeypot

  const name = typeof body?.name === "string" ? body.name.trim().slice(0, 120) : "";
  const email = normalizeEmail(body?.email);
  const message = typeof body?.message === "string" ? body.message.trim().slice(0, 5000) : "";
  if (!name || !message) return jsonError("Please fill in every field.", 400);
  if (!email) return jsonError("Please enter a valid email address.", 400);

  const ok = await sendMail({
    to: BUSINESS.email,
    subject: `New contact form message from ${name.replace(/[\r\n]+/g, " ")}`,
    replyTo: email,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });
  if (!ok) return jsonError("Email failed.", 502);
  return NextResponse.json({ success: true });
}
