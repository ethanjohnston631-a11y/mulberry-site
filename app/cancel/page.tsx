import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center bg-ivory px-6 text-center">
      <p className="text-[11px] uppercase tracking-widest2 text-gold">Checkout Canceled</p>
      <h1 className="mt-4 font-serif text-4xl font-normal text-ink">No charge was made.</h1>
      <p className="mt-4 leading-relaxed text-stone">
        Your bag is still saved. You can return to checkout whenever you're ready.
      </p>
      <Link
        href="/products"
        className="mt-8 bg-ink px-8 py-4 text-[11px] uppercase tracking-widest2 text-bone transition hover:bg-gold"
      >
        Back to Shop
      </Link>
    </main>
  );
}
