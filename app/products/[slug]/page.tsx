import { notFound } from "next/navigation";
import Image from "next/image";
import { getProduct, PRODUCTS } from "@/lib/products";
import AddToCart from "@/components/AddToCart";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="grid grid-cols-2 gap-3">
          {product.colors.map((c) => (
            <div key={c.name} className="relative aspect-[4/5] overflow-hidden bg-white">
              <Image src={c.image} alt={`${product.name} — ${c.name}`} fill className="object-cover" />
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <h1 className="text-2xl font-light uppercase tracking-widest2">{product.name}</h1>
          <p className="mt-2 text-lg text-stone">${product.price}</p>
          <p className="mt-6 max-w-md leading-relaxed text-stone">{product.description}</p>

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
    </main>
  );
}
