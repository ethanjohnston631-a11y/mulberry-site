import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { SilkRoadMapArt } from "@/components/AncientArt";
import Marquee from "@/components/Marquee";

export default function Home() {
  const product = PRODUCTS[0];

  return (
    <main className="bg-ivory">
      {/* HERO */}
      <section className="relative flex h-[100vh] min-h-[640px] items-end overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 text-bone lg:px-10">
          <p className="mb-5 text-[11px] uppercase tracking-widest3 text-gold-light">Empire of Silk</p>
          <h1 className="max-w-2xl font-serif text-5xl font-normal leading-[1.05] md:text-7xl">
            Not made for a season.
            <br />
            Made for a legacy.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-bone/70">
            A flagship hoodie lined in Mulberry silk — for those who measure success in decades, not drops.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="bg-bone px-8 py-4 text-[11px] uppercase tracking-widest2 text-ink transition hover:bg-gold-light"
            >
              Shop The Sovereign
            </Link>
            <Link
              href="/our-story"
              className="border border-bone/30 px-8 py-4 text-[11px] uppercase tracking-widest2 text-bone transition hover:border-bone"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center lg:px-10">
        <Reveal>
          <SectionLabel>The Manifesto</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-serif text-3xl font-normal leading-relaxed text-ink md:text-4xl">
            We don't chase what's fashionable. We refine one piece, year after year, until it's something you
            hand down instead of replace.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-stone">
            Mulberry exists because most clothing is made to be worn once and forgotten. Ours is made to be
            kept — built with the same care as the few other things in your life made to last.
          </p>
        </Reveal>
      </section>

      <Marquee />

      {/* FEATURED PRODUCT */}
      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-white">
              <Image src={product.colors[0].image} alt={product.name} fill className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionLabel>The Flagship</SectionLabel>
            <h2 className="font-serif text-4xl font-normal text-ink md:text-5xl">{product.name}</h2>
            <p className="mt-3 text-sm uppercase tracking-widest2 text-stone">{product.tagline}</p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone">{product.description}</p>
            <p className="mt-8 font-serif text-2xl text-ink">${product.price}</p>
            <Link
              href={`/products/${product.slug}`}
              className="mt-8 inline-block bg-ink px-9 py-4 text-[11px] uppercase tracking-widest2 text-bone transition hover:bg-gold"
            >
              Discover The Sovereign
            </Link>
          </Reveal>
        </div>
      </section>

      {/* WHY MULBERRY SILK */}
      <section className="bg-ink py-28 text-bone">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionLabel dark>Why Mulberry Silk</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-2xl font-serif text-4xl font-normal leading-tight md:text-5xl">
              The finest filament on earth, lining the part you wear closest.
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
            {[
              { n: "01", t: "Hair & Skin", c: "Lower friction than cotton — less breakage, less irritation, day after day." },
              { n: "02", t: "Temperature Regulation", c: "Breathable and insulating at once. Warm when it's cold, cool when it isn't." },
              { n: "03", t: "Three Thousand Years", c: "The fiber that clothed emperors. Still unmatched, still rare." },
            ].map((item, i) => (
              <Reveal key={item.n} delay={0.1 + i * 0.08}>
                <p className="font-serif text-3xl text-gold-light">{item.n}</p>
                <h3 className="mt-4 text-sm uppercase tracking-widest2">{item.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/60">{item.c}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <Link
              href="/why-silk"
              className="mt-16 inline-block border-b border-gold-light pb-1 text-[11px] uppercase tracking-widest2 text-gold-light transition hover:opacity-70"
            >
              Read the Full Case for Silk →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* HERITAGE */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionLabel>Heritage</SectionLabel>
            <h2 className="font-serif text-4xl font-normal text-ink md:text-5xl">
              A legacy older than any luxury house.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-stone">
              Mulberry silk has clothed emperors, traveled the Silk Road, and stood as the gold standard of
              luxury for three thousand years. We didn't invent prestige — we inherited it, and we intend to
              honor it.
            </p>
            <Link
              href="/history"
              className="mt-8 inline-block border-b border-gold pb-1 text-[11px] uppercase tracking-widest2 text-gold transition hover:opacity-70"
            >
              Explore the History →
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="aspect-[4/5]">
              <SilkRoadMapArt />
            </div>
          </Reveal>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="bg-bone py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionLabel>Materials</SectionLabel>
            <h2 className="max-w-xl font-serif text-4xl font-normal text-ink md:text-5xl">
              Every detail considered. Nothing left to chance.
            </h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Reveal>
              <ImagePlaceholder label="Recommended Asset" caption="Macro fleece fiber photography" />
            </Reveal>
            <Reveal delay={0.08}>
              <ImagePlaceholder label="Recommended Asset" caption="22-momme Mulberry silk swatch" tone="gold" />
            </Reveal>
            <Reveal delay={0.16}>
              <ImagePlaceholder label="Recommended Asset" caption="Construction / stitch detail" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-5xl px-6 py-28 text-center lg:px-10">
        <Reveal>
          <SectionLabel>Words From The Few</SectionLabel>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-3">
          {[
            { q: "[Placeholder — real customer testimonial to come]", a: "— [Customer Name]" },
            { q: "[Placeholder — real customer testimonial to come]", a: "— [Customer Name]" },
            { q: "[Placeholder — real customer testimonial to come]", a: "— [Customer Name]" },
          ].map((t, i) => (
            <Reveal key={t.a} delay={i * 0.08}>
              <p className="font-serif text-lg leading-relaxed text-ink">"{t.q}"</p>
              <p className="mt-4 text-xs uppercase tracking-widest2 text-stone">{t.a}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-ink py-32 text-center text-bone">
        <Image
          src="/logo.png"
          alt=""
          width={600}
          height={600}
          className="crest-watermark pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 object-contain"
        />
        <div className="relative z-10 mx-auto max-w-2xl px-6 lg:px-10">
          <Reveal>
            <h2 className="font-serif text-4xl font-normal leading-tight md:text-5xl">
              Some things are worn. This is inherited.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              href="/products"
              className="mt-10 inline-block bg-bone px-10 py-4 text-[11px] uppercase tracking-widest2 text-ink transition hover:bg-gold-light"
            >
              Shop The Collection
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
