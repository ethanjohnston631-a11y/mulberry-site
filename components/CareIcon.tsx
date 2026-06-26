const ICONS: Record<string, JSX.Element> = {
  washing: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="20" y="14" width="40" height="48" rx="4" />
      <circle cx="40" cy="40" r="13" />
      <path d="M40 30 Q47 36 40 40 Q33 44 40 50" />
      <circle cx="26" cy="20" r="1.5" fill="currentColor" />
      <circle cx="32" cy="20" r="1.5" fill="currentColor" />
    </g>
  ),
  drying: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="14" y1="22" x2="66" y2="22" />
      <path d="M28 22 L28 50 Q28 56 34 56 L46 56 Q52 56 52 50 L52 22" />
      <line x1="34" y1="30" x2="34" y2="48" strokeDasharray="3 4" />
      <line x1="46" y1="30" x2="46" y2="48" strokeDasharray="3 4" />
    </g>
  ),
  storage: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 28 L40 16 L60 28 L60 58 L20 58 Z" />
      <line x1="20" y1="28" x2="60" y2="28" />
      <path d="M32 28 L32 20 Q32 16 40 16 Q48 16 48 20 L48 28" />
    </g>
  ),
  maintenance: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="40" cy="40" r="22" />
      <path d="M40 28 L40 40 L48 46" />
    </g>
  ),
  longevity: (
    <g fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M40 16 L52 22 L52 38 Q52 54 40 60 Q28 54 28 38 L28 22 Z" />
      <path d="M33 38 L38 43 L48 31" />
    </g>
  ),
};

export default function CareIcon({ type, className = "" }: { type: keyof typeof ICONS; className?: string }) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-bone text-ink ${className}`}>
      <svg viewBox="0 0 80 80" className="h-16 w-16 text-gold">
        {ICONS[type]}
      </svg>
    </div>
  );
}
