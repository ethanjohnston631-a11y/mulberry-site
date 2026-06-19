import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");

type IncomingItem = {
  name: string;
  price: number;
  color: string;
  size: string;
  image: string;
  quantity: number;
};

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
  }

  const { items } = (await req.json()) as { items: IncomingItem[] };

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

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

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/cancel`,
    shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "AU"] },
  });

  return NextResponse.json({ url: session.url });
}
