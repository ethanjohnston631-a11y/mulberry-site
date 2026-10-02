import type { ReactNode } from "react";
import SectionLabel from "@/components/SectionLabel";
import { POLICY } from "@/lib/site-config";

export type LegalSection = { id: string; title: string; body: ReactNode };

// Shared layout for policy pages: readable measure, a jump-to contents list and stable anchors so
// individual clauses can be linked (e.g. /privacy-policy#california).
export default function LegalPage({
  label = "Legal",
  title,
  intro,
  sections,
  updated = POLICY.lastUpdated,
}: {
  label?: string;
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
  updated?: string;
}) {
  return (
    <main className="bg-ivory">
      <article className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="font-serif text-4xl font-normal text-ink md:text-5xl">{title}</h1>
        <p className="mt-6 text-xs uppercase tracking-widest2 text-stone">Last updated {updated}</p>
        <div className="mt-8 text-[15px] leading-relaxed text-stone">{intro}</div>

        {sections.length > 3 && (
          <nav aria-label="Contents" className="mt-10 border-y border-black/10 py-6">
            <p className="mb-3 text-[11px] uppercase tracking-widest2 text-ink">Contents</p>
            <ol className="grid gap-x-8 gap-y-2 text-sm text-stone sm:grid-cols-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="transition hover:text-ink">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mt-12 space-y-12">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="mb-4 text-sm uppercase tracking-widest2 text-ink">
                {i + 1}. {s.title}
              </h2>
              <div className="legal-body space-y-4 text-[15px] leading-relaxed text-stone">{s.body}</div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
