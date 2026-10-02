import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { POLICY, shippingCountriesText } from "@/lib/site-config";

export const metadata = { title: "FAQ" };

const FAQS = [
  { q: "What makes The Sovereign different from a regular hoodie?", a: "The hood is lined in 22-momme Mulberry silk — the same grade used in luxury bedding — with far less friction against hair and skin than cotton, while the heavyweight washed cotton shell holds its shape for years." },
  { q: "How do I choose a size?", a: "The Sovereign is cut boxy and slightly oversized by design. If you prefer a closer fit, size down one size. A full measurement chart will be published with the first production run." },
  { q: "Where are your products made?", a: "We're finalizing our production partner for the first run. Each product page and garment label will state the country of origin before any order ships." },
  { q: "How should I wash it?", a: "Cold, inside out, gentle cycle. Lay flat to dry. Full instructions are on our Care Guide page." },
  { q: "Do you restock sold-out colors?", a: "We produce in limited runs rather than continuous mass production. Some colorways return seasonally; others retire permanently." },
  { q: "What payment methods do you accept?", a: "All major credit and debit cards through Stripe's secure checkout. We never see or store your card details." },
  { q: "Do I need an account?", a: "No. You can check out as a guest. With an account (no password, just a one-time email code) your bag follows you across devices and your orders are kept in one place." },
  { q: "Where do you ship?", a: `Currently we ship to ${shippingCountriesText()}, with more regions added over time. See our Shipping page for details.` },
  { q: "What's your return policy?", a: `Unworn, unwashed items with tags attached can be returned within ${POLICY.returnWindowDays} days of delivery. Faulty items are always covered. See our Returns page for details.` },
  { q: "How do pre-orders work?", a: "When we open pre-orders, the estimated ship window is shown before you pay, and you can cancel for a full refund at any time before your order ships." },
];

export default function FaqPage() {
  return (
    <main className="bg-ivory">
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <Reveal>
          <SectionLabel>Questions</SectionLabel>
          <h1 className="font-serif text-4xl font-normal text-ink md:text-5xl">Frequently Asked</h1>
        </Reveal>

        <div className="mt-12 divide-y divide-black/10 border-t border-black/10">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.03}>
              <details className="group py-6">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-ink">
                  {f.q}
                  <span className="ml-4 text-gold transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-stone">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
