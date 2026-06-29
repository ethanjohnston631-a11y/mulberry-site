import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
console.log("STRIPE KEY EXISTS:", !!process.env.STRIPE_SECRET_KEY);
console.log("SITE URL:", process.env.NEXT_PUBLIC_SITE_URL);
type IncomingItem = {
  name: string;
  price: number;
  color: string;
  size: string;
  image: string;
  quantity: number;
};

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: "Checkout is not available right now." }, { status: 503 });
  }

  let items: IncomingItem[];
  try {
    const body = await req.json();
    items = body.items;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  const stripe = new Stripe(key);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? req.nextUrl.origin;

  const line_items = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: `${item.name} — ${item.color} / ${item.size}`,
        images: [`${siteUrl}${item.image}`],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "AU"] },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout session failed.";
    console.error("[checkout]", message);
    return NextResponse.json({ error: "Could not create checkout session." }, { status: 500 });
  }
}
