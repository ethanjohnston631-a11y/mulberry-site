import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export const metadata = { title: "Care Guide — Mulberry Empire" };

const STEPS = [
  {
    n: "01",
    t: "Washing",
    c: "Turn inside out before washing to protect the silk lining and outer color. Machine wash cold on a gentle cycle with like colors. Avoid bleach and fabric softener — both degrade silk fibers over time.",
  },
  {
    n: "02",
    t: "Drying",
    c: "Lay flat to dry, away from direct sunlight and heat. Tumble drying breaks down the fleece loft and can damage the silk lining permanently. Patience here adds years to the garment.",
  },
  {
    n: "03",
    t: "Storage",
    c: "Fold rather than hang to preserve the boxy shoulder line. Store in a cool, dry place. A breathable cotton garment bag is ideal for extended storage between seasons.",
  },
  {
    n: "04",
    t: "Maintenance",
    c: "Pill removal: use a fabric shaver sparingly on the fleece exterior only — never on the silk lining. Spot-clean small stains immediately with cold water before they set.",
  },
  {
    n: "05",
    t: "Longevity",
    c: "Treat it the way you'd treat anything meant to last: wear it, wash it correctly, and let it earn its character. A well-kept Sovereign should outlast a decade of regular wear.",
  },
];

export default function CareGuidePage() {
  return (
    <main className="bg-ivory">
      <section className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10">
        <Reveal>
          <SectionLabel>Care Guide</SectionLabel>
          <h1 className="font-serif text-4xl font-normal text-ink md:text-5xl">
            Maintain it well. It was built to last decades.
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 lg:px-10">
        <div className="grid grid-cols-1 gap-14">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-[120px_1fr_280px] md:items-start">
                <p className="font-serif text-4xl text-gold-light">{s.n}</p>
                <div>
                  <h3 className="text-sm uppercase tracking-widest2 text-ink">{s.t}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">{s.c}</p>
                </div>
                <ImagePlaceholder label="Recommended Asset" caption={`Visual instruction — ${s.t.toLowerCase()}`} aspect="aspect-[4/3]" />
              </div>
              {i < STEPS.length - 1 && <div className="mt-14 hairline" />}
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
