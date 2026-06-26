export default function EditorialQuote({
  quote,
  attribution,
  className = "",
}: {
  quote: string;
  attribution?: string;
  className?: string;
}) {
  return (
    <div className={`relative flex h-full w-full flex-col items-start justify-center bg-ink px-8 py-10 text-bone ${className}`}>
      <span className="font-serif text-5xl leading-none text-gold-light">"</span>
      <p className="mt-2 font-serif text-lg leading-relaxed">{quote}</p>
      {attribution && <p className="mt-4 text-[11px] uppercase tracking-widest2 text-gold-light">{attribution}</p>}
    </div>
  );
}
