export default function SilkLiningDiagram() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-bone">
      <svg viewBox="0 0 400 500" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="500" fill="#f4efe6" />

        {/* outer hood shell */}
        <path
          d="M120 230 C120 120 160 60 200 60 C240 60 280 120 280 230 L280 280 C280 300 260 300 250 290 L250 240 C250 170 230 130 200 130 C170 130 150 170 150 240 L150 290 C140 300 120 300 120 280 Z"
          fill="none"
          stroke="#0b0b0c"
          strokeWidth="3"
        />

        {/* peeled-back flap revealing lining */}
        <path
          d="M150 240 C150 170 170 130 200 130 C230 130 250 170 250 240 L250 215 C250 165 228 150 200 150 C172 150 150 165 150 215 Z"
          fill="#cdab78"
          opacity="0.9"
        />
        <path
          d="M150 240 C150 170 170 130 200 130 C230 130 250 170 250 240 L250 215 C250 165 228 150 200 150 C172 150 150 165 150 215 Z"
          fill="none"
          stroke="#a9824f"
          strokeWidth="2"
        />

        {/* stitch lines */}
        <path
          d="M158 235 C158 175 175 138 200 138 C225 138 242 175 242 235"
          fill="none"
          stroke="#a9824f"
          strokeDasharray="4 4"
          strokeWidth="1.5"
        />

        {/* leader line + label */}
        <line x1="200" y1="170" x2="200" y2="380" stroke="#a9824f" strokeWidth="1" />
        <circle cx="200" cy="170" r="4" fill="#a9824f" />

        <text x="200" y="410" textAnchor="middle" fill="#0b0b0c" fontSize="13" letterSpacing="2" fontFamily="serif">
          22-MOMME MULBERRY SILK
        </text>
        <text x="200" y="432" textAnchor="middle" fill="#8a8378" fontSize="11" letterSpacing="3">
          HOOD LINING
        </text>
      </svg>
    </div>
  );
}
