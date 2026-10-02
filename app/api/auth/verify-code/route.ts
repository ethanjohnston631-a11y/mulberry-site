import { NextRequest, NextResponse } from "next/server";
import { getKV } from "@/lib/server/kv";
import { OTP_MAX_ATTEMPTS, OTP_TTL_SECONDS, createSession, findOrCreateUser, kvKeys } from "@/lib/server/auth";
import { clientIp, isSameOrigin, jsonError, normalizeEmail, rateLimit, readJson, safeEqual, sha256 } from "@/lib/server/security";

type StoredOtp = { hash: string; salt: string; attempts: number };

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return jsonError("Forbidden.", 403);
  const kv = getKV();
  if (!kv) return jsonError("Accounts are temporarily unavailable.", 503);

  const body = await readJson(req);
  const email = normalizeEmail(body?.email);
  const code = typeof body?.code === "string" ? body.code.replace(/\D/g, "") : "";
  if (!email || code.length !== 6) return jsonError("Enter the 6-digit code from your email.", 400);

  if (!(await rateLimit("verify-ip", clientIp(req), 30, 3600))) {
    return jsonError("Too many attempts. Please wait a few minutes and try again.", 429);
  }

  const key = kvKeys.otp(email);
  const stored = await kv.get<StoredOtp>(key);
  if (!stored) return jsonError("That code has expired. Request a new one.", 400);

  if (!safeEqual(sha256(`${stored.salt}:${code}`), stored.hash)) {
    const attempts = stored.attempts + 1;
    if (attempts >= OTP_MAX_ATTEMPTS) {
      await kv.del(key);
      return jsonError("Too many incorrect attempts. Request a new code.", 400);
    }
    await kv.set(key, { ...stored, attempts }, OTP_TTL_SECONDS);
    return jsonError("That code isn't right. Check your email and try again.", 400);
  }

  // Codes are single-use.
  await kv.del(key);
  const user = await findOrCreateUser(email);
  await createSession(user.id, req.headers.get("user-agent") ?? undefined);

  return NextResponse.json(
    { user: { email: user.email, marketingOptIn: !!user.marketingOptIn } },
    { headers: { "Cache-Control": "no-store" } }
  );
}
