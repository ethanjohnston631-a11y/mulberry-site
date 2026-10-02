import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { sanitizeCart, cartCount } from "@/lib/cart-items";
import { CHECKOUT_OPEN, PREORDER_SHIP_ESTIMATE, POLICY, SHIPPING_COUNTRIES, SITE_URL, STORE_MODE } from "@/lib/site-config";
import { getCurrentUser } from "@/lib/server/auth";
import { ensureStripeCustomer, getStripe } from "@/lib/server/stripe";
import { clientIp, isSameOrigin, jsonError, rateLimit, readJson } from "@/lib/server/security";

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return jsonError("Forbidden.", 403);
  if (!CHECKOUT_OPEN) return jsonError("Orders aren't open yet. Join the waitlist to be first to know.", 403);

  const stripe = getStripe();
  if (!stripe) return jsonError("Checkout is not available right now.", 503);

  if (!(await rateLimit("checkout", clientIp(req), 30, 3600))) {
    return jsonError("Too many checkout attempts. Please wait a few minutes.", 429);
  }

  const body = await readJson(req);
  if (body?.acceptedTerms !== true) {
    return jsonError("Please agree to the Terms and Returns Policy to continue.", 400);
  }

  // Never trust names or prices from the browser: rebuild every line from the catalog.
  const items = sanitizeCart(body?.items);
  if (items.length === 0) return jsonError("Your bag is empty.", 400);
  if (cartCount(items) > POLICY.maxItemsPerOrder) {
    return jsonError(`Orders are limited to ${POLICY.maxItemsPerOrder} pieces. Contact us for larger orders.`, 400);
  }

  const preorder = STORE_MODE === "preorder";
  const user = await getCurrentUser().catch(() => null);

  const params: Stripe.Checkout.SessionCreateParams = {
    mode: "payment",
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.name} — ${item.color} / ${item.size}${preorder ? " (Pre-order)" : ""}`,
          images: [`${SITE_URL}${item.image}`],
          metadata: { slug: item.slug, color: item.color, size: item.size },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/cancel`,
    shipping_address_collection: {
      allowed_countries: SHIPPING_COUNTRIES as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
    },
    phone_number_collection: { enabled: false },
    metadata: {
      preorder: String(preorder),
      ship_estimate: preorder ? PREORDER_SHIP_ESTIMATE : "",
      terms_version: POLICY.termsVersion,
      terms_accepted_at: new Date().toISOString(),
    },
    custom_text: {
      submit: {
        message: preorder
          ? `Pre-order: estimated to ship ${PREORDER_SHIP_ESTIMATE}. You can cancel for a full refund any time before it ships.`
          : `By paying you agree to our Terms and ${POLICY.returnWindowDays}-day Returns Policy.`,
      },
    },
  };

  // Shipping rates are created in the Stripe Dashboard (Product catalog → Shipping rates).
  const shippingRates = (process.env.STRIPE_SHIPPING_RATE_IDS || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (shippingRates.length) params.shipping_options = shippingRates.map((shipping_rate) => ({ shipping_rate }));

  // Stripe Tax calculates and collects sales tax once it's activated in the Dashboard.
  if (process.env.STRIPE_AUTOMATIC_TAX === "true") params.automatic_tax = { enabled: true };

  if (user) {
    params.customer = await ensureStripeCustomer(stripe, user);
    params.customer_update = { shipping: "auto", address: "auto", name: "auto" };
    params.client_reference_id = user.id;
  } else {
    // Creates a Customer for guests too, so orders appear if they later sign in with that email.
    params.customer_creation = "always";
  }

  try {
    const session = await stripe.checkout.sessions.create(params);
    return NextResponse.json({ url: session.url }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[checkout]", err instanceof Error ? err.message : err);
    return jsonError("Could not start checkout. Please try again.", 500);
  }
}
