"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "busy" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function subscribe(e: FormEvent) {
    e.preventDefault();
    if (!consent) {
      setError("Please tick the box to confirm.");
      return;
    }
    setStatus("busy");
    setError(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, source: "newsletter" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
      setStatus("done");
    } catch (err) {
      setError((err as Error).message);
      setStatus("idle");
    }
  }

  return (
    <footer className="border-t border-black/5 bg-ink text-bone">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative block h-7 w-7 shrink-0 overflow-hidden rounded-full invert">
                <Image
                  src="/logo.png"
                  alt="Mulberry"
                  fill
                  style={{ objectFit: "cover", objectPosition: "51% 36%", transform: "scale(1.8)" }}
                />
              </span>
              <span className="font-serif text-lg tracking-widest2 uppercase">Mulberry</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone/60">
              A flagship hoodie, lined in Mulberry silk, built for those who measure success in decades — not seasons.
              Crafted in limited runs. Worn for years.
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-widest2 text-gold-light">Empire of Silk.</p>
          </div>

          <div>
            <p className="mb-4 text-[11px] uppercase tracking-widest2 text-bone/60">Explore</p>
            <ul className="space-y-3 text-sm text-bone/75">
              <li><Link href="/our-story" className="transition hover:text-bone">Our Story</Link></li>
              <li><Link href="/why-silk" className="transition hover:text-bone">Why Silk</Link></li>
              <li><Link href="/history" className="transition hover:text-bone">History of Mulberry Silk</Link></li>
              <li><Link href="/journal" className="transition hover:text-bone">Journal</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[11px] uppercase tracking-widest2 text-bone/60">Support</p>
            <ul className="space-y-3 text-sm text-bone/75">
              <li><Link href="/care-guide" className="transition hover:text-bone">Care Guide</Link></li>
              <li><Link href="/faq" className="transition hover:text-bone">FAQ</Link></li>
              <li><Link href="/contact" className="transition hover:text-bone">Contact</Link></li>
              <li><Link href="/products" className="transition hover:text-bone">Shop</Link></li>
              <li><Link href="/account" className="transition hover:text-bone">Account</Link></li>
              <li><Link href="/shipping" className="transition hover:text-bone">Shipping</Link></li>
              <li><Link href="/returns" className="transition hover:text-bone">Returns</Link></li>
            </ul>
          </div>

          <div>
            <p id="dispatch" className="mb-4 scroll-mt-28 text-[11px] uppercase tracking-widest2 text-bone/60">The Dispatch</p>
            <p className="mb-4 text-sm text-bone/60">
              A short email from Mulberry, sent monthly — new releases, care notes, and the occasional story
              from the silk trade. No spam, unsubscribe anytime.
            </p>
            {status === "done" ? (
              <p className="text-sm text-gold-light" aria-live="polite">You&apos;re in. Watch your inbox.</p>
            ) : (
              <form onSubmit={subscribe} noValidate={false}>
                <div className="flex gap-4 border-b border-bone/30 pb-2">
                  <label htmlFor="footer-email" className="sr-only">Email address</label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full bg-transparent text-sm text-bone placeholder:text-bone/50 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={status === "busy"}
                    className="shrink-0 text-[11px] uppercase tracking-widest2 text-gold-light disabled:opacity-50"
                  >
                    {status === "busy" ? "Joining…" : "Enter the Empire"}
                  </button>
                </div>
                <label className="mt-3 flex items-start gap-2 text-[11px] leading-relaxed text-bone/60">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 accent-gold"
                  />
                  <span>
                    I agree to receive The Dispatch by email. See our{" "}
                    <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-bone">Privacy Policy</Link>.
                  </span>
                </label>
                {error && <p role="alert" className="mt-2 text-[11px] text-red-300">{error}</p>}
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-bone/10 pt-8 text-[11px] uppercase tracking-widest2 text-bone/60 md:flex-row">
          <p>© {new Date().getFullYear()} Mulberry Empire. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a
              href="https://instagram.com/mulberry.hoods"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-bone"
            >
              Instagram
            </a>
            <a href="mailto:info@mulberryempire.com" className="transition hover:text-bone">Email</a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <Link href="/privacy-policy" className="transition hover:text-bone">Privacy</Link>
            <Link href="/privacy-policy#california" className="transition hover:text-bone">Your Privacy Choices</Link>
            <Link href="/terms" className="transition hover:text-bone">Terms</Link>
            <Link href="/accessibility" className="transition hover:text-bone">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
