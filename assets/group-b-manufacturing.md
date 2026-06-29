# Mulberry — Group B Manufacturing Assets
**Last updated:** 2026-06-27
**Rule:** No AI generation permitted for any asset in this file. All assets require physical garment samples, manufacturer data, or in-person photography.
**Rule:** Every asset here must have a corresponding entry in `/assets/manifest.md`.

---

## Existing Product Colorway Images (B-01 through B-10)

All ten product images currently exist in `/public/products/` and are correctly wired.
They are documented here for completeness — no action required unless re-shoot is needed.

### Photography Specs (for reference / re-shoot)

**Subject:** The Sovereign Hoodie — physical garment sample required.
**Background:** Clean white (pure white seamless). No texture, no shadows on background.
**Lighting:** Soft studio — large octabox or strip softbox, slight shadow separation on one side to show garment dimension. No harsh shadows. No reflections on the fabric.
**Model or ghost mannequin:** Ghost mannequin preferred for front and back (invisible neck form). The hood should be down for front views; optionally hood up for one additional lifestyle shot per color if desired.
**Color accuracy:** Color-calibrate each shot to the actual fabric swatch. The swatch values in `lib/products.ts` are:

| Color | Swatch Hex | File (front) | File (back) |
|---|---|---|---|
| Black | `#19191b` | `/public/products/black.png` | `/public/products/black-back.png` |
| Brown | `#9c7e63` | `/public/products/brown.png` | `/public/products/brown-back.png` |
| Green | `#5c6b5e` | `/public/products/green.png` | `/public/products/green-back.png` |
| Grey | `#83837c` | `/public/products/grey.png` | `/public/products/grey-back.png` |
| Navy Blue | `#454f63` | `/public/products/navy-blue.png` | `/public/products/navy-blue-back.png` |

**Format:** PNG with transparent background. Minimum 2000 × 2500 px (4:5 ratio).
**Post-processing:** Remove background to transparent. No color grading. True-color render.

---

## B-11 — Interior Woven Label

**Asset ID:** B-11
**File:** `/public/products/label-detail.jpg`
**Aspect Ratio:** 3:2 (landscape — standard label proportions)
**Usage:** Product detail page — material/quality callout section (not yet wired; future addition)
**Status:** Pending — requires finished garment sample from manufacturer

### Requirements

**Subject:** The interior woven care and brand label as it appears sewn into the finished garment. Must be the actual production label — not a mockup, not a digital render.

**What the label must contain before photography:**
- Brand name: `MULBERRY` (or `MULBERRY EMPIRE`)
- Country of manufacture
- Fabric content: `SHELL: 100% COTTON FLEECE` · `LINING: 100% MULBERRY SILK (22 MOMME)`
- Care symbols: machine wash cold, gentle cycle, no bleach, lay flat to dry, no tumble dry
- Size indicator

**Photography setup:**
- Lay flat on a bone-white or off-white surface (matching `#f4efe6`)
- Macro lens. Sharp across the full label area
- Lighting: Softbox from above-left at 45 degrees. No specular hotspot on the woven text. The label's woven texture should be legible
- The label should occupy 80% of the frame. Small amount of surrounding fabric visible to establish context

**Post:** True-color. Minimal processing. The thread colors must render accurately.

**Format:** JPG. Minimum 1800 × 1200 px (3:2). sRGB color profile.

---

## B-12 — Chest Embroidery Detail

**Asset ID:** B-12
**File:** `/public/products/embroidery-chest.jpg`
**Aspect Ratio:** 1:1 (square)
**Usage:** Product detail page — construction detail section (not yet wired; future addition)
**Status:** Pending — requires finished garment sample from manufacturer

### Embroidery Specification (for manufacturer)

The product description in `lib/products.ts` lists: `"Embroidered silkworm mark on the chest"`.

The embroidery mark must be specified to the manufacturer before this asset can exist. Required decisions:

**Design:** A silkworm motif — stylized, minimal. Not literal/naturalistic. Should read cleanly at sizes from 1.5cm to 4cm diameter. Consult with embroiderer on thread count and stitch type.

**Thread color:** Metallic thread — champagne gold (#cdab78 approximate) on the dark colorways. On the Brown (#9c7e63) colorway, a tonal thread may be preferred.

**Placement:** Left chest, centered approximately 10–12cm below the collar seam.

**Size:** Approximately 3–4cm maximum dimension.

### Photography Setup

- The garment is laid flat on a white seamless surface or worn on a ghost mannequin
- Macro lens positioned directly above the embroidery, parallel to the chest panel
- Lighting: Raking light from one side (45 degrees, low) to catch thread dimension and show the embossed quality of the stitching
- The metallic thread should catch the light and read with warmth
- Frame the embroidery to fill 60% of the 1:1 frame. The surrounding fleece texture is visible context.

**Format:** JPG. Minimum 2000 × 2000 px (1:1). sRGB.

---

## B-13 — Size Guide Reference Image

**Asset ID:** B-13
**File:** `/public/products/size-guide.jpg`
**Aspect Ratio:** 16:9 (landscape — fits a panel or modal)
**Usage:** `components/ProductExperience.tsx` line 114 — "Size guide" button is currently a non-linking button; this asset will be displayed in a modal or panel when that button is wired
**Status:** Pending — requires manufacturer measurement data for all six sizes

### Size Measurement Requirements

The manufacturer must provide the following measurements for each size before this asset can be finalized:

| Measurement | XS | S | M | L | XL | XXL |
|---|---|---|---|---|---|---|
| Chest (cm) | — | — | — | — | — | — |
| Body Length (cm) | — | — | — | — | — | — |
| Sleeve Length (cm) | — | — | — | — | — | — |
| Shoulder Width (cm) | — | — | — | — | — | — |

*Fill this table with manufacturer data before producing the size guide.*

Sizing philosophy from product description: `"It's cut oversized and boxy by design. If you prefer a closer fit, size down."`

### Visual Design Spec

The size guide image should be produced as a designed asset (not AI-generated) using the brand design system:

- **Background:** Bone (`#f4efe6`)
- **Text:** Ink black (`#0b0b0c`)
- **Accent line / dividers:** Champagne gold (`#cdab78`)
- **Typeface:** Serif for the header ("Size Guide"), sans-serif for the measurement table (matching Inter from the site)
- **Illustration:** A flat-lay or ghost-mannequin outline of the hoodie with measurement arrows indicating each dimension (chest, body length, sleeve, shoulder). The outline should be simple and line-drawn — not photographic.
- **Layout:** Garment illustration left, measurement table right, or garment illustration centered with annotations.

**Format:** JPG or PNG. Minimum 1920 × 1080 px (16:9). sRGB.

---

## B-11/B-12/B-13 — Blocking Dependency

The following assets are hard-blocked on manufacturer milestones:

| Asset | Blocked On |
|---|---|
| B-11 (Label) | Woven label production complete and sewn into finished sample |
| B-12 (Embroidery) | Chest embroidery design finalized, sample stitched, and garment sample received |
| B-13 (Size Guide) | Manufacturer provides confirmed measurement specs for all 6 sizes (XS–XXL) |

Do not photograph B-11 or B-12 from pre-production samples unless confirmed identical to production spec. Label placement, thread color, and stitch quality can change between sample and production.

---

## Photography Notes — All Group B Assets

**Do not use Gemini or any AI image generation tool for any asset in this file.**

Group B assets derive their value from physical accuracy. An AI-generated product image that does not match the actual garment, label, embroidery, or sizing creates a liability — it is misleading to customers and will require re-shooting when the real product is available.

Photograph Group B assets only from finished production samples or confirmed production-identical pre-production samples.
