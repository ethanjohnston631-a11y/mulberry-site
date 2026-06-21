export default function SectionLabel({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-px w-8 bg-gold" />
      <p className={`text-[11px] uppercase tracking-widest3 ${dark ? "text-gold-light" : "text-gold"}`}>
        {children}
      </p>
    </div>
  );
}
