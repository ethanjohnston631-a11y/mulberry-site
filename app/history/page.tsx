import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { SilkRoadMapArt, SericultureArt, RoyalSilkArt, CaravanArt } from "@/components/AncientArt";

export const metadata = { title: "The History of Mulberry Silk" };

const TIMELINE = [
  {
    era: "c. 2700 BCE",
    title: "Legend of the Yellow Empress",
    copy:
      "Chinese legend credits Empress Leizu with discovering silk after a cocoon unraveled into a single, shimmering thread in her tea. Whether myth or memory, sericulture — the cultivation of silkworms — began in ancient China.",
  },
  {
    era: "c. 1200 BCE",
    title: "A State Secret",
    copy:
      "For over a thousand years, China guarded the secret of silk production as a matter of national security. Smuggling silkworm eggs out of the empire was punishable by death.",
  },
  {
    era: "130 BCE",
    title: "The Silk Road Opens",
    copy:
      "Trade routes spanning over 6,400 kilometers connected China to the Mediterranean, carrying silk westward and reshaping global commerce, culture, and diplomacy for fifteen centuries.",
  },
  {
    era: "Han to Tang Dynasties",
    title: "The Fabric of Emperors",
    copy:
      "Silk became the exclusive material of Chinese royalty and high officials — its color and weave dictated by rank. To wear silk was to display sanctioned, untouchable status.",
  },
  {
    era: "6th Century CE",
    title: "Byzantium Breaks the Monopoly",
    copy:
      "According to legend, Byzantine monks smuggled silkworm eggs to Constantinople hidden in hollow canes, ending China's millennium-long monopoly and birthing the European silk trade.",
  },
  {
    era: "Renaissance Europe",
    title: "Royal Courts Adopt the Standard",
    copy:
      "From the Italian city-states to the French and English courts, silk became shorthand for nobility — woven into coronation robes, wedding gowns, and the fabric of state power itself.",
  },
  {
    era: "Today",
    title: "Mulberry Silk, The Gold Standard",
    copy:
      "Of every silk produced globally, Mulberry silk — from silkworms fed exclusively on mulberry leaves — remains the benchmark for quality, prized in the world's finest bedding, garments, and now, our hood lining.",
  },
];

export default function HistoryPage() {
  return (
    <main className="bg-ivory">
      <section className="relative flex h-[65vh] min-h-[440px] items-end overflow-hidden bg-ink text-bone">
        <div className="absolute inset-0 h-full w-full opacity-90">
          <SilkRoadMapArt />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-16 lg:px-10">
          <p className="mb-4 text-[11px] uppercase tracking-widest3 text-gold-light">The History</p>
          <h1 className="font-serif text-4xl font-normal leading-tight md:text-6xl">
            Three thousand years of silk. You're inheriting all of it.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <Reveal>
          <p className="text-base leading-relaxed text-stone">
            No textile in human history carries more weight than silk. It funded empires, sparked wars,
            opened trade routes that reshaped the ancient world, and remained, for most of its existence,
            reserved exclusively for royalty. Mulberry silk — the purest, finest grade — sits at the center
            of that story.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-28 lg:px-10">
        <div className="relative border-l border-black/10 pl-10">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.era} delay={i * 0.05} className="relative mb-14 last:mb-0">
              <span className="absolute -left-[42px] top-1 h-3 w-3 rounded-full bg-gold" />
              <p className="text-[11px] uppercase tracking-widest2 text-gold">{item.era}</p>
              <h3 className="mt-2 font-serif text-2xl text-ink">{item.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone">{item.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink py-24 text-bone">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Reveal>
              <div className="aspect-[4/5]">
                <SericultureArt />
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="aspect-[4/5]">
                <RoyalSilkArt />
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="aspect-[4/5]">
                <CaravanArt />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-24 text-center lg:px-10">
        <Reveal>
          <SectionLabel>The Legacy Continues</SectionLabel>
          <h2 className="font-serif text-3xl font-normal text-ink md:text-4xl">
            We didn't invent this prestige. We inherited it — and we intend to honor it.
          </h2>
        </Reveal>
      </section>
    </main>
  );
}
