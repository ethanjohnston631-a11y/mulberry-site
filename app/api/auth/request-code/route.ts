import { NextRequest, NextResponse } from "next/server";
import { getKV } from "@/lib/server/kv";
import { OTP_TTL_SECONDS, kvKeys } from "@/lib/server/auth";
import { brandHtml, sendMail } from "@/lib/server/email";
import {
  clientIp,
  isSameOrigin,
  jsonError,
  normalizeEmail,
  randomCode,
  randomToken,
  rateLimit,
  readJson,
  sha256,
} from "@/lib/server/security";

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return jsonError("Forbidden.", 403);
  const kv = getKV();
  if (!kv) return jsonError("Accounts are temporarily unavailable. Your bag is still saved on this device.", 503);

  const body = await readJson(req);
  const email = normalizeEmail(body?.email);
  if (!email) return jsonError("Please enter a valid email address.", 400);

  const ip = clientIp(req);
  const allowed =
    (await rateLimit("otp-ip", ip, 20, 3600)) && (await rateLimit("otp-email", email, 5, 3600));
  if (!allowed) return jsonError("Too many attempts. Please wait a few minutes and try again.", 429);

  const code = randomCode();
  const salt = randomToken(16);
  await kv.set(kvKeys.otp(email), { hash: sha256(`${salt}:${code}`), salt, attempts: 0 }, OTP_TTL_SECONDS);

  const sent = await sendMail({
    to: email,
    subject: `${code} is your Mulberry sign-in code`,
    text: `Your Mulberry sign-in code is ${code}\n\nIt expires in 10 minutes. If you didn't request this, you can ignore this email — no one can sign in without the code.`,
    html: brandHtml(
      "Your sign-in code",
      `<p style="font-size:14px;line-height:1.6;color:#655f53;margin:0 0 24px">Enter this code to sign in to your Mulberry account. It expires in 10 minutes.</p>
<p style="font-family:Georgia,serif;font-size:36px;letter-spacing:10px;margin:0 0 24px">${code}</p>
<p style="font-size:12px;line-height:1.6;color:#655f53;margin:0">If you didn't request this, you can safely ignore this email. No one can access your account without this code.</p>`
    ),
  });
  if (!sent) return jsonError("We couldn't send the code right now. Please try again shortly.", 502);

  // Same response whether or not an account exists, so the endpoint can't be used to probe emails.
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
