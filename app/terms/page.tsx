import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

export const metadata = { title: "Terms of Service — Mulberry" };

export default function TermsPage() {
  return (
    <main className="bg-ivory">
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <Reveal>
          <SectionLabel>Legal</SectionLabel>
          <h1 className="font-serif text-4xl font-normal text-ink md:text-5xl">Terms of Service</h1>
          <p className="mt-6 text-sm text-stone">Last updated: 2026</p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 space-y-8 text-sm leading-relaxed text-stone">
            <p>
              These terms govern your use of this site and any order placed with Mulberry Empire
              ("Mulberry"). By placing an order, you agree to the terms below.
            </p>
            <div>
              <h2 className="mb-2 text-sm uppercase tracking-widest2 text-ink">Orders & Payment</h2>
              <p>
                All orders are processed through Stripe's secure checkout. Prices are listed in USD and are
                subject to change without notice. By placing an order, you agree to pay the listed price plus
                any applicable taxes and shipping.
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-sm uppercase tracking-widest2 text-ink">Product Availability</h2>
              <p>
                Mulberry produces in limited runs. We make reasonable efforts to keep stock information
                accurate, but availability is not guaranteed until your order is confirmed.
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-sm uppercase tracking-widest2 text-ink">Returns</h2>
              <p>
                Unworn items in original condition may be returned within 30 days of delivery. Contact{" "}
                info@mulberryempire.com to start a return.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
