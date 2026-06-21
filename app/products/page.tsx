import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";

export default function ProductsPage() {
  const product = PRODUCTS[0];

  return (
    <main className="bg-ivory">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <Reveal>
          <SectionLabel>The Collection</SectionLabel>
          <h1 className="font-serif text-4xl font-normal text-ink md:text-5xl">The Sovereign Hoodie</h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-stone">
            One silhouette. Four colorways. Lined in Mulberry silk. Choose yours.
          </p>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {product.colors.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <ProductCard
                product={{ ...product, colors: [c, ...product.colors.filter((x) => x.name !== c.name)] }}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
