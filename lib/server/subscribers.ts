import "server-only";
import { getKV } from "@/lib/server/kv";
import { getResend } from "@/lib/server/email";
import { sha256 } from "@/lib/server/security";

// Email list (newsletter + waitlist) lives in Resend Contacts, so you can send campaigns from the
// Resend dashboard with one-click unsubscribe built in. A consent record (what, when, where) is
// kept alongside as proof of opt-in.

export type ConsentSource = "newsletter" | "waitlist" | "account" | "account-deleted";

type ConsentRecord = {
  optIn: boolean;
  source: ConsentSource;
  at: string;
  interest?: { color?: string; size?: string };
};

export async function setMarketingConsent(
  email: string,
  optIn: boolean,
  source: ConsentSource,
  interest?: ConsentRecord["interest"]
): Promise<boolean> {
  const resend = getResend();
  const segment =
    source === "waitlist" ? process.env.RESEND_WAITLIST_SEGMENT_ID : process.env.RESEND_NEWSLETTER_SEGMENT_ID;

  if (resend) {
    const created = await resend.contacts.create({ email, unsubscribed: !optIn });
    if (created.error) {
      // Already a contact: update their subscription status instead.
      const updated = await resend.contacts.update({ email, unsubscribed: !optIn });
      if (updated.error) {
        console.error("[subscribers] Resend error:", updated.error.message);
        return false;
      }
    }
    if (optIn && segment) await resend.contacts.segments.add({ email, segmentId: segment }).catch(() => null);
  } else if (process.env.NODE_ENV === "production") {
    console.error("[subscribers] RESEND_API_KEY is not set");
    return false;
  }

  const kv = getKV();
  if (kv) {
    const record: ConsentRecord = { optIn, source, at: new Date().toISOString(), interest };
    await kv.set(`consent:${sha256(email)}`, record);
  }
  return true;
}
