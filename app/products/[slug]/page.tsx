import { notFound } from "next/navigation";
import Image from "next/image";
import { getProduct, PRODUCTS } from "@/lib/products";
import AddToCart from "@/components/AddToCart";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <main className="bg-ivory">
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="grid grid-cols-2 gap-3">
            {product.colors.map((c) => (
              <div key={c.name} className="relative aspect-[4/5] overflow-hidden bg-white">
                <Image src={c.image} alt={`${product.name} — ${c.name}`} fill className="object-cover" />
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel>The Flagship</SectionLabel>
            <h1 className="font-serif text-3xl font-normal text-ink md:text-4xl">{product.name}</h1>
            <p className="mt-2 text-xs uppercase tracking-widest2 text-stone">{product.tagline}</p>
            <p className="mt-3 font-serif text-xl text-ink">${product.price}</p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-stone">{product.description}</p>

            <div className="mt-10">
              <AddToCart product={product} />
            </div>

            <ul className="mt-10 space-y-2 border-t border-black/10 pt-6 text-sm text-stone">
              {product.details.map((d) => (
                <li key={d}>— {d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* LIFESTYLE IMAGERY */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Reveal>
            <ImagePlaceholder label="Recommended Asset" caption="Lifestyle — worn, in motion" tone="bone" aspect="aspect-[3/4]" />
          </Reveal>
          <Reveal delay={0.06}>
            <ImagePlaceholder label="Recommended Asset" caption="Macro — silk hood lining" tone="gold" aspect="aspect-[3/4]" />
          </Reveal>
          <Reveal delay={0.12}>
            <ImagePlaceholder label="Recommended Asset" caption="Lifestyle — studio detail" tone="bone" aspect="aspect-[3/4]" />
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
            <ImagePlaceholder label="Recommended Asset" caption="Close-up fabric photography — fleece weave" />
          </Reveal>
          <Reveal delay={0.08}>
            <SectionLabel>Material Story</SectionLabel>
            <h2 className="font-serif text-3xl font-normal text-ink md:text-4xl">
              490gsm fleece outside. 22-momme silk inside.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-stone">
              The shell is heavyweight brushed French terry — dense enough to hold its shape for years, soft
              enough to wear daily. The hood and collar are lined in 22-momme Mulberry silk, the same grade
              used in heirloom bedding, so the surface that meets your skin and hair is the most refined part
              of the garment.
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
