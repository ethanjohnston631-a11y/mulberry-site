import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

export const metadata = { title: "Journal" };

const POSTS = [
  {
    t: "On Building a Wardrobe That Respects Your Time",
    c: "Why fewer, better pieces compound the way good habits do.",
    img: "/journal/journal-wardrobe.jpg",
  },
  {
    t: "Inside the Momme: How Silk Quality Is Actually Graded",
    c: "A closer look at the number that separates luxury silk from everything else.",
    img: "/journal/journal-silk-grade.jpg",
  },
  {
    t: "Discipline Is a Material Choice",
    c: "What the clothes you choose say about the standards you keep.",
    img: "/journal/journal-discipline.jpg",
  },
];

export default function JournalPage() {
  return (
    <main className="bg-ivory">
      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
        <Reveal>
          <SectionLabel>The Journal</SectionLabel>
          <h1 className="font-serif text-4xl font-normal text-ink md:text-5xl">
            Notes on craft, discipline, and the silk trade.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-stone">
            The Journal is where we go deeper than a product page allows — the reasoning behind our
            materials, the standards we hold the brand to, and the history of Mulberry silk itself. New
            entries are added periodically; check back, or subscribe to the Dispatch in the footer.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {POSTS.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.06}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={p.img} alt={p.t} fill className="object-cover" />
              </div>
              <h3 className="mt-5 font-serif text-xl text-ink">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone">{p.c}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
