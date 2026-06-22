type ArtProps = { className?: string };

const STROKE = "#0b0b0c";
const GOLD = "#a9824f";
const PARCH = "#ece3d0";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full" style={{ backgroundColor: PARCH }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(0,0,0,0.06), transparent 40%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.08), transparent 45%)",
        }}
      />
      {children}
    </div>
  );
}

export function SilkRoadMapArt({ className = "" }: ArtProps) {
  return (
    <Frame>
      <svg viewBox="0 0 400 500" className={`h-full w-full ${className}`} xmlns="http://www.w3.org/2000/svg">
        <path
          d="M40 320 Q90 260 130 270 Q170 280 190 230 Q210 180 260 190 Q310 200 340 150"
          fill="none"
          stroke={GOLD}
          strokeWidth="2.5"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
        {[
          [40, 320],
          [130, 270],
          [190, 230],
          [260, 190],
          [340, 150],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill={PARCH} stroke={STROKE} strokeWidth="1.5" />
            <circle cx={x} cy={y} r="1.5" fill={STROKE} />
          </g>
        ))}
        <path
          d="M80 380 L80 360 L70 360 L95 330 L120 360 L110 360 L110 380 Z"
          fill="none"
          stroke={STROKE}
          strokeWidth="1.5"
        />
        <path
          d="M300 130 L300 110 L292 110 L312 88 L332 110 L324 110 L324 130 Z"
          fill="none"
          stroke={STROKE}
          strokeWidth="1.5"
        />
        <text x="200" y="440" textAnchor="middle" fontFamily="serif" fontSize="13" letterSpacing="3" fill={STROKE}>
          THE SILK ROAD
        </text>
        <text x="200" y="462" textAnchor="middle" fontSize="10" letterSpacing="2" fill={GOLD}>
          c. 130 BCE — 1450 CE
        </text>
      </svg>
    </Frame>
  );
}

export function CaravanArt({ className = "" }: ArtProps) {
  return (
    <Frame>
      <svg viewBox="0 0 400 500" className={`h-full w-full ${className}`} xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="200" cy="330" rx="170" ry="6" fill={STROKE} opacity="0.15" />
        {[60, 170, 280].map((x, i) => (
          <g key={i} transform={`translate(${x},150)`}>
            <path
              d="M10 120 Q5 90 20 80 Q15 60 30 55 Q35 30 55 35 Q65 15 80 30 Q95 20 100 40 Q115 45 110 65 Q125 75 115 95 Q120 115 105 120 Z"
              fill="none"
              stroke={STROKE}
              strokeWidth="2"
            />
            <line x1="35" y1="120" x2="35" y2="150" stroke={STROKE} strokeWidth="2" />
            <line x1="85" y1="120" x2="85" y2="150" stroke={STROKE} strokeWidth="2" />
            <path d="M30 35 Q40 5 55 25" fill="none" stroke={STROKE} strokeWidth="2" />
            <rect x="40" y="65" width="35" height="22" fill="none" stroke={GOLD} strokeWidth="1.5" />
          </g>
        ))}
        <text x="200" y="430" textAnchor="middle" fontFamily="serif" fontSize="13" letterSpacing="3" fill={STROKE}>
          THE CARAVAN
        </text>
        <text x="200" y="452" textAnchor="middle" fontSize="10" letterSpacing="2" fill={GOLD}>
          SILK, CARRIED WEST
        </text>
      </svg>
    </Frame>
  );
}

export function SericultureArt({ className = "" }: ArtProps) {
  return (
    <Frame>
      <svg viewBox="0 0 400 500" className={`h-full w-full ${className}`} xmlns="http://www.w3.org/2000/svg">
        <path d="M200 420 L200 250" stroke={STROKE} strokeWidth="3" />
        <path d="M200 320 Q140 300 120 250" fill="none" stroke={STROKE} strokeWidth="2" />
        <path d="M200 280 Q260 260 280 210" fill="none" stroke={STROKE} strokeWidth="2" />
        <path d="M200 350 Q150 340 135 380" fill="none" stroke={STROKE} strokeWidth="2" />

        {[
          [120, 250],
          [280, 210],
          [135, 380],
          [225, 300],
        ].map(([x, y], i) => (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="22"
            ry="15"
            fill={PARCH}
            stroke={GOLD}
            strokeWidth="2"
            transform={`rotate(${i * 23} ${x} ${y})`}
          />
        ))}

        <text x="200" y="450" textAnchor="middle" fontFamily="serif" fontSize="13" letterSpacing="3" fill={STROKE}>
          SERICULTURE
        </text>
        <text x="200" y="472" textAnchor="middle" fontSize="10" letterSpacing="2" fill={GOLD}>
          ANCIENT CHINA, c. 2700 BCE
        </text>
      </svg>
    </Frame>
  );
}

export function RoyalSilkArt({ className = "" }: ArtProps) {
  return (
    <Frame>
      <svg viewBox="0 0 400 500" className={`h-full w-full ${className}`} xmlns="http://www.w3.org/2000/svg">
        <path
          d="M150 120 L150 380 Q150 410 200 410 Q250 410 250 380 L250 120 Q250 90 200 90 Q150 90 150 120 Z"
          fill="none"
          stroke={STROKE}
          strokeWidth="2.5"
        />
        <path d="M165 150 L235 150 M165 200 L235 200 M165 250 L235 250 M165 300 L235 300" stroke={GOLD} strokeWidth="1.5" strokeDasharray="3 6" />
        <circle cx="200" cy="125" r="14" fill="none" stroke={GOLD} strokeWidth="2" />
        <path d="M193 125 L207 125 M200 118 L200 132" stroke={GOLD} strokeWidth="1.5" />

        <text x="200" y="450" textAnchor="middle" fontFamily="serif" fontSize="13" letterSpacing="3" fill={STROKE}>
          ROBES OF RANK
        </text>
        <text x="200" y="472" textAnchor="middle" fontSize="10" letterSpacing="2" fill={GOLD}>
          SILK, RESERVED FOR ROYALTY
        </text>
      </svg>
    </Frame>
  );
}
