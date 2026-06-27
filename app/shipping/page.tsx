import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

export const metadata = { title: "Shipping" };

export default function ShippingPage() {
  return (
    <main className="bg-ivory">
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <Reveal>
          <SectionLabel>Shipping</SectionLabel>
          <h1 className="font-serif text-4xl font-normal text-ink md:text-5xl">Shipping Information</h1>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 space-y-8 text-sm leading-relaxed text-stone">
            <div>
              <h2 className="mb-2 text-sm uppercase tracking-widest2 text-ink">Where We Ship</h2>
              <p>Currently the United States, Canada, the United Kingdom, and Australia.</p>
            </div>
            <div>
              <h2 className="mb-2 text-sm uppercase tracking-widest2 text-ink">Processing Time</h2>
              <p>Orders are processed within 2–3 business days before shipment.</p>
            </div>
            <div>
              <h2 className="mb-2 text-sm uppercase tracking-widest2 text-ink">Delivery Estimates</h2>
              <p>Domestic: 4–7 business days. International: 7–14 business days. Rates calculated at checkout.</p>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
