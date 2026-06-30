"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    setSent(true);
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
            <p className="mt-12 font-serif text-xl text-ink">
              Thank you. We'll respond within one business day.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              <div>
                <label className="text-[11px] uppercase tracking-widest2 text-stone">
                  Name
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm focus:border-ink focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-widest2 text-stone">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm focus:border-ink focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-widest2 text-stone">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 w-full border-b border-black/15 bg-transparent py-2 text-sm focus:border-ink focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-ink px-9 py-4 text-[11px] uppercase tracking-widest2 text-bone transition hover:bg-gold"
              >
                Send Message
              </button>
            </form>
          )}
        </Reveal>
      </section>
    </main>
  );
}