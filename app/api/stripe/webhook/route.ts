import { NextRequest, NextResponse } from "next/server";
import { getStripe, sendOrderConfirmation } from "@/lib/server/stripe";

// Stripe → Developers → Webhooks → endpoint https://www.mulberryempire.com/api/stripe/webhook,
// event "checkout.session.completed". Put the signing secret in STRIPE_WEBHOOK_SECRET.
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers.get("stripe-signature");
  if (!stripe || !secret || !signature) return NextResponse.json({ error: "Not configured." }, { status: 400 });

  let event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    try {
      await sendOrderConfirmation(stripe, event.data.object.id);
    } catch (err) {
      console.error("[webhook]", err instanceof Error ? err.message : err);
      return NextResponse.json({ error: "Handler failed." }, { status: 500 });
    }
  }
  return NextResponse.json({ received: true });
}
