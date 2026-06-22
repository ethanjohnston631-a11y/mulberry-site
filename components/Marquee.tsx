const WORDS = ["CRAFTSMANSHIP", "LEGACY", "MULBERRY SILK", "DISCIPLINE", "PRESTIGE", "TIMELESSNESS"];

export default function Marquee() {
  const track = [...WORDS, ...WORDS];

  return (
    <div className="overflow-hidden border-y border-gold/30 bg-ink py-4">
      <div className="marquee-track flex w-max items-center gap-10 text-[11px] uppercase tracking-widest3 text-gold-light">
        {[...track, ...track].map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w}
            <span className="text-gold/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
