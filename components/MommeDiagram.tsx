const GRADES = [
  { momme: 6, label: "Lightweight" },
  { momme: 12, label: "Standard" },
  { momme: 16, label: "Mid-weight" },
  { momme: 19, label: "Premium" },
  { momme: 22, label: "Mulberry Empire", highlight: true },
  { momme: 25, label: "Heaviest" },
];

export default function MommeDiagram({ className = "" }: { className?: string }) {
  const max = 25;
  return (
    <div className={`relative h-full w-full bg-[#1c1814] px-8 py-8 text-bone ${className}`}>
      <p className="text-[10px] uppercase tracking-widest2 text-gold-light">Silk Weight Comparison</p>
      <div className="mt-6 flex h-[65%] items-end gap-4">
        {GRADES.map((g) => (
          <div key={g.momme} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={`w-full rounded-t-sm ${g.highlight ? "bg-gold-light" : "bg-bone/25"}`}
              style={{ height: `${(g.momme / max) * 100}%` }}
            />
            <p className={`text-[10px] ${g.highlight ? "text-gold-light" : "text-bone/50"}`}>{g.momme}mm</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-bone/50">
        Momme measures silk density — higher means heavier, more durable, more refined. We line every hood
        in 22-momme.
      </p>
    </div>
  );
}
