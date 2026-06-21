import Image from "next/image";

const TONES = {
  ink: "from-[#1c1b18] via-[#0b0b0c] to-[#14130f]",
  gold: "from-[#3a2f1f] via-[#1c1814] to-[#0b0b0c]",
  bone: "from-[#e9e2d4] via-[#f4efe6] to-[#ddd3bd]",
};

export default function ImagePlaceholder({
  label,
  caption,
  tone = "ink",
  aspect = "aspect-[4/5]",
  fill = false,
  showMark = true,
  className = "",
}: {
  label: string;
  caption?: string;
  tone?: keyof typeof TONES;
  aspect?: string;
  fill?: boolean;
  showMark?: boolean;
  className?: string;
}) {
  const light = tone === "bone";
  return (
    <div
      className={`${fill ? "absolute inset-0 h-full w-full" : `relative ${aspect}`} overflow-hidden bg-gradient-to-br ${TONES[tone]} ${className}`}
    >
      <div className="fabric-placeholder absolute inset-0 opacity-40" />
      {showMark && (
        <Image
          src="/logo.png"
          alt=""
          width={64}
          height={64}
          className={`absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 object-contain ${
            light ? "" : "crest-watermark"
          }`}
          style={light ? { opacity: 0.12 } : undefined}
        />
      )}
      <div
        className={`absolute inset-x-0 bottom-0 p-5 ${
          light ? "text-ink/60" : "text-bone/55"
        }`}
      >
        <p className="text-[10px] uppercase tracking-widest2">{label}</p>
        {caption && <p className="mt-1 text-xs">{caption}</p>}
      </div>
    </div>
  );
}
