// Builds the Sovereign Hoodie tech pack: a self-contained HTML file and a print-ready PDF.
//   node docs/tech-pack/build.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { frontFlat, backFlat, measureFlat, hoodSection } from "./flats.js";

const dir = path.dirname(fileURLToPath(import.meta.url));
const img = (name) => `data:image/jpeg;base64,${fs.readFileSync(path.join(dir, "img", name)).toString("base64")}`;

const STYLE = "MB-SOV-001";
const DATE = "02 Oct 2026";
const VERSION = "v1.0: Development / Proto request";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
// [code, point of measure, how to measure, tolerance ±cm, base M, grade per size (cm)]
const POMS = [
  ["A", "Body length", "HPS to bottom of hem rib", 1, 71, 2],
  ["B", "½ Chest", "2.5 cm below armhole, side to side", 1, 64, 3],
  ["C", "½ Bottom width", "Top of hem rib, relaxed", 1, 57, 3],
  ["D", "Hem rib height", "Seam to edge", 0.3, 7, 0],
  ["E", "Shoulder width", "Shoulder seam to shoulder seam (dropped)", 1, 62, 2.5],
  ["F", "Sleeve length", "Shoulder seam to cuff edge", 1, 57, 1],
  ["G", "½ Bicep", "2.5 cm below armhole, parallel to cuff", 0.5, 27, 1],
  ["H", "Armhole straight", "Shoulder point to underarm", 0.5, 29, 1],
  ["I", "½ Cuff width", "Relaxed, at edge", 0.5, 10.5, 0.5],
  ["J", "Cuff height", "Seam to edge", 0.3, 8, 0],
  ["K", "Hood height", "HPS to top of hood", 0.5, 37, 1],
  ["L", "½ Hood width", "Widest point, hood laid flat", 0.5, 26, 0.5],
  ["M", "Neck width", "Seam to seam, HPS to HPS", 0.5, 21, 0.5],
  ["N", "Front neck drop", "HPS line to CF neck seam", 0.5, 9.5, 0.5],
  ["O", "Pocket width (top)", "Top edge, end to end", 0.5, 30, 1],
  ["P", "Pocket height", "Top edge to hem-side edge", 0.5, 21, 0.5],
  ["Q", "Pocket placement", "HPS to top of pocket", 0.5, 40, 1],
];

const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

function specTable() {
  const head = `<tr><th>POM</th><th>Description</th><th>How to measure</th><th>Tol ±</th>${SIZES.map((s) => `<th class="${s === "M" ? "base" : ""}">${s}</th>`).join("")}</tr>`;
  const rows = POMS.map(([code, name, how, tol, base, grade]) => {
    const vals = SIZES.map((_, i) => base + (i - 2) * grade);
    return `<tr><td class="c"><b>${code}</b></td><td>${name}</td><td class="muted">${how}</td><td class="c">${fmt(tol)}</td>${vals
      .map((v, i) => `<td class="c ${i === 2 ? "base" : ""}">${fmt(v)}</td>`)
      .join("")}</tr>`;
  }).join("");
  return `<table class="spec">${head}${rows}</table>`;
}

const COLORS = [
  ["Black", "#19191b", "black"],
  ["Brown", "#9c7e63", "brown"],
  ["Green", "#5c6b5e", "green"],
  ["Grey", "#83837c", "grey"],
  ["Navy Blue", "#454f63", "navy-blue"],
];

const page = (title, n, body) => `
<section class="page">
  <header class="ph">
    <div><span class="brand">MULBERRY EMPIRE</span><span class="sep">|</span>${title}</div>
    <div class="meta">Style ${STYLE} · The Sovereign Hoodie · ${VERSION} · ${DATE} · Page ${n}</div>
  </header>
  <div class="pb">${body}</div>
  <footer class="pf">Confidential. Property of Mulberry Empire. Not to be shared or produced without written approval. Measurements in cm.</footer>
</section>`;

const pages = [];

pages.push(`
<section class="page cover">
  <div class="cover-l">
    <p class="eyebrow">Technical Package</p>
    <h1>The Sovereign Hoodie</h1>
    <p class="sub">Heavyweight garment-washed cotton hoodie · 22-momme Mulberry silk-lined hood</p>
    <table class="kv">
      <tr><th>Style #</th><td>${STYLE}</td></tr>
      <tr><th>Brand</th><td>Mulberry Empire</td></tr>
      <tr><th>Category</th><td>Men's / Unisex Tops: Pullover Hoodie</td></tr>
      <tr><th>Fit</th><td>Oversized, boxy, dropped shoulder</td></tr>
      <tr><th>Sample size</th><td>M</td></tr>
      <tr><th>Size range</th><td>XS · S · M · L · XL · XXL</td></tr>
      <tr><th>Colorways</th><td>Black, Brown, Green, Grey, Navy Blue</td></tr>
      <tr><th>Stage</th><td>${VERSION}</td></tr>
      <tr><th>Issued</th><td>${DATE}</td></tr>
      <tr><th>Contact</th><td>Ethan Johnston, Founder &amp; Creative Director<br>info@mulberryempire.com · www.mulberryempire.com</td></tr>
    </table>
    <div class="alert">
      <b>Notes for the factory</b>
      <ol>
        <li><b>The silk lining must never go through the garment wash, enzyme, bleach-spray or tumble process.</b> Wash and distress the cotton shell first, then attach the separately-made silk hood lining (page 4).</li>
        <li>Values marked <span class="tbc">TBC</span> are proposals to be confirmed together during development. Please suggest alternatives where your experience says better.</li>
        <li>The front wordmark artwork is subject to final brand approval. Please don't order branded trims or bulk-print until written sign-off.</li>
      </ol>
    </div>
  </div>
  <div class="cover-r">
    <img src="${img("black.jpg")}" alt="Front reference">
    <img src="${img("black-back.jpg")}" alt="Back reference">
    <p class="cap">Design reference renders (Black). Final colors to be matched from approved lab dips.</p>
  </div>
</section>`);

pages.push(page("Technical Flats", 2, `
<div class="grid2">
  <div><h3>Front</h3>${frontFlat()}</div>
  <div><h3>Back</h3>${backFlat()}</div>
</div>
<table class="legend">
  <tr><td><b>1</b></td><td>Two-panel hood with center seam, <b>fully lined in 22-momme Mulberry silk</b> (silk shown hatched). No drawcord, no eyelets (see Open Decisions).</td>
      <td><b>7</b></td><td>2×2 rib cuffs, 8 cm, self-color, garment-washed with shell.</td></tr>
  <tr><td><b>2</b></td><td>Front wordmark: raised chrome-effect artwork, CF, see Artwork page.</td>
      <td><b>8</b></td><td>Dropped shoulder, armhole seam topstitched twin-needle 0.6 cm.</td></tr>
  <tr><td><b>3</b></td><td>Chest emblem (silkworm mark), wearer's left chest, metallic embroidery.</td>
      <td><b>9</b></td><td>Back center artwork: chrome-effect "M" monogram with linear burst.</td></tr>
  <tr><td><b>4</b></td><td>Sleeve artwork: linear silver "thorn" graphic, both sleeves, outer arm.</td>
      <td><b>10</b></td><td>Hood center-back seam: flat-felled or overlocked + twin-needle cover, shell only.</td></tr>
  <tr><td><b>5</b></td><td>Kangaroo pocket, slanted hand openings, twin-needle edge, bartacks at 4 points.</td>
      <td><b>11</b></td><td>Back neck: self-fabric tape 1.2 cm covers neck/lining seam; main label sits on tape.</td></tr>
  <tr><td><b>6</b></td><td>2×2 rib hem band, 7 cm, self-color.</td>
      <td></td><td></td></tr>
</table>`));

pages.push(page("Bill of Materials", 3, `
<table class="bom">
  <tr><th>#</th><th>Component</th><th>Specification</th><th>Placement / Use</th><th>Qty / pc</th><th>Status</th></tr>
  <tr><td>1</td><td><b>Shell fabric</b></td><td>100% cotton heavyweight loopback French terry (unbrushed), combed ring-spun, pre-shrunk. Target <b>480–500 GSM</b> before wash. Face: smooth jersey; back: loops. Shrinkage after wash ≤ 5% L/W.</td><td>Body, sleeves, hood shell, pocket, facings, neck tape</td><td>Approx. 1.6 m (factory to confirm marker)</td><td><span class="tbc">TBC</span> swatch approval</td></tr>
  <tr><td>2</td><td><b>Hood lining</b></td><td><b>100% Mulberry silk charmeuse, 22 momme</b> (≈ 95 g/m²), grade 6A long-fiber, satin face toward wearer. OEKO-TEX Standard 100 certified preferred. Color: one lining color across all colorways (see Open Decisions).</td><td>Hood interior only (2 panels)</td><td>Approx. 0.45 m @ 114 cm width</td><td><span class="tbc">TBC</span> source + color</td></tr>
  <tr><td>3</td><td><b>Rib</b></td><td>2×2 rib, 95% cotton / 5% elastane, ≈ 400 GSM, dyed to match shell, garment-washed with shell.</td><td>Cuffs, hem band</td><td>Approx. 0.25 m</td><td>Lab dip ×5</td></tr>
  <tr><td>4</td><td><b>Sewing thread: shell</b></td><td>100% polyester core-spun, Tex 40, color-matched (washes with garment).</td><td>All shell seams, topstitching</td><td>n/a</td><td>Factory standard</td></tr>
  <tr><td>5</td><td><b>Sewing thread: silk</b></td><td>Fine polyester or silk filament Tex 24–27, Microtex needle 70/10, 14–16 SPI.</td><td>Silk lining seams</td><td>n/a</td><td>Factory standard</td></tr>
  <tr><td>6</td><td><b>Chest emblem</b></td><td>Embroidery: silkworm mark. Metallic silver thread (e.g., Madeira FS or equivalent) with satin-stitch segments and 3D puff underlay for raised effect. Approx. 5.5 × 7 cm.</td><td>Wearer's left chest</td><td>1</td><td>Strike-off</td></tr>
  <tr><td>7</td><td><b>Front wordmark</b></td><td>High-density (HD) 3D silicone print with mirror-chrome metallic foil, or chrome-finish TPU 3D transfer. Approx. 26 × 7 cm. Must survive 30 home washes without cracking/peeling.</td><td>CF chest</td><td>1</td><td>Strike-off, <span class="tbc">brand sign-off</span></td></tr>
  <tr><td>8</td><td><b>Back monogram</b></td><td>As #7: HD chrome-effect "M" with fine linear burst in metallic silver HD print. Approx. 30 × 28 cm.</td><td>CB, upper back</td><td>1</td><td>Strike-off</td></tr>
  <tr><td>9</td><td><b>Sleeve graphic</b></td><td>Metallic silver HD/puff print, linear "thorn" lattice. Approx. 9 × 34 cm each.</td><td>Both sleeves, outer arm</td><td>2</td><td>Strike-off</td></tr>
  <tr><td>10</td><td><b>Distress / speckle</b></td><td>Fine bleach/paint spray speckles + sun-faded garment wash (see Wash). Applied to shell <b>before</b> lining attachment.</td><td>Front, back, sleeves (random)</td><td>n/a</td><td>Wash standard</td></tr>
  <tr><td>11</td><td><b>Main label</b></td><td>Woven damask, high-density, approx. 5 × 2 cm, end-fold, black ground / champagne-gold text. Logo artwork supplied.</td><td>Back neck tape, centered</td><td>1</td><td><span class="tbc">TBC</span></td></tr>
  <tr><td>12</td><td><b>Care / content label</b></td><td>Printed satin, approx. 3.5 × 8 cm. Content per Labelling page (required by law).</td><td>Wearer's left side seam, 10 cm above hem</td><td>1</td><td>Text supplied</td></tr>
  <tr><td>13</td><td><b>Size label</b></td><td>Woven, approx. 1.5 × 1.5 cm, black/gold.</td><td>Under main label</td><td>1</td><td></td></tr>
  <tr><td>14</td><td><b>Hang tag</b></td><td>600 GSM uncoated cotton board, approx. 5 × 9 cm, champagne-gold foil. Waxed black cotton string + metal seal.</td><td>Attached through care label</td><td>1</td><td>Artwork supplied</td></tr>
  <tr><td>15</td><td><b>Packaging</b></td><td>See Packaging page.</td><td></td><td>1 set</td><td></td></tr>
</table>`));

pages.push(page("Construction & Build Sequence", 4, `
<div class="grid2 top">
  <div>
    <h3>Seams &amp; stitching (shell)</h3>
    <table class="kv tight">
      <tr><th>Body / sleeve seams</th><td>4-thread overlock, 10–12 SPI</td></tr>
      <tr><th>Armhole</th><td>Overlock + twin-needle coverstitch topstitch 0.6 cm</td></tr>
      <tr><th>Hood CB seam</th><td>Overlock + twin-needle coverstitch</td></tr>
      <tr><th>Cuffs / hem rib</th><td>Overlock, seam allowance pressed to body, single-needle topstitch</td></tr>
      <tr><th>Kangaroo pocket</th><td>Hand openings faced, twin-needle 0.6 cm, bartacks at 4 corners</td></tr>
      <tr><th>Back neck</th><td>Self-fabric tape 1.2 cm, twin-needle, covers neck/lining seam</td></tr>
      <tr><th>Face opening</th><td>Self-fabric facing 2.5 cm, turned to inside, so silk never rolls to the outside</td></tr>
    </table>
    <h3>Silk lining</h3>
    <table class="kv tight">
      <tr><th>Construction</th><td>Two-panel hood, same pattern as shell minus 0.3 cm ease at crown, French seam at CB (no raw edges)</td></tr>
      <tr><th>Attachment</th><td>Joined to shell at face opening under the facing, and at neckline enclosed by neck tape. Free-floating elsewhere.</td></tr>
      <tr><th>Needle / SPI</th><td>Microtex 70/10, 14–16 SPI, light presser pressure, tissue/stabilizer as needed to avoid puckering</td></tr>
      <tr><th>Pressing</th><td>Silk setting ≤ 150 °C with press cloth, no steam spotting</td></tr>
    </table>
  </div>
  <div>
    ${hoodSection()}
    <h3>Required build sequence</h3>
    <ol class="steps">
      <li>Cut shell, rib and silk. Shrinkage-test the shell first and add wash allowance to the shell pattern.</li>
      <li>Apply chest embroidery to the front panel (or post-wash; factory to advise from strike-off).</li>
      <li>Assemble the full shell (body, sleeves, rib, pocket, shell hood with facing), <b>without the silk lining</b>.</li>
      <li>Garment wash, sun-fade and speckle-spray the shell. Tumble dry or air dry to the agreed shrinkage.</li>
      <li>Apply HD/chrome prints after washing so the metallic finish stays crisp.</li>
      <li>Sew the silk lining hood separately. Attach it at the face facing and neckline, then close the back neck with the tape.</li>
      <li>Attach labels and hang tag. Final low-temperature press, protecting the silk and the prints.</li>
      <li>Inline + final QC (page 8), fold with tissue around the hood, and pack.</li>
    </ol>
  </div>
</div>`));

pages.push(page("Measurement Specification", 5, `
<div class="grid-ms">
  <div>${measureFlat()}<p class="cap">Points of measure. G, L, N, Q measured as described.</p></div>
  <div><p class="note" style="margin:0 0 6px">All measurements in cm, garment laid flat, after wash.</p>${specTable()}
    <p class="note"><span class="tbc">TBC</span> Proposed oversized block for proto. Validate on a fit model in size M and update after the first fit session. All measurements are final, after garment wash.</p>
  </div>
</div>`));

pages.push(page("Artwork & Placement", 6, `
<div class="art">
  <figure><img src="${img("detail-wordmark.jpg")}"><figcaption><b>Front wordmark</b><br>CF, top edge 22 cm below HPS (size M).<br>Approx. 26 × 7 cm. HD 3D silicone + mirror-chrome foil.<br><span class="tbc">Brand sign-off required before bulk</span></figcaption></figure>
  <figure><img src="${img("detail-silkworm.jpg")}"><figcaption><b>Chest emblem: silkworm mark</b><br>Wearer's left, center 11 cm from CF, top 13 cm below HPS.<br>Approx. 5.5 × 7 cm. Metallic embroidery with 3D puff.</figcaption></figure>
  <figure><img src="${img("detail-back-m.jpg")}"><figcaption><b>Back monogram</b><br>CB, top edge 14 cm below CB neck seam.<br>Approx. 30 × 28 cm including burst lines.</figcaption></figure>
  <figure><img src="${img("detail-sleeve.jpg")}"><figcaption><b>Sleeve graphic (both sleeves)</b><br>Outer arm, starting 12 cm below shoulder seam.<br>Approx. 9 × 34 cm, metallic silver HD print.</figcaption></figure>
</div>
<p class="note">Vector artwork (AI/PDF/SVG, Pantone references) to be supplied separately. Artwork scales with size: XS/S at 95%, M/L at 100%, XL/XXL at 105%. Placements are measured on size M.</p>`));

pages.push(page("Colorways, Wash & Labelling", 7, `
<div class="colors">
  ${COLORS.map(([name, hex, file]) => `<figure><img src="${img(file + ".jpg")}"><figcaption><span class="sw" style="background:${hex}"></span><b>${name}</b><br><span class="muted">Ref. ${hex.toUpperCase()} · lab dip to match</span></figcaption></figure>`).join("")}
</div>
<div class="grid2 top">
  <div>
    <h3>Wash &amp; finish standard</h3>
    <ul>
      <li>Garment wash (enzyme or stone-free) for a soft, lived-in hand. Lightly sun-faded at shoulders, hood crown and pocket edge.</li>
      <li>Fine white/off-white speckle spray, randomly scattered, approx. 15–30 dots per panel. No large splashes.</li>
      <li>Light abrasion at hood edge and cuff/hem rib. <b>No holes.</b></li>
      <li>Approve a wash standard per colorway. Bulk must match the approved standard.</li>
    </ul>
  </div>
  <div>
    <h3>Care / content label text (required)</h3>
    <div class="label">
      SHELL: 100% COTTON<br>
      LINING: 100% SILK<br>
      RIB: 95% COTTON, 5% ELASTANE<br>
      EXCLUSIVE OF DECORATION<br>
      MADE IN [COUNTRY]<br>
      [RN NUMBER OR "MULBERRY EMPIRE"]<br><br>
      MACHINE WASH COLD, GENTLE CYCLE, INSIDE OUT.<br>
      WASH WITH LIKE COLORS. DO NOT BLEACH.<br>
      DO NOT TUMBLE DRY. LAY FLAT TO DRY.<br>
      COOL IRON ON REVERSE. DO NOT IRON PRINT.<br>
      DO NOT DRY CLEAN.
    </div>
    <p class="note">Care instructions must be validated by wash testing on the finished garment (shell, silk and prints together) before bulk.</p>
  </div>
</div>`));

pages.push(page("Packaging, Approvals & QC", 8, `
<div class="grid2 top">
  <div>
    <h3>Packaging (per unit)</h3>
    <ol class="steps">
      <li>Garment folded with the hood laid flat. Acid-free tissue placed inside the hood to protect the silk.</li>
      <li>Wrapped in black branded tissue, closed with a gold-foil sticker.</li>
      <li>Recycled clear polybag with suffocation warning, size sticker on the outside.</li>
      <li>Rigid or folding branded box (black, gold-foil logo), approx. 32 × 26 × 7 cm. <span class="tbc">TBC</span> quote for both options.</li>
    </ol>
    <h3>Approval stages</h3>
    <table class="kv tight">
      <tr><th>1. Lab dips</th><td>Shell ×5, rib ×5, silk lining</td></tr>
      <tr><th>2. Strike-offs</th><td>Embroidery, front, back and sleeve prints, on washed fabric</td></tr>
      <tr><th>3. Proto</th><td>1 pc, size M, Black: construction and silk method</td></tr>
      <tr><th>4. Fit sample</th><td>Size M on fit model, then measurements updated</td></tr>
      <tr><th>5. PP samples</th><td>1 per colorway, all trims and labels, wash standard</td></tr>
      <tr><th>6. TOP sample</th><td>From bulk, before shipping</td></tr>
    </table>
  </div>
  <div>
    <h3>Quality requirements</h3>
    <ul>
      <li>Final inspection AQL 2.5 (major) / 4.0 (minor). Zero tolerance for holes, silk snags, silk visible on the outside, or print peeling.</li>
      <li>Measurements within tolerance on 100% of the pieces measured.</li>
      <li>Print adhesion and crack test after 5 home washes on the PP sample.</li>
      <li>Color fastness to washing and rubbing ≥ grade 4 (shell and silk).</li>
      <li>Silk lining: no puckering at seams, no shine marks from pressing, hood hangs without pulling.</li>
      <li>Thread ends trimmed, no loose stitches, labels straight.</li>
    </ul>
    <h3>Open decisions (founder)</h3>
    <ul>
      <li><b>Drawcord:</b> renders show none (recommended: keeps the silk hood clean, no eyelets through the lining). Alternative: flat cotton drawcord with metal aglets and eyelets in the shell only.</li>
      <li><b>Silk lining color:</b> one color for all colorways (black, or natural ivory as a reveal) keeps silk minimums low.</li>
      <li><b>Front wordmark:</b> final brand artwork pending trademark clearance.</li>
      <li><b>Order quantity per color/size:</b> to follow sample approval.</li>
    </ul>
  </div>
</div>`));

pages.push(page("Questions for the Factory & Quote Request", 9, `
<div class="grid2 top">
  <div>
    <h3>Please confirm</h3>
    <ol class="steps">
      <li>Can you source 22-momme Mulberry silk charmeuse, or should we supply it? If we supply, how many meters per 50 / 100 pieces, including waste?</li>
      <li>Have you sewn silk linings into heavyweight cotton garments before? Please share photos.</li>
      <li>Do you agree with the build sequence (wash the shell first, then attach the silk), or do you recommend a better method?</li>
      <li>Which chrome-effect print technique do you recommend for the wordmark and monogram, and how durable is it after washing?</li>
      <li>Which fabric from your library is closest to the shell spec? Please send a swatch.</li>
    </ol>
  </div>
  <div>
    <h3>Please quote</h3>
    <table class="kv tight">
      <tr><th>Development</th><td>Pattern + proto sample (size M, Black), cost and lead time</td></tr>
      <tr><th>Unit price</th><td>At your MOQ, and at 2× MOQ, FOB / EXW, incl. trims, labels and packaging (list packaging separately)</td></tr>
      <tr><th>MOQ</th><td>Per style, per colorway, and whether sizes can be split within a colorway</td></tr>
      <tr><th>Lead times</th><td>Sample, PP and bulk, from approval</td></tr>
      <tr><th>Payment terms</th><td>Deposit / balance structure</td></tr>
      <tr><th>Shipping</th><td>Incoterms offered, estimated freight to the USA</td></tr>
    </table>
    <p class="note" style="margin-top:18px">Thank you. We are building a long-term premium brand and value craftsmanship, communication and consistency over lowest cost.<br><br><b>Ethan Johnston</b>, Founder &amp; Creative Director<br>info@mulberryempire.com</p>
  </div>
</div>`));

const css = `
@page { size: A4 landscape; margin: 0; }
* { box-sizing: border-box; }
body { margin: 0; font-family: Helvetica, Arial, sans-serif; color: #111; font-size: 10.5px; line-height: 1.45; background: #e9e5dd; }
.page { width: 297mm; height: 210mm; background: #fff; margin: 0 auto 12px; padding: 12mm 14mm 10mm; position: relative; overflow: hidden; page-break-after: always; display: flex; flex-direction: column; }
@media print { body { background: #fff; } .page { margin: 0; } }
.ph { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1.5px solid #111; padding-bottom: 6px; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
.ph .brand { font-family: Georgia, serif; letter-spacing: 3px; }
.ph .sep { margin: 0 10px; color: #876435; }
.ph .meta { font-size: 8.5px; font-weight: normal; letter-spacing: .5px; color: #555; text-transform: none; }
.pb { flex: 1; padding-top: 10px; min-height: 0; }
.pf { font-size: 7.5px; color: #777; border-top: 1px solid #ddd; padding-top: 4px; }
h1 { font-family: Georgia, serif; font-weight: normal; font-size: 38px; margin: 6px 0 4px; }
h3 { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #876435; margin: 8px 0 6px; }
.eyebrow { text-transform: uppercase; letter-spacing: 3px; color: #876435; font-size: 10px; margin: 0; }
.sub { color: #555; font-size: 12px; margin: 0 0 14px; }
.cover { flex-direction: row; gap: 10mm; }
.cover-l { flex: 1.1; } .cover-r { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; align-content: start; }
.cover-r img { width: 100%; border: 1px solid #eee; }
.cap { grid-column: 1 / -1; font-size: 8.5px; color: #666; margin: 2px 0 0; }
table { border-collapse: collapse; width: 100%; }
.kv th { text-align: left; width: 32%; color: #555; font-weight: normal; padding: 3.5px 8px 3.5px 0; border-bottom: 1px solid #eee; vertical-align: top; }
.kv td { padding: 3.5px 0; border-bottom: 1px solid #eee; }
.kv.tight th, .kv.tight td { padding: 2.5px 6px 2.5px 0; }
.alert { margin-top: 12px; border-left: 3px solid #876435; background: #faf6ee; padding: 8px 12px; }
.alert ol { margin: 4px 0 0; padding-left: 16px; } .alert li { margin: 3px 0; }
.tbc { display: inline-block; background: #fff3cd; color: #7a5b00; border: 1px solid #e8d48a; padding: 0 4px; font-size: 8.5px; font-weight: bold; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; } .grid2.top { align-items: start; }
.grid2 svg { width: 100%; height: 100mm; }
.legend td { padding: 2px 6px; vertical-align: top; font-size: 9.5px; border-bottom: 1px solid #f0f0f0; }
.legend td:nth-child(odd) { width: 18px; color: #876435; }
.bom th, .spec th { background: #111; color: #fff; text-align: left; padding: 4px 6px; font-size: 9px; text-transform: uppercase; letter-spacing: .5px; }
.bom td { padding: 4px 6px; border-bottom: 1px solid #e5e5e5; vertical-align: top; font-size: 9.3px; }
.bom td:first-child { color: #876435; font-weight: bold; }
.grid-ms { display: grid; grid-template-columns: 0.8fr 1.4fr; gap: 6mm; align-items: start; }
.grid-ms svg { width: 100%; height: 118mm; }
.spec td { padding: 3px 5px; border-bottom: 1px solid #e5e5e5; font-size: 9px; }
.spec .c { text-align: center; } .spec .base { background: #faf3e3; font-weight: bold; }
.spec th.base { background: #876435; }
.muted { color: #666; }
.note { font-size: 9px; color: #555; margin-top: 8px; }
.art { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6mm; }
.art img { width: 100%; height: 62mm; object-fit: contain; background: #f6f6f6; border: 1px solid #eee; }
figure { margin: 0; } figcaption { font-size: 9px; margin-top: 5px; line-height: 1.5; }
.colors { display: grid; grid-template-columns: repeat(5, 1fr); gap: 4mm; }
.colors img { width: 100%; height: 42mm; object-fit: contain; border: 1px solid #eee; }
.sw { display: inline-block; width: 10px; height: 10px; border: 1px solid #ccc; vertical-align: -1px; margin-right: 4px; }
.label { font-family: "Courier New", monospace; font-size: 9px; border: 1px dashed #999; padding: 8px 10px; background: #fcfcfc; width: 80%; }
ul, ol.steps { margin: 0; padding-left: 16px; } ul li, ol.steps li { margin: 3px 0; }
`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sovereign Hoodie Tech Pack (${STYLE})</title><style>${css}</style></head><body>${pages.join("\n")}</body></html>`;

const outHtml = path.join(dir, `Mulberry-Empire_${STYLE}_Tech-Pack.html`);
fs.writeFileSync(outHtml, html);
console.log("wrote", outHtml);

const { chromium } = await import(path.join(dir, "../../node_modules/playwright/index.mjs"));
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const p = await browser.newPage();
await p.goto("file://" + outHtml);
await p.pdf({ path: outHtml.replace(/\.html$/, ".pdf"), format: "A4", landscape: true, printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log("wrote PDF");
