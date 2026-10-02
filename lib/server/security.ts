import "server-only";
import { createHash, randomBytes, randomInt, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getKV } from "@/lib/server/kv";

export function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function randomToken(bytes = 32) {
  return randomBytes(bytes).toString("base64url");
}

export function randomCode() {
  return randomInt(0, 1_000_000).toString().padStart(6, "0");
}

export function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;

export function normalizeEmail(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const email = input.trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) return null;
  return email;
}

export function clientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

// CSRF defence for cookie-authenticated, state-changing requests: the browser always sends
// Origin on cross-site POSTs, so anything not from our own host is rejected.
export function isSameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return req.headers.get("sec-fetch-site") === "same-origin";
  try {
    return new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

// Fixed-window rate limiter. Returns true when the request is allowed.
export async function rateLimit(bucket: string, id: string, limit: number, windowSeconds: number) {
  const kv = getKV();
  if (!kv) return true;
  const count = await kv.incr(`rl:${bucket}:${sha256(id)}`, windowSeconds);
  return count <= limit;
}

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function readJson(req: NextRequest, maxBytes = 16_384): Promise<Record<string, unknown> | null> {
  const length = Number(req.headers.get("content-length") || 0);
  if (length > maxBytes) return null;
  try {
    const text = await req.text();
    if (text.length > maxBytes) return null;
    const body = JSON.parse(text);
    return body && typeof body === "object" && !Array.isArray(body) ? body : null;
  } catch {
    return null;
  }
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
