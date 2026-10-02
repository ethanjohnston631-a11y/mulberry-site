import "server-only";
import { Resend } from "resend";
import { BUSINESS } from "@/lib/site-config";
import { escapeHtml } from "@/lib/server/security";

const FROM = `${BUSINESS.name} <${BUSINESS.email}>`;

let client: Resend | null | undefined;

export function getResend(): Resend | null {
  if (client === undefined) {
    client = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  }
  return client;
}

type Mail = { to: string; subject: string; text: string; html?: string; replyTo?: string };

export async function sendMail(mail: Mail): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[email:dev] to=${mail.to} subject="${mail.subject}"\n${mail.text}`);
      return true;
    }
    console.error("[email] RESEND_API_KEY is not set");
    return false;
  }
  const { error } = await resend.emails.send({ from: FROM, ...mail });
  if (error) {
    console.error("[email] send failed:", error.message);
    return false;
  }
  return true;
}

// Shared shell so every transactional email looks like the brand, not a raw notification.
export function brandHtml(title: string, bodyHtml: string) {
  const address = BUSINESS.mailingAddress ? `<br>${escapeHtml(BUSINESS.mailingAddress)}` : "";
  return `<!doctype html><html><body style="margin:0;background:#faf7f1;font-family:Helvetica,Arial,sans-serif;color:#0b0b0c">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f1;padding:40px 16px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid #ece6da">
<tr><td style="padding:28px 32px;border-bottom:1px solid #ece6da;font-family:Georgia,serif;letter-spacing:6px;font-size:16px;text-transform:uppercase">Mulberry</td></tr>
<tr><td style="padding:32px">
<h1 style="margin:0 0 16px;font-family:Georgia,serif;font-weight:normal;font-size:24px">${escapeHtml(title)}</h1>
${bodyHtml}
</td></tr>
<tr><td style="padding:20px 32px;border-top:1px solid #ece6da;font-size:11px;color:#655f53;line-height:1.6">
${escapeHtml(BUSINESS.name)} · <a href="${BUSINESS.site}" style="color:#876435">${BUSINESS.site.replace("https://", "")}</a> · ${escapeHtml(BUSINESS.email)}${address}
</td></tr>
</table></td></tr></table></body></html>`;
}
