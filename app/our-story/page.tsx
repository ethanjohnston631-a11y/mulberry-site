import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export const metadata = { title: "Our Story — Mulberry" };

export default function OurStoryPage() {
  return (
    <main className="bg-ivory">
      <section className="relative flex h-[70vh] min-h-[460px] items-end overflow-hidden bg-ink text-bone">
        <ImagePlaceholder
          label="Recommended Asset"
          caption="Founder portrait or studio imagery"
          tone="ink"
          fill
          showMark={false}
        />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-16 lg:px-10">
          <p className="mb-4 text-[11px] uppercase tracking-widest3 text-gold-light">Our Story</p>
          <h1 className="font-serif text-4xl font-normal leading-tight md:text-6xl">
            We got tired of clothes that didn't deserve to be kept.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 lg:px-10">
        <Reveal>
          <p className="font-serif text-2xl leading-relaxed text-ink">
            Mulberry began with a frustration, not a business plan.
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-8 text-base leading-relaxed text-stone">
            Every closet I owned was full of things bought on impulse and discarded within a year — fast
            fashion dressed up as streetwear, logos chasing whatever was popular that month. None of it
            held up. None of it meant anything. And somewhere in there, I realized the problem wasn't taste.
            It was standards.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-base leading-relaxed text-stone">
            The people I respected most — in business, in fitness, in craft — didn't dress for attention.
            They dressed with intention. Fewer pieces, better made, worn until they earned their wear. That's
            the wardrobe of someone who's serious about their life. I couldn't find a hoodie that fit that
            standard, so we built one.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-6 text-base leading-relaxed text-stone">
            We named the company Mulberry, after the tree that feeds the silkworm — the quiet, unglamorous
            beginning of the most prized textile in human history. Mulberry silk doesn't announce itself.
            It simply outperforms everything else, for thousands of years running. That's the standard we
            hold every piece to, and why we think of what we're building as an empire of silk.
          </p>
        </Reveal>
      </section>

      <section className="bg-ink py-24 text-bone">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-3">
            {[
              { t: "Quality Over Quantity", c: "One flagship piece, refined continuously, instead of a hundred forgettable ones." },
              { t: "Craftsmanship Over Convenience", c: "Small-batch construction and genuine Mulberry silk cost more to produce. We accept that trade." },
              { t: "Self-Respect Over Popularity", c: "We dress for the decade we're building, not the algorithm we're feeding." },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 0.08}>
                <h3 className="font-serif text-xl text-gold-light">{item.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/65">{item.c}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-24 text-center lg:px-10">
        <Reveal>
          <h2 className="font-serif text-3xl font-normal text-ink md:text-4xl">
            Wear something that respects the version of you you're building.
          </h2>
          <Link
            href="/products"
            className="mt-9 inline-block bg-ink px-9 py-4 text-[11px] uppercase tracking-widest2 text-bone transition hover:bg-gold"
          >
            Shop The Sovereign
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
