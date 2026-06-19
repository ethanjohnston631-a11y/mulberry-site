import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-widest2 text-stone">Checkout Canceled</p>
      <h1 className="mt-4 text-3xl font-light">No charge was made.</h1>
      <p className="mt-4 leading-relaxed text-stone">
        Your bag is still saved. You can return to checkout whenever you're ready.
      </p>
      <Link
        href="/products"
        className="mt-8 bg-ink px-8 py-4 text-sm uppercase tracking-widest2 text-bone transition hover:opacity-90"
      >
        Back to Shop
      </Link>
    </main>
  );
}
