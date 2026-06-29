# Mulberry Asset Manifest — Master Index
**Last updated:** 2026-06-28
**Source of truth:** This file. No asset is valid unless it appears here.

---

## Legend

| Field | Values |
|---|---|
| Type | `Group A` · `Group B` · `System` |
| Status | `pending` · `generated` · `integrated` · `orphaned` |

---

## System Assets

> Code-generated or static brand marks. No photography required.

| ID | Name | Type | File Path | Used In | Status |
|---|---|---|---|---|---|
| S-01 | Brand Logo Mark | System | `/public/logo.png` | `components/Header.tsx` · `components/Footer.tsx` · `app/page.tsx:206` · `app/our-story/page.tsx:13` | integrated |
| S-02 | OpenGraph Image | System | `app/opengraph-image.tsx` | Auto-resolved by Next.js metadata | integrated |
| S-03 | Favicon | System | `app/icon.tsx` | Auto-resolved by Next.js metadata | integrated |
| S-04 | Fleece Weave SVG Art | System | `components/TextureArt.tsx → FleeceWeaveArt` | `app/page.tsx:166` · `app/products/[slug]/page.tsx:107` | integrated |
| S-05 | Silk Sheen SVG Art | System | `components/TextureArt.tsx → SilkSheenArt` | `app/page.tsx:171` · `app/why-silk/page.tsx:41` | integrated |
| S-06 | Stitch Detail SVG Art | System | `components/TextureArt.tsx → StitchDetailArt` | `app/page.tsx:176` | integrated |
| S-07 | Silk Road Map SVG | System | `components/AncientArt.tsx → SilkRoadMapArt` | `app/page.tsx:149` · `app/history/page.tsx:57` | integrated |
| S-08 | Sericulture SVG | System | `components/AncientArt.tsx → SericultureArt` | `app/history/page.tsx:96` | integrated |
| S-09 | Royal Silk SVG | System | `components/AncientArt.tsx → RoyalSilkArt` | `app/history/page.tsx:101` | integrated |
| S-10 | Caravan SVG | System | `components/AncientArt.tsx → CaravanArt` | `app/history/page.tsx:106` | integrated |
| S-11 | Silk Lining Diagram SVG | System | `components/SilkLiningDiagram.tsx` | `app/products/[slug]/page.tsx:71` | integrated |
| S-12 | Momme Weight Diagram SVG | System | `components/MommeDiagram.tsx` | `app/why-silk/page.tsx:92` | integrated |
| S-13 | Care Icons SVG | System | `components/CareIcon.tsx` | `app/care-guide/page.tsx` (5 instances) | integrated |
| S-14 | Editorial Quote Card | System | `components/EditorialQuote.tsx` | replaced by A-03, A-04 — no longer in use | integrated |
| S-15 | Journal Icon SVGs | System | `components/JournalIcon.tsx` | replaced by A-08, A-09, A-10 — no longer in use | integrated |

---

## Group A Assets — Gemini Lifestyle Photography

> All prompts live in `/assets/group-a-prompts.md`. No prompt content in this file.

| ID | Name | Type | File Path | Used In | Aspect Ratio | Status |
|---|---|---|---|---|---|---|
| A-01 | Homepage Hero Background | Group A | `/public/hero-homepage.jpg` | `app/page.tsx` hero section — `<Image fill priority>` | 16:9 | integrated |
| A-02 | Our Story Hero Background | Group A | `/public/our-story-hero.jpg` | `app/our-story/page.tsx` hero section — `<Image fill priority opacity-40>` | 16:9 | integrated |
| A-03 | Product Lifestyle Shot 01 | Group A | `/public/lifestyle/lifestyle-product-01.jpg` | `app/products/[slug]/page.tsx` lifestyle row slot 1 — replaces `EditorialQuote` | 3:4 | integrated |
| A-04 | Product Lifestyle Shot 02 | Group A | `/public/lifestyle/lifestyle-product-02.jpg` | `app/products/[slug]/page.tsx` lifestyle row slot 3 — replaces `EditorialQuote` | 3:4 | integrated |
| A-05 | Fleece Weave Macro Photo | Group A | `/public/textures/texture-fleece-weave.jpg` | `app/page.tsx` materials · `app/products/[slug]/page.tsx` fabric macro — replaces `FleeceWeaveArt` | 4:5 | integrated |
| A-06 | Silk Sheen Macro Photo | Group A | `/public/textures/texture-silk-sheen.jpg` | `app/page.tsx` materials · `app/why-silk/page.tsx` hero — replaces `SilkSheenArt` | 4:5 | integrated |
| A-07 | Stitch Detail Macro Photo | Group A | `/public/textures/texture-stitch-detail.jpg` | `app/page.tsx` materials — replaces `StitchDetailArt` | 4:5 | integrated |
| A-08 | Journal Thumbnail — Wardrobe | Group A | `/public/journal/journal-wardrobe.jpg` | `app/journal/page.tsx` card 1 — replaces `JournalIcon` | 4:5 | integrated |
| A-09 | Journal Thumbnail — Silk Grade | Group A | `/public/journal/journal-silk-grade.jpg` | `app/journal/page.tsx` card 2 — replaces `JournalIcon` | 4:5 | integrated |
| A-10 | Journal Thumbnail — Discipline | Group A | `/public/journal/journal-discipline.jpg` | `app/journal/page.tsx` card 3 — replaces `JournalIcon` | 4:5 | integrated |

---

## Group B Assets — Manufacturing Dependent

> Specs live in `/assets/group-b-manufacturing.md`. No AI generation allowed for these assets.

| ID | Name | Type | File Path | Used In | Aspect Ratio | Status |
|---|---|---|---|---|---|---|
| B-01 | Black — Front | Group B | `/public/products/black.png` | `lib/products.ts:67` · ProductExperience · ProductCard · CartDrawer · `app/page.tsx:71` | 4:5 | integrated |
| B-02 | Black — Back | Group B | `/public/products/black-back.png` | `lib/products.ts:67` · ProductExperience (back view) | 4:5 | integrated |
| B-03 | Brown — Front | Group B | `/public/products/brown.png` | `lib/products.ts:68` · ProductExperience · ProductCard | 4:5 | integrated |
| B-04 | Brown — Back | Group B | `/public/products/brown-back.png` | `lib/products.ts:68` · ProductExperience (back view) | 4:5 | integrated |
| B-05 | Green — Front | Group B | `/public/products/green.png` | `lib/products.ts:69` · ProductExperience · ProductCard | 4:5 | integrated |
| B-06 | Green — Back | Group B | `/public/products/green-back.png` | `lib/products.ts:69` · ProductExperience (back view) | 4:5 | integrated |
| B-07 | Grey — Front | Group B | `/public/products/grey.png` | `lib/products.ts:70` · ProductExperience · ProductCard | 4:5 | integrated |
| B-08 | Grey — Back | Group B | `/public/products/grey-back.png` | `lib/products.ts:70` · ProductExperience (back view) | 4:5 | integrated |
| B-09 | Navy Blue — Front | Group B | `/public/products/navy-blue.png` | `lib/products.ts:71` · ProductExperience · ProductCard | 4:5 | integrated |
| B-10 | Navy Blue — Back | Group B | `/public/products/navy-blue-back.png` | `lib/products.ts:71` · ProductExperience (back view) | 4:5 | integrated |
| B-11 | Interior Woven Label | Group B | `/public/products/label-detail.jpg` | Product detail page — not yet wired | 3:2 | pending |
| B-12 | Chest Embroidery Detail | Group B | `/public/products/embroidery-chest.jpg` | Product detail page — not yet wired | 1:1 | pending |
| B-13 | Size Guide Chart | Group B | `/public/products/size-guide.jpg` | `components/ProductExperience.tsx:114` — "Size guide" button (not yet linked) | 16:9 | pending |

---

## Orphaned Assets

| File | Status | Action Required |
|---|---|---|
| `/public/hero.png` | orphaned | Exists in `/public/` — referenced by zero components. Audit contents: wire up as A-01 replacement or delete. |

---

## Code Changes Required (Group A integration)

Once each Group A asset is generated, apply these edits:

| Asset | File | Action |
|---|---|---|
| A-01 | `app/page.tsx` line 16 | Add `<Image src="/hero-homepage.jpg" alt="" fill priority className="object-cover object-center" />` inside hero `<section>` after opening tag |
| A-02 | `app/our-story/page.tsx` line 11 | Add `<Image src="/our-story-hero.jpg" alt="" fill priority className="object-cover object-center opacity-40" />` inside hero `<section>` after opening tag |
| A-03 | `app/products/[slug]/page.tsx` line 65 | Replace `<EditorialQuote quote="Cut oversized…" />` with `<div className="relative aspect-[3/4] overflow-hidden"><Image src="/lifestyle/lifestyle-product-01.jpg" alt="The Sovereign Hoodie" fill className="object-cover" /></div>` |
| A-04 | `app/products/[slug]/page.tsx` line 75 | Replace `<EditorialQuote quote="Every wash…" attribution="Small-Batch Finishing" />` with `<div className="relative aspect-[3/4] overflow-hidden"><Image src="/lifestyle/lifestyle-product-02.jpg" alt="The Sovereign Hoodie — detail" fill className="object-cover" /></div>` |
| A-05 | `app/page.tsx` line 166 · `app/products/[slug]/page.tsx` line 107 | Replace `<FleeceWeaveArt />` with `<Image src="/textures/texture-fleece-weave.jpg" alt="Washed cotton fleece" fill className="object-cover" />` |
| A-06 | `app/page.tsx` line 171 · `app/why-silk/page.tsx` line 41 | Replace `<SilkSheenArt />` with `<Image src="/textures/texture-silk-sheen.jpg" alt="22-momme Mulberry silk" fill className="object-cover" />` |
| A-07 | `app/page.tsx` line 176 | Replace `<StitchDetailArt />` with `<Image src="/textures/texture-stitch-detail.jpg" alt="Double-needle construction" fill className="object-cover" />` |
| A-08 | `app/journal/page.tsx` line 33 | Replace `<JournalIcon type={p.icon} />` for post 0 with `<Image src="/journal/journal-wardrobe.jpg" alt={p.t} fill className="object-cover" />` |
| A-09 | `app/journal/page.tsx` line 33 | Replace `<JournalIcon type={p.icon} />` for post 1 with `<Image src="/journal/journal-silk-grade.jpg" alt={p.t} fill className="object-cover" />` |
| A-10 | `app/journal/page.tsx` line 33 | Replace `<JournalIcon type={p.icon} />` for post 2 with `<Image src="/journal/journal-discipline.jpg" alt={p.t} fill className="object-cover" />` |

---

## Folder Structure

```
/public
├── logo.png                            S-01  ✅ integrated
├── hero.png                            —     ⚠️ orphaned
├── hero-homepage.jpg                   A-01  ✅ integrated
├── our-story-hero.jpg                  A-02  ✅ integrated
├── lifestyle/
│   ├── lifestyle-product-01.jpg        A-03  ✅ integrated
│   └── lifestyle-product-02.jpg        A-04  ✅ integrated
├── textures/
│   ├── texture-fleece-weave.jpg        A-05  ✅ integrated
│   ├── texture-silk-sheen.jpg          A-06  ✅ integrated
│   └── texture-stitch-detail.jpg       A-07  ✅ integrated
├── journal/
│   ├── journal-wardrobe.jpg            A-08  ✅ integrated
│   ├── journal-silk-grade.jpg          A-09  ✅ integrated
│   └── journal-discipline.jpg          A-10  ✅ integrated
└── products/
    ├── black.png                        B-01  ✅ integrated
    ├── black-back.png                   B-02  ✅ integrated
    ├── brown.png                        B-03  ✅ integrated
    ├── brown-back.png                   B-04  ✅ integrated
    ├── green.png                        B-05  ✅ integrated
    ├── green-back.png                   B-06  ✅ integrated
    ├── grey.png                         B-07  ✅ integrated
    ├── grey-back.png                    B-08  ✅ integrated
    ├── navy-blue.png                    B-09  ✅ integrated
    ├── navy-blue-back.png               B-10  ✅ integrated
    ├── label-detail.jpg                 B-11  ⏳ pending
    ├── embroidery-chest.jpg             B-12  ⏳ pending
    └── size-guide.jpg                   B-13  ⏳ pending
```

---

## Production Readiness Totals

| Category | Total | Resolved | Pending | Orphaned |
|---|---|---|---|---|
| System (SVG / code-gen / brand) | 15 | 15 | 0 | 0 |
| Group A (Gemini lifestyle) | 10 | 10 | 0 | 0 |
| Group B (Manufacturing) | 13 | 10 | 3 | 0 |
| Orphaned | 1 | 0 | 0 | 1 |
| **Total** | **39** | **23** | **13** | **1** |
