import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const product = PRODUCTS[0];

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <h1 className="mb-12 text-xs uppercase tracking-widest2 text-stone">All Hoodies</h1>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {product.colors.map((c) => (
          <ProductCard
            key={c.name}
            product={{ ...product, colors: [c, ...product.colors.filter((x) => x.name !== c.name)] }}
          />
        ))}
      </div>
    </main>
  );
}
