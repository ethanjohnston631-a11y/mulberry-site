const ICONS: Record<string, JSX.Element> = {
  wardrobe: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M30 20 L30 60 M50 20 L50 60" />
      <path d="M20 16 L60 16 L60 64 L20 64 Z" />
      <circle cx="34" cy="40" r="1.5" fill="currentColor" />
      <circle cx="46" cy="40" r="1.5" fill="currentColor" />
    </g>
  ),
  momme: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="18" y="44" width="10" height="16" />
      <rect x="32" y="34" width="10" height="26" />
      <rect x="46" y="22" width="10" height="38" />
      <line x1="14" y1="60" x2="62" y2="60" />
    </g>
  ),
  discipline: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="40" cy="40" r="22" />
      <path d="M40 40 L40 24 M40 40 L52 48" />
    </g>
  ),
};

export default function JournalIcon({ type, className = "" }: { type: keyof typeof ICONS; className?: string }) {
  return (
    <div className={`flex h-full w-full items-center justify-center bg-[#1c1814] ${className}`}>
      <svg viewBox="0 0 80 80" className="h-14 w-14 text-gold-light">
        {ICONS[type]}
      </svg>
    </div>
  );
}
