import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import MommeDiagram from "@/components/MommeDiagram";

export const metadata = { title: "Why Silk" };

const BENEFITS = [
  {
    t: "Glides, Doesn't Grip",
    c: "Under a microscope, cotton is made of short, twisted fibers with a comparatively rough surface. Mulberry silk is a long, smooth continuous filament, so hair and skin glide across it instead of catching.",
  },
  {
    t: "Natural Protein Fiber",
    c: "Silk is built from natural proteins, chiefly fibroin. It's the reason silk feels cool, smooth and soft against the neck and face in a way plant fibers don't.",
  },
  {
    t: "Reduced Friction",
    c: "A smoother surface means less friction against your hair and skin every time you pull the hood up or turn your head, from morning to night.",
  },
  {
    t: "Lightweight Luxury",
    c: "At 22 momme, the lining is substantial enough to last and still light enough to disappear when you wear it. You notice the feel, not the weight.",
  },
  {
    t: "Temperature Regulation",
    c: "Silk is breathable and naturally insulating, which is why it has been worn in both warm and cold climates for thousands of years.",
  },
  {
    t: "Durability",
    c: "Despite its delicate feel, silk is one of the strongest natural fibers for its weight. Mulberry silk, from silkworms raised on mulberry leaves, is widely regarded as the finest grade of silk.",
  },
];

export default function WhySilkPage() {
  return (
    <main className="bg-ivory">
      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden bg-ink text-bone">
        <Image src="/textures/texture-silk-sheen.jpg" alt="22-momme Mulberry silk" fill className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
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
                We use 22-momme, the grade favored for luxury bedding and now lining our hood.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <MommeDiagram />
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
