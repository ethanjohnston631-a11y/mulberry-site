import "server-only";
import Stripe from "stripe";
import { BUSINESS, PREORDER_SHIP_ESTIMATE } from "@/lib/site-config";
import { saveUser, type User } from "@/lib/server/auth";
import { brandHtml, sendMail } from "@/lib/server/email";
import { escapeHtml } from "@/lib/server/security";

let client: Stripe | null | undefined;

export function getStripe(): Stripe | null {
  if (client === undefined) {
    client = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
  }
  return client;
}

// Links a verified account to a Stripe Customer so its orders show up in order history.
// Guest orders placed earlier with the same (now verified) email are picked up too.
export async function ensureStripeCustomer(stripe: Stripe, user: User) {
  if (user.stripeCustomerId) return user.stripeCustomerId;
  const existing = await stripe.customers.list({ email: user.email, limit: 1 });
  const customer = existing.data[0] ?? (await stripe.customers.create({ email: user.email }));
  await saveUser({ ...user, stripeCustomerId: customer.id });
  return customer.id;
}

export type OrderSummary = {
  id: string;
  number: string;
  created: number;
  total: number;
  currency: string;
  status: string;
  preorder: boolean;
  items: { description: string; quantity: number }[];
};

export async function listOrdersForEmail(stripe: Stripe, email: string): Promise<OrderSummary[]> {
  const customers = await stripe.customers.list({ email, limit: 10 });
  const orders: OrderSummary[] = [];

  for (const customer of customers.data) {
    const sessions = await stripe.checkout.sessions.list({
      customer: customer.id,
      limit: 25,
      expand: ["data.line_items"],
    });
    for (const s of sessions.data) {
      if (s.status !== "complete") continue;
      orders.push({
        id: s.id,
        number: orderNumber(s.id),
        created: s.created,
        total: (s.amount_total ?? 0) / 100,
        currency: (s.currency ?? "usd").toUpperCase(),
        status: s.payment_status === "paid" ? "Paid" : "Processing",
        preorder: s.metadata?.preorder === "true",
        items: (s.line_items?.data ?? []).map((li) => ({ description: li.description ?? "Item", quantity: li.quantity ?? 1 })),
      });
    }
  }
  return orders.sort((a, b) => b.created - a.created);
}

export function orderNumber(sessionId: string) {
  return `MB-${sessionId.slice(-8).toUpperCase()}`;
}

// Sends our branded confirmation once per order. Called from both the Stripe webhook and the
// success page; the PaymentIntent metadata flag makes it idempotent across the two.
export async function sendOrderConfirmation(stripe: Stripe, sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["line_items", "payment_intent"] });
  if (session.payment_status !== "paid") return;
  const pi = session.payment_intent as Stripe.PaymentIntent | null;
  if (!pi || pi.metadata?.confirmation_sent === "true") return;
  const email = session.customer_details?.email;
  if (!email) return;

  await stripe.paymentIntents.update(pi.id, { metadata: { confirmation_sent: "true" } });

  const preorder = session.metadata?.preorder === "true";
  const shipNote = session.metadata?.ship_estimate || PREORDER_SHIP_ESTIMATE;
  const number = orderNumber(session.id);
  const total = `$${((session.amount_total ?? 0) / 100).toFixed(2)}`;
  const lines = (session.line_items?.data ?? []).map((li) => `${li.quantity} × ${li.description}`);

  const timing = preorder
    ? `This is a pre-order. Estimated ship window: ${shipNote}. If that changes we'll email you with the new date, and you can cancel for a full refund at any time before your order ships.`
    : "We'll email tracking details as soon as your order ships.";

  const sent = await sendMail({
    to: email,
    subject: `Order ${number} confirmed`,
    text: `Thank you for your order.\n\nOrder ${number}\n${lines.join("\n")}\nTotal: ${total}\n\n${timing}\n\nQuestions? Reply to this email or write to ${BUSINESS.email}.`,
    html: brandHtml(
      "Thank you for your order.",
      `<p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#876435;margin:0 0 16px">Order ${number}</p>
<table role="presentation" width="100%" style="font-size:14px;line-height:1.8;border-top:1px solid #ece6da;border-bottom:1px solid #ece6da;margin:0 0 16px">
${lines.map((l) => `<tr><td style="padding:6px 0">${escapeHtml(l)}</td></tr>`).join("")}
<tr><td style="padding:6px 0;font-weight:bold">Total ${total}</td></tr></table>
<p style="font-size:14px;line-height:1.6;color:#655f53;margin:0 0 16px">${escapeHtml(timing)}</p>
<p style="font-size:14px;line-height:1.6;color:#655f53;margin:0">Questions? Just reply to this email.</p>`
    ),
    replyTo: BUSINESS.email,
  });

  if (!sent) await stripe.paymentIntents.update(pi.id, { metadata: { confirmation_sent: "" } });
}

