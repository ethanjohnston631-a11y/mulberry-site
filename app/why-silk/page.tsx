import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export const metadata = { title: "Why Silk — Mulberry" };

const BENEFITS = [
  {
    t: "Hair Protection",
    c: "Cotton fibers are rough at a microscopic level — they grip hair as you move, causing friction, frizz, and breakage over time. Mulberry silk's filament is smooth and round, letting hair glide instead of catch.",
  },
  {
    t: "Skin Comfort",
    c: "Silk contains natural proteins (sericin and fibroin) that are gentle on sensitive skin, and it holds significantly less moisture than cotton — meaning less irritation against the neck and face.",
  },
  {
    t: "Reduced Friction",
    c: "Less friction means less pulling on hair follicles and less abrasion on skin during a full day of movement — from the gym to the office to bed.",
  },
  {
    t: "Moisture Retention",
    c: "Silk helps skin retain moisture rather than absorbing it away, unlike cotton, which can leave skin drier after extended contact.",
  },
  {
    t: "Temperature Regulation",
    c: "Silk is a natural insulator with breathable properties — it adapts to your body temperature rather than trapping heat or leaving you cold.",
  },
  {
    t: "Durability",
    c: "Despite its delicate feel, silk is one of the strongest natural fibers by tensile strength, and Mulberry silk — produced exclusively from silkworms fed on mulberry leaves — is the strongest, finest grade available.",
  },
];

export default function WhySilkPage() {
  return (
    <main className="bg-ivory">
      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden bg-ink text-bone">
        <ImagePlaceholder
          label="Recommended Asset"
          caption="Macro silk filament photography"
          tone="gold"
          fill
          showMark={false}
        />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-16 lg:px-10">
          <p className="mb-4 text-[11px] uppercase tracking-widest3 text-gold-light">Why Silk</p>
          <h1 className="font-serif text-4xl font-normal leading-tight md:text-6xl">
            The finest fiber on earth. Here's the case for it.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-10">
        <Reveal>
          <p className="text-base leading-relaxed text-stone">
            Mulberry silk is produced exclusively by the Bombyx mori silkworm, fed a diet of mulberry leaves
            alone. That singular diet produces the smoothest, most uniform, and most prized silk filament in
            the world — the standard against which every other silk is measured.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.t} delay={i * 0.05}>
              <div className="border-t border-gold pt-5">
                <h3 className="text-sm uppercase tracking-widest2 text-ink">{b.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{b.c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink py-24 text-bone">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionLabel dark>The Science, Simply</SectionLabel>
              <h2 className="font-serif text-3xl font-normal leading-tight md:text-4xl">
                Why Mulberry silk outranks every other silk.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-bone/65">
                Not all silk is equal. Wild or "tussah" silks come from silkworms that feed on a mix of
                leaves, producing a coarser, less uniform filament. Mulberry silkworms eat only mulberry
                leaves under controlled conditions, producing the longest, smoothest, most consistent
                filament — graded by momme weight, with higher momme meaning denser, more durable silk.
                We use 22-momme, the grade favored for luxury bedding and now lining our hood and collar.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <ImagePlaceholder label="Recommended Asset" caption="Diagram — silk momme grading / fiber comparison" tone="gold" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-24 text-center lg:px-10">
        <Reveal>
          <SectionLabel>Curious How Deep This Goes?</SectionLabel>
          <h2 className="font-serif text-3xl font-normal text-ink md:text-4xl">
            This fiber has clothed emperors for three thousand years.
          </h2>
          <Link
            href="/history"
            className="mt-8 inline-block border-b border-gold pb-1 text-[11px] uppercase tracking-widest2 text-gold transition hover:opacity-70"
          >
            Read the Full History →
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
