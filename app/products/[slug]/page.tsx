import { notFound } from "next/navigation";
import { getProduct, PRODUCTS } from "@/lib/products";
import ProductExperience from "@/components/ProductExperience";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import SilkLiningDiagram from "@/components/SilkLiningDiagram";
import { FleeceWeaveArt } from "@/components/TextureArt";
import EditorialQuote from "@/components/EditorialQuote";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <main className="bg-ivory">
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <ProductExperience product={product} />
      </section>

      {/* LIFESTYLE IMAGERY */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Reveal>
            <div className="aspect-[3/4]">
              <EditorialQuote quote="Cut oversized. Worn daily. Built to take the wear and look better for it." />
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="aspect-[3/4]">
              <SilkLiningDiagram />
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="aspect-[3/4]">
              <EditorialQuote quote="Every wash is hand-distressed. No two runs come out quite the same." attribution="Small-Batch Finishing" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-ink py-24 text-bone">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionLabel dark>Why It's Different</SectionLabel>
            <h2 className="max-w-xl font-serif text-3xl font-normal leading-tight md:text-4xl">
              This is not a standard hoodie. It's engineered to be lived in.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
            {product.benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <h3 className="text-sm uppercase tracking-widest2 text-gold-light">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/65">{b.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FABRIC MACRO */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="aspect-[4/5]">
              <FleeceWeaveArt />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionLabel>Material Story</SectionLabel>
            <h2 className="font-serif text-3xl font-normal text-ink md:text-4xl">
              Heavyweight fleece outside. 22-momme silk inside.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-stone">
              The shell is heavyweight washed cotton fleece — dense enough to hold its shape for years, soft
              enough to wear daily. The hood is lined in 22-momme Mulberry silk, the same grade used in
              heirloom bedding, so the surface that meets your hair and neck most is also the most refined
              part of the garment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CARE */}
      <section className="bg-bone py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <SectionLabel>Care</SectionLabel>
            <h2 className="max-w-xl font-serif text-3xl font-normal text-ink md:text-4xl">
              Treat it well. It's made to be kept for years, not seasons.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-stone">
              Machine wash cold, inside out, gentle cycle. Lay flat to dry. Never bleach. Full instructions
              and longevity tips are in our Care Guide.
            </p>
            <a
              href="/care-guide"
              className="mt-6 inline-block border-b border-gold pb-1 text-[11px] uppercase tracking-widest2 text-gold transition hover:opacity-70"
            >
              View the Full Care Guide →
            </a>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-24 lg:px-10">
        <Reveal>
          <SectionLabel>Questions</SectionLabel>
        </Reveal>
        <div className="mt-8 divide-y divide-black/10 border-t border-black/10">
          {product.faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
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
