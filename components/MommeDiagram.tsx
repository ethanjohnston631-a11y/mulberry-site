const GRADES = [
  { momme: 6, label: "Lightweight" },
  { momme: 12, label: "Standard" },
  { momme: 16, label: "Mid-weight" },
  { momme: 19, label: "Premium" },
  { momme: 22, label: "Mulberry Empire", highlight: true },
  { momme: 25, label: "Heaviest grade" },
];

const MAX = 25;

export default function MommeDiagram({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="mb-6 text-[10px] uppercase tracking-widest2 text-gold-light">Silk Weight Index</p>
      <div className="divide-y divide-bone/10">
        {GRADES.map((g) => (
          <div key={g.momme} className="flex items-center gap-3 py-3.5 sm:gap-5">
            <span
              className={`w-28 shrink-0 text-[10px] sm:w-32 uppercase tracking-widest2 ${
                g.highlight ? "text-gold-light" : "text-bone/35"
              }`}
            >
              {g.label}
            </span>
            <div className="flex min-w-0 flex-1 items-center gap-3">
              {/* Bar is sized against its own track so the label never pushes the row past the viewport. */}
              <div className="min-w-0 flex-1">
                <div
                  className={`h-px ${g.highlight ? "bg-gold-light" : "bg-bone/20"}`}
                  style={{ width: `${(g.momme / MAX) * 100}%` }}
                />
              </div>
              <span
                className={`w-9 shrink-0 text-right tabular-nums text-[11px] ${
                  g.highlight ? "text-gold-light" : "text-bone/30"
                }`}
              >
                {g.momme}mm
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs leading-relaxed text-bone/40">
        Higher momme = denser, more durable silk. 22-momme is the grade used in heirloom bedding — and now lining every Sovereign hood.
      </p>
    </div>
  );
}
