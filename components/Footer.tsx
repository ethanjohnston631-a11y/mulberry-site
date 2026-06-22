"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="border-t border-black/5 bg-ink text-bone">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative h-7 w-7 overflow-hidden rounded-full">
                <Image src="/logo.png" alt="Mulberry" fill className="scale-[2.3] object-cover object-[50%_18%] invert" />
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
            <p className="mb-4 text-[11px] uppercase tracking-widest2 text-bone/40">Explore</p>
            <ul className="space-y-3 text-sm text-bone/75">
              <li><Link href="/our-story" className="transition hover:text-bone">Our Story</Link></li>
              <li><Link href="/why-silk" className="transition hover:text-bone">Why Silk</Link></li>
              <li><Link href="/history" className="transition hover:text-bone">History of Mulberry Silk</Link></li>
              <li><Link href="/journal" className="transition hover:text-bone">Journal</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[11px] uppercase tracking-widest2 text-bone/40">Support</p>
            <ul className="space-y-3 text-sm text-bone/75">
              <li><Link href="/care-guide" className="transition hover:text-bone">Care Guide</Link></li>
              <li><Link href="/faq" className="transition hover:text-bone">FAQ</Link></li>
              <li><Link href="/contact" className="transition hover:text-bone">Contact</Link></li>
              <li><Link href="/products" className="transition hover:text-bone">Shop</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[11px] uppercase tracking-widest2 text-bone/40">The Dispatch</p>
            <p className="mb-4 text-sm text-bone/60">
              A short email from Mulberry, sent monthly — new releases, care notes, and the occasional story
              from the silk trade. No spam, unsubscribe anytime.
            </p>
            {submitted ? (
              <p className="text-sm text-gold-light">You're in. Watch your inbox.</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="flex border-b border-bone/30 pb-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full bg-transparent text-sm text-bone placeholder:text-bone/40 focus:outline-none"
                />
                <button type="submit" className="text-[11px] uppercase tracking-widest2 text-gold-light">
                  Enter the Empire
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-bone/10 pt-8 text-[11px] uppercase tracking-widest2 text-bone/40 md:flex-row">
          <p>© {new Date().getFullYear()} Mulberry Empire. All Rights Reserved.</p>
          <div className="flex gap-6">
            {/* TODO: replace with the real Instagram handle URL */}
            <a href="https://instagram.com/REPLACE_WITH_INSTAGRAM_HANDLE" className="transition hover:text-bone">
              Instagram
            </a>
            <a href="mailto:info@mulberryempire.com" className="transition hover:text-bone">Email</a>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="transition hover:text-bone">Privacy Policy</Link>
            <Link href="/terms" className="transition hover:text-bone">Terms</Link>
            <Link href="/shipping" className="transition hover:text-bone">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
