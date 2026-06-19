import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const product = PRODUCTS[0];

  return (
    <main>
      <section className="relative flex h-[92vh] min-h-[560px] items-end overflow-hidden bg-ink">
        <Image
          src="/hero.png"
          alt="Mulberry Essential Hoodie"
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 text-bone lg:px-10">
          <p className="mb-4 text-xs uppercase tracking-widest2 text-bone/70">Fall Collection</p>
          <h1 className="max-w-xl text-5xl font-light leading-[1.05] tracking-tight md:text-7xl">
            Considered design.
            <br />
            Built to last.
          </h1>
          <Link
            href="/products"
            className="mt-8 inline-block bg-bone px-8 py-4 text-sm uppercase tracking-widest2 text-ink transition hover:opacity-90"
          >
            Shop the Collection
          </Link>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-3xl px-6 py-24 text-center lg:px-10">
        <p className="text-xs uppercase tracking-widest2 text-stone">Our Philosophy</p>
        <h2 className="mt-4 text-2xl font-light leading-relaxed md:text-3xl">
          We make one thing exceptionally well — a single hoodie, refined over seasons, cut from the
          heaviest fleece we could find. No noise, no drops, no gimmicks.
        </h2>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <div className="mb-10 flex items-baseline justify-between">
          <h2 className="text-xs uppercase tracking-widest2 text-stone">Shop</h2>
          <Link href="/products" className="text-xs uppercase tracking-widest2 hover:underline">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {product.colors.map((c) => (
            <ProductCard
              key={c.name}
              product={{ ...product, colors: [c, ...product.colors.filter((x) => x.name !== c.name)] }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
