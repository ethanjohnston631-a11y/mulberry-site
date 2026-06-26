type Props = { className?: string };

export function FleeceWeaveArt({ className = "" }: Props) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#1c1b18] ${className}`}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-70" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="fleece" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.4" fill="#3a3833" />
            <circle cx="10" cy="9" r="1.4" fill="#2a2924" />
            <circle cx="6" cy="12" r="1" fill="#3a3833" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#fleece)" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 p-5 text-bone/55">
        <p className="text-[10px] uppercase tracking-widest2">Washed Cotton Fleece</p>
        <p className="mt-1 text-xs">Heavyweight shell, hand-distressed</p>
      </div>
    </div>
  );
}

export function SilkSheenArt({ className = "" }: Props) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: "linear-gradient(135deg,#cdab78,#a9824f 40%,#7c5f3a 70%,#cdab78)" }}
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1={-20 + i * 24} y1="220" x2={20 + i * 24} y2="-20" stroke="url(#sheen)" strokeWidth="6" />
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 p-5 text-ink/70">
        <p className="text-[10px] uppercase tracking-widest2">22-Momme Mulberry Silk</p>
        <p className="mt-1 text-xs">Hood lining swatch</p>
      </div>
    </div>
  );
}

export function StitchDetailArt({ className = "" }: Props) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#14130f] ${className}`}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={30 + i * 28}
            x2="200"
            y2={30 + i * 28}
            stroke="#a9824f"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            opacity="0.7"
          />
        ))}
        <line x1="100" y1="0" x2="100" y2="200" stroke="#cdab78" strokeWidth="1" opacity="0.4" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 p-5 text-bone/55">
        <p className="text-[10px] uppercase tracking-widest2">Double-Needle Construction</p>
        <p className="mt-1 text-xs">Reinforced seams, raised graphics</p>
      </div>
    </div>
  );
}
