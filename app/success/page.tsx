import Link from "next/link";
import { getStripe, orderNumber, sendOrderConfirmation } from "@/lib/server/stripe";
import ClearCart from "./ClearCart";

export const dynamic = "force-dynamic";

const button =
  "mt-8 bg-ink px-8 py-4 text-[11px] uppercase tracking-widest2 text-bone transition hover:bg-gold";

// Confirms the order with Stripe before telling the customer it went through, and only then
// empties their bag.
export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const stripe = getStripe();

  let paid = false;
  let email: string | null = null;
  let preorder = false;
  let shipEstimate = "";
  let number = "";

  if (stripe && session_id && /^cs_[A-Za-z0-9_]+$/.test(session_id)) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      paid = session.payment_status === "paid";
      email = session.customer_details?.email ?? null;
      preorder = session.metadata?.preorder === "true";
      shipEstimate = session.metadata?.ship_estimate ?? "";
      number = orderNumber(session.id);
      if (paid) await sendOrderConfirmation(stripe, session.id).catch(() => null);
    } catch {}
  }

  if (!paid) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center bg-ivory px-6 text-center">
        <p className="text-[11px] uppercase tracking-widest2 text-gold">Order Status</p>
        <h1 className="mt-4 font-serif text-4xl font-normal text-ink">We couldn&apos;t confirm this order.</h1>
        <p className="mt-4 leading-relaxed text-stone">
          If you completed payment, you&apos;ll receive a confirmation email shortly. Otherwise your bag is still saved. If
          you have any doubt, write to{" "}
          <a href="mailto:info@mulberryempire.com" className="text-gold underline">info@mulberryempire.com</a> and we&apos;ll check for you.
        </p>
        <Link href="/products" className={button}>Back to Shop</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center bg-ivory px-6 text-center">
      <ClearCart />
      <p className="text-[11px] uppercase tracking-widest2 text-gold">Order {number} Confirmed</p>
      <h1 className="mt-4 font-serif text-4xl font-normal text-ink">Welcome to the few.</h1>
      <p className="mt-4 leading-relaxed text-stone">
        {preorder
          ? `Your pre-order is reserved. Estimated ship window: ${shipEstimate}. We'll keep you updated, and you can cancel for a full refund any time before it ships.`
          : "Your Sovereign is being prepared. We'll email tracking details as soon as it ships."}
        {email && ` A confirmation has been sent to ${email}.`}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/account" className={button}>View Your Orders</Link>
        <Link href="/products" className="mt-8 border border-ink px-8 py-4 text-[11px] uppercase tracking-widest2 text-ink transition hover:bg-ink hover:text-bone">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
