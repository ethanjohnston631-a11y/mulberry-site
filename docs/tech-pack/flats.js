// Technical flat drawings for the Sovereign Hoodie tech pack (inline SVG, mirrored from one half).
const W = 420;
const m = (x) => W - x;

const half = {
  shoulder: [92, 112],
  neck: [168, 96],
  armpit: [110, 200],
  hemTop: [114, 378],
  hemBot: [116, 410],
  sleeveOutTop: [92, 112],
  sleeveOutBot: [28, 346],
  sleeveInBot: [66, 354],
  cuffOut: [24, 384],
  cuffIn: [62, 392],
};

function bodyPath() {
  const h = half;
  return `M${h.neck} L${h.shoulder} L${h.sleeveOutBot} L${h.sleeveInBot} L${h.armpit} L${h.hemTop}
    L${m(h.hemTop[0])},${h.hemTop[1]} L${m(h.armpit[0])},${h.armpit[1]} L${m(h.sleeveInBot[0])},${h.sleeveInBot[1]}
    L${m(h.sleeveOutBot[0])},${h.sleeveOutBot[1]} L${m(h.shoulder[0])},${h.shoulder[1]} L${m(h.neck[0])},${h.neck[1]} Z`;
}

const stroke = 'stroke="#111" stroke-width="1.6" fill="none" stroke-linejoin="round"';
const stitch = 'stroke="#111" stroke-width="0.8" fill="none" stroke-dasharray="3 2.5"';
const rib = (x1, y1, x2, y2, x3, y3, x4, y4, n) => {
  let lines = "";
  for (let i = 1; i < n; i++) {
    const t = i / n;
    lines += `<line x1="${x1 + (x2 - x1) * t}" y1="${y1 + (y2 - y1) * t}" x2="${x4 + (x3 - x4) * t}" y2="${y4 + (y3 - y4) * t}" stroke="#111" stroke-width="0.5"/>`;
  }
  return `<path d="M${x1},${y1} L${x2},${y2} L${x3},${y3} L${x4},${y4} Z" fill="#fff" ${stroke}/>${lines}`;
};

function cuffsAndHem() {
  const h = half;
  return (
    rib(h.sleeveOutBot[0], h.sleeveOutBot[1], h.sleeveInBot[0], h.sleeveInBot[1], h.cuffIn[0], h.cuffIn[1], h.cuffOut[0], h.cuffOut[1], 9) +
    rib(m(h.sleeveInBot[0]), h.sleeveInBot[1], m(h.sleeveOutBot[0]), h.sleeveOutBot[1], m(h.cuffOut[0]), h.cuffOut[1], m(h.cuffIn[0]), h.cuffIn[1], 9) +
    rib(h.hemTop[0], h.hemTop[1], m(h.hemTop[0]), h.hemTop[1], m(h.hemBot[0]), h.hemBot[1], h.hemBot[0], h.hemBot[1], 46)
  );
}

const silkFill = `<defs><pattern id="silk" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
  <rect width="6" height="6" fill="#f3e7cf"/><line x1="0" y1="0" x2="0" y2="6" stroke="#c9a96b" stroke-width="1"/></pattern></defs>`;

function callout(n, x, y, tx, ty) {
  return `<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="#876435" stroke-width="0.8"/>
    <circle cx="${x}" cy="${y}" r="2" fill="#876435"/>
    <circle cx="${tx}" cy="${ty}" r="9" fill="#876435"/><text x="${tx}" y="${ty + 3.5}" text-anchor="middle" font-size="10" fill="#fff" font-family="Helvetica">${n}</text>`;
}

export function frontFlat({ callouts = true } = {}) {
  return `<svg viewBox="-20 -10 460 450" xmlns="http://www.w3.org/2000/svg">${silkFill}
    <path d="M168,96 C150,40 185,12 210,12 C235,12 270,40 252,96" fill="#fff" ${stroke}/>
    <path d="${bodyPath()}" fill="#fff" ${stroke}/>
    <path d="M176,104 C170,62 192,40 210,40 C228,40 250,62 244,104 L222,112 L210,124 L198,112 Z" fill="url(#silk)" ${stroke}/>
    <path d="M182,104 C178,68 196,48 210,48 C224,48 242,68 238,104" ${stitch}/>
    <path d="M168,96 L198,112 M252,96 L222,112" ${stroke}/>
    <path d="M110,200 L92,112 M310,200 L328,112" stroke="#111" stroke-width="1"/>
    <path d="M114,200 L96,114 M306,200 L324,114" ${stitch}/>
    <path d="M158,282 L262,282 L286,326 L286,372 L134,372 L134,326 Z" fill="#fff" ${stroke}/>
    <path d="M161,286 L259,286 L281,326 M139,326 L161,286 M138,368 L282,368" ${stitch}/>
    <circle cx="132" cy="326" r="1.6" fill="#111"/><circle cx="288" cy="326" r="1.6" fill="#111"/>
    <text x="210" y="226" text-anchor="middle" font-size="15" letter-spacing="2" font-family="Georgia" fill="#555">MULBERRY</text>
    <path d="M258,150 q10,-6 14,4 q2,10 -8,16 q-10,4 -14,-4" fill="none" stroke="#555" stroke-width="1.2"/>
    ${cuffsAndHem()}
    ${callouts ? [
      callout(1, 210, 70, 300, 30),
      callout(2, 210, 222, 360, 225),
      callout(3, 262, 160, 360, 150),
      callout(4, 60, 250, -6, 230),
      callout(5, 210, 330, 360, 300),
      callout(6, 210, 396, 360, 420),
      callout(7, 45, 372, -6, 405),
      callout(8, 101, 150, -6, 130),
    ].join("") : ""}
  </svg>`;
}

export function backFlat() {
  return `<svg viewBox="-20 -10 460 450" xmlns="http://www.w3.org/2000/svg">${silkFill}
    <path d="${bodyPath()}" fill="#fff" ${stroke}/>
    <path d="M168,96 C140,30 180,6 210,6 C240,6 280,30 252,96 C238,104 182,104 168,96 Z" fill="#fff" ${stroke}/>
    <path d="M210,6 L210,100" stroke="#111" stroke-width="1"/>
    <path d="M206,10 L206,98 M214,10 L214,98" ${stitch}/>
    <path d="M110,200 L92,112 M310,200 L328,112" stroke="#111" stroke-width="1"/>
    <text x="210" y="260" text-anchor="middle" font-size="64" font-family="Georgia" fill="#555">M</text>
    <path d="M150,200 L270,300 M270,200 L150,300 M160,190 L250,310 M260,190 L170,310" stroke="#999" stroke-width="0.8"/>
    ${cuffsAndHem()}
    ${callout(9, 210, 240, 360, 220)}
    ${callout(10, 210, 60, 300, 20)}
    ${callout(11, 210, 104, 330, 90)}
  </svg>`;
}

export function measureFlat() {
  const dim = (x1, y1, x2, y2, label, lx, ly) => `
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#876435" stroke-width="1.1" marker-start="url(#a)" marker-end="url(#a)"/>
    <circle cx="${lx}" cy="${ly}" r="8.5" fill="#fff" stroke="#876435"/><text x="${lx}" y="${ly + 3.5}" text-anchor="middle" font-size="10" font-weight="bold" fill="#876435" font-family="Helvetica">${label}</text>`;
  return `<svg viewBox="-20 -10 460 450" xmlns="http://www.w3.org/2000/svg">
    <defs><marker id="a" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#876435"/></marker></defs>
    <path d="M168,96 C150,40 185,12 210,12 C235,12 270,40 252,96" fill="#fff" stroke="#bbb" stroke-width="1.4"/>
    <path d="${bodyPath()}" fill="#fff" stroke="#bbb" stroke-width="1.4"/>
    <path d="M158,282 L262,282 L286,326 L286,372 L134,372 L134,326 Z" fill="none" stroke="#ccc" stroke-width="1"/>
    <path d="M114,378 L306,378 L304,410 L116,410 Z M28,346 L66,354 L62,392 L24,384 Z M354,354 L392,346 L396,384 L358,392 Z" fill="none" stroke="#bbb" stroke-width="1.2"/>
    ${dim(168, 96, 168, 410, "A", 178, 300)}
    ${dim(111, 210, 309, 210, "B", 210, 200)}
    ${dim(114, 376, 306, 376, "C", 230, 368)}
    ${dim(320, 380, 320, 409, "D", 334, 395)}
    ${dim(92, 104, 328, 104, "E", 300, 96)}
    ${dim(92, 112, 28, 346, "F", 46, 222)}
    ${dim(332, 112, 312, 200, "H", 338, 160)}
    ${dim(24, 386, 62, 394, "I", 30, 404)}
    ${dim(66, 356, 62, 392, "J", 80, 376)}
    ${dim(158, 280, 262, 280, "O", 210, 272)}
    ${dim(292, 282, 292, 372, "P", 304, 330)}
    ${dim(178, 96, 242, 96, "M", 210, 88)}
    ${dim(270, 12, 270, 96, "K", 282, 50)}
  </svg>`;
}

export function hoodSection() {
  return `<svg viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg">${silkFill}
    <text x="10" y="18" font-size="11" font-family="Helvetica" fill="#876435" letter-spacing="1.5">HOOD BUILD: EXPLODED (NOT TO SCALE)</text>
    <path d="M30,230 C10,140 40,50 120,40 C170,36 190,90 190,230 Z" fill="#fff" stroke="#111" stroke-width="1.5"/>
    <text x="70" y="250" font-size="10" font-family="Helvetica">A. Shell hood (washed)</text>
    <path d="M200,230 C180,140 210,50 290,40 C340,36 360,90 360,230 Z" fill="url(#silk)" stroke="#111" stroke-width="1.5"/>
    <text x="222" y="250" font-size="10" font-family="Helvetica">B. Silk lining hood (22 momme)</text>
    <path d="M395,40 C445,40 470,70 470,120" fill="none" stroke="#111" stroke-width="9" stroke-linecap="round"/>
    <path d="M395,40 C445,40 470,70 470,120" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
    <text x="392" y="140" font-size="10" font-family="Helvetica">C. Self-fabric face facing</text>
    <text x="392" y="153" font-size="10" font-family="Helvetica">2.5 cm, hides silk edge</text>
    <rect x="392" y="185" width="110" height="10" fill="#fff" stroke="#111"/>
    <text x="392" y="215" font-size="10" font-family="Helvetica">D. Self-fabric neck tape</text>
    <text x="392" y="228" font-size="10" font-family="Helvetica">encloses lining/neck seam</text>
  </svg>`;
}
