import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-bone">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 text-sm text-stone md:flex-row md:items-center md:justify-between lg:px-10">
        <p className="uppercase tracking-widest2">© {new Date().getFullYear()} Mulberry</p>
        <div className="flex gap-8 uppercase tracking-widest2">
          <Link href="/products" className="transition-opacity hover:opacity-60 hover:text-ink">
            Shop
          </Link>
          <a href="mailto:support@mulberry.com" className="transition-opacity hover:opacity-60 hover:text-ink">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
