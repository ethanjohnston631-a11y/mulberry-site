import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

export const metadata = { title: "FAQ" };

const FAQS = [
  { q: "What makes The Sovereign different from a regular hoodie?", a: "The hood is lined in 22-momme Mulberry silk — the same grade used in luxury bedding — reducing friction against hair and skin while the heavyweight washed fleece shell holds its shape for years." },
  { q: "How do I choose a size?", a: "The Sovereign is cut boxy and slightly oversized by design. If you prefer a closer fit, size down one size. Full measurements are in our Care Guide." },
  { q: "Where are your products made?", a: "Cut and sewn in small batches to control quality at every stage, from fleece sourcing to the final silk stitch." },
  { q: "How should I wash it?", a: "Cold, inside out, gentle cycle. Lay flat to dry. Full instructions are on our Care Guide page." },
  { q: "Do you restock sold-out colors?", a: "We produce in limited runs rather than continuous mass production. Some colorways return seasonally; others retire permanently." },
  { q: "What payment methods do you accept?", a: "All major credit and debit cards via Stripe's secure checkout." },
  { q: "Do you ship internationally?", a: "Currently we ship to the United States, Canada, the United Kingdom, and Australia, with more regions added over time." },
  { q: "What's your return policy?", a: "Unworn items in original condition can be returned within 30 days of delivery. Contact us to start a return." },
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
