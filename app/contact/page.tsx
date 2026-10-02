"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message, website }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-ivory">
      <section className="mx-auto max-w-2xl px-6 py-20 lg:px-10">
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
          <h1 className="font-serif text-4xl font-normal text-ink md:text-5xl">
            We read everything.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-stone">
            Questions about sizing, orders, or the silk itself — reach us directly at{" "}
            <a href="mailto:info@mulberryempire.com" className="border-b border-gold text-gold">
              info@mulberryempire.com
            </a>
            , or use the form below.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          {sent ? (
            <p className="mt-12 font-serif text-xl text-ink" aria-live="polite">
              Thank you. We&apos;ll be in touch shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              {error && (
                <p role="alert" className="text-sm text-red-700">
                  Something went wrong. Please try again or email us directly at{" "}
                  <a href="mailto:info@mulberryempire.com" className="underline">
                    info@mulberryempire.com
                  </a>
                  .
                </p>
              )}
              <div>
                <label htmlFor="contact-name" className="text-[11px] uppercase tracking-widest2 text-stone">
                  Name
                </label>
                <input
                  id="contact-name"
                  required
                  type="text"
                  autoComplete="name"
                  maxLength={120}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm focus:border-ink focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="text-[11px] uppercase tracking-widest2 text-stone">
                  Email
                </label>
                <input
                  id="contact-email"
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm focus:border-ink focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="text-[11px] uppercase tracking-widest2 text-stone">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  maxLength={5000}
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm focus:border-ink focus:outline-none"
                />
              </div>

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
              <p className="text-xs text-stone">
                We use your details only to reply to you. See our{" "}
                <a href="/privacy-policy" className="underline underline-offset-2">Privacy Policy</a>.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="bg-ink px-9 py-4 text-[11px] uppercase tracking-widest2 text-bone transition hover:bg-gold disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </Reveal>
      </section>
    </main>
  );
}