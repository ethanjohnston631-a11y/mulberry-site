"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { CHECKOUT_OPEN, COUNTRY_OF_ORIGIN, PREORDER_SHIP_ESTIMATE, STORE_MODE } from "@/lib/site-config";

type Props = {
  product: Product;
  colorName: string;
  onColorChange: (name: string) => void;
};

export default function PurchasePanel({ product, colorName, onColorChange }: Props) {
  const { addItem } = useCart();
  const [size, setSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const activeColor = product.colors.find((c) => c.name === colorName) ?? product.colors[0];
  const preorder = STORE_MODE === "preorder" && CHECKOUT_OPEN;

  function handleAdd() {
    if (!size) {
      setSizeError(true);
      return;
    }
    addItem({ slug: product.slug, name: product.name, price: product.price, color: activeColor.name, size, image: activeColor.image });
  }

  return (
    <div>
      <fieldset className="mb-8">
        <legend className="mb-3 text-xs uppercase tracking-widest2 text-stone">Color: {activeColor.name}</legend>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => onColorChange(c.name)}
              aria-label={c.name}
              aria-pressed={colorName === c.name}
              title={c.name}
              className="group relative h-11 w-11"
            >
              <span
                className={`absolute inset-0 rounded-full transition-all duration-200 ${
                  colorName === c.name
                    ? "scale-100 ring-2 ring-gold ring-offset-2 ring-offset-ivory"
                    : "scale-90 ring-1 ring-black/10 ring-offset-2 ring-offset-ivory group-hover:scale-100 group-hover:ring-gold/50"
                }`}
              />
              <span
                className="absolute inset-1.5 rounded-full shadow-inner transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: c.swatch }}
              />
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mb-8">
        <legend className="mb-3 flex w-full items-center justify-between">
          <span className="text-xs uppercase tracking-widest2 text-stone">Size</span>
          <span className="text-xs text-stone">Oversized fit. Size down for a closer cut.</span>
        </legend>
        <div className="grid grid-cols-6 gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={size === s}
              onClick={() => {
                setSize(s);
                setSizeError(false);
              }}
              className={`border py-3 text-xs uppercase transition ${
                size === s ? "border-ink bg-ink text-bone" : "border-black/15 text-ink hover:border-gold"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {sizeError && <p role="alert" className="mt-2 text-xs text-red-700">Please select a size.</p>}
      </fieldset>

      {CHECKOUT_OPEN ? (
        <>
          <motion.button
            onClick={handleAdd}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-ink py-4 text-sm uppercase tracking-widest2 text-bone transition hover:bg-gold"
          >
            {preorder ? "Pre-order" : "Add to Bag"}: ${product.price}
          </motion.button>
          {preorder && (
            <p className="mt-3 text-xs leading-relaxed text-stone">
              Estimated to ship {PREORDER_SHIP_ESTIMATE}. Cancel for a full refund any time before it ships.{" "}
              <Link href="/shipping#pre-orders" className="underline underline-offset-2">How pre-orders work</Link>
            </p>
          )}
        </>
      ) : (
        <WaitlistForm slug={product.slug} color={activeColor.name} size={size} />
      )}

      {COUNTRY_OF_ORIGIN && (
        <p className="mt-4 text-xs text-stone">
          {COUNTRY_OF_ORIGIN.toLowerCase() === "usa" || COUNTRY_OF_ORIGIN.toLowerCase() === "united states"
            ? "Made in USA"
            : `Made in ${COUNTRY_OF_ORIGIN}. Imported.`}
        </p>
      )}
    </div>
  );
}

function WaitlistForm({ slug, color, size }: { slug: string; color: string; size: string | null }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!consent) {
      setError("Please tick the box to confirm you'd like to hear from us.");
      return;
    }
    setState("busy");
    setError(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent, source: "waitlist", slug, color, size, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
      setState("done");
    } catch (err) {
      setError((err as Error).message);
      setState("idle");
    }
  }

  if (state === "done") {
    return (
      <div id="waitlist" className="border border-gold/40 bg-bone p-6" aria-live="polite">
        <p className="font-serif text-xl text-ink">You&apos;re on the list.</p>
        <p className="mt-2 text-sm text-stone">You&apos;ll hear from us first when the first run opens.</p>
      </div>
    );
  }

  return (
    <form id="waitlist" onSubmit={submit} className="scroll-mt-28 border border-black/10 bg-bone p-6">
      <p className="text-[11px] uppercase tracking-widest2 text-gold">First Run: Waitlist Open</p>
      <p className="mt-2 text-sm leading-relaxed text-stone">
        The first production run is in development. Join the waitlist for first access. No payment is taken now.
      </p>
      <label htmlFor="waitlist-email" className="mt-5 block text-[11px] uppercase tracking-widest2 text-stone">Email</label>
      <input
        id="waitlist-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-2 w-full border-b border-black/20 bg-transparent py-2 text-base focus:border-ink focus:outline-none"
      />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />
      <label className="mt-4 flex items-start gap-3 text-xs leading-relaxed text-stone">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-ink" />
        <span>
          Email me when the first run opens, plus occasional news from Mulberry. Unsubscribe anytime. See our{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2">Privacy Policy</Link>.
        </span>
      </label>
      {error && <p role="alert" className="mt-3 text-xs text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={state === "busy"}
        className="mt-5 w-full bg-ink py-4 text-sm uppercase tracking-widest2 text-bone transition hover:bg-gold disabled:opacity-50"
      >
        {state === "busy" ? "Joining…" : `Join the Waitlist${size ? ` · ${color} / ${size}` : ""}`}
      </button>
    </form>
  );
}
