# Mulberry — Group A Gemini Prompts
**Last updated:** 2026-06-27
**Rule:** Every prompt here must have a corresponding entry in `/assets/manifest.md`.
**Rule:** Never generate a prompt without updating both files.

---

## Global Brand Style Reference

Apply this block to every prompt without exception. It is not optional — it is the brand's visual law.

```
GLOBAL STYLE — MULBERRY (apply to every image)

COLOR PALETTE
  Dominant: Ink black #0b0b0c — fills the majority of frame
  Secondary: Bone #f4efe6 — appears only in light zones
  Accent: Champagne gold #cdab78 — warm practical light source, isolated highlights
  Prohibited: Any saturated color, any vivid tone, any primary color

MOOD
  Quiet luxury. Nothing performed. Nothing aspirational in a conventional sense.
  The garment belongs to someone who has already decided — not someone who is trying.

LIGHTING
  Moody cinematic. Single directional source only.
  No fill light. No bounce. No softboxes.
  Rich, absolute ink blacks in shadow zones.
  Warm champagne gold in the light source itself.
  Light quantity: minimal. Shadow quantity: generous.

FILM AESTHETIC
  Medium-format analog film look.
  Kodak Portra 800 — visible natural grain, warm midtones, slight highlight halation.
  Shot as if on Hasselblad 500CM or Mamiya RZ67.
  No digital sharpness, no HDR, no overprocessed look.

COMPOSITION
  Minimal. Deliberate. Nothing incidental in frame.
  Generous negative space. Subject never fills the frame completely.
  Asymmetric. No centered, symmetrical compositions.

ABSOLUTE PROHIBITIONS
  No logos of any kind
  No text or typography
  No brand marks or labels visible
  No bright or saturated color
  No fashion-ad smiles or posed expressions
  No streetwear props (sneakers prominent, skateboards, caps)
  No studio-white backgrounds
  No busy, cluttered environments

REFERENCE DIRECTORS / CAMPAIGNS
  Helmut Lang SS99 campaign
  Lemaire AW22 lookbook
  Our Legacy visual identity
  Craig Green S/S environmental imagery
  Peter Lindbergh black-and-white portraiture
  Robert Frank photography
```

---

## A-01 — Homepage Hero Background

**File:** `/public/hero-homepage.jpg`
**Aspect Ratio:** 16:9 (minimum 1920 × 1080 px)
**Used in:** `app/page.tsx` — hero section (add `<Image fill priority>`)
**Variation note:** Full-bleed landscape. A browser-side gradient `from-black/85 via-black/20 to-black/10` darkens the bottom half. Keep the top two-thirds relatively uncluttered — text overlay lives at the bottom.

```
PROMPT — A-01 HOMEPAGE HERO

Editorial fashion photograph. Wide landscape format, 16:9. A lone figure wearing an oversized, heavyweight dark hoodie — hood up, face partially obscured or turned away — stands alone in a vast, stripped-down urban environment: a raw concrete underpass, a deserted rooftop at last light, or a long industrial corridor receding into darkness. The figure occupies the lower-left or lower-center third of the frame. The top half of the image is open negative space — ceiling, sky, or concrete wall — with minimal detail.

LIGHTING: A single dramatic light source from one side — a sodium vapor streetlight, a distant window, or a slit of architectural light. The light cuts across the scene at an angle. The far side of the scene falls into near-absolute darkness. No fill light anywhere. Blacks are rich and absolute. The light-struck edge of the hoodie catches a warm champagne-gold tone (#cdab78).

COLOR: Near-monochrome. Ink black (#0b0b0c) dominates. Bone white (#f4efe6) appears only in the most light-struck zones. Champagne gold (#cdab78) in the practical light source and on the lit edge of the garment. No other color.

FILM: Kodak Portra 800. Visible grain throughout. Slight halation in the light source. Shot as if on Hasselblad 500CM. Deep, compressed shadows.

COMPOSITION: Landscape 16:9. Generous negative space above the figure — the top half of the frame must remain uncluttered (a gradient overlay will sit here in-browser). Figure small relative to the space — the environment is the subject as much as the person.

APPLY GLOBAL STYLE REFERENCE. No logos. No text. No bright colors.

Inspiration: Helmut Lang SS99 campaign, Craig Green AW18, Peter Lindbergh environmental portraits.
```

---

## A-02 — Our Story Hero Background

**File:** `/public/our-story-hero.jpg`
**Aspect Ratio:** 16:9 (minimum 1920 × 1080 px)
**Used in:** `app/our-story/page.tsx` — hero section (add `<Image fill priority className="opacity-40">`)
**Variation note:** Image renders at 40% opacity behind `bg-ink`. Choose a scene with enough tonal range to read through the overlay — avoid images that are already very dark overall.

```
PROMPT — A-02 OUR STORY HERO

Editorial fashion photograph. Wide landscape format, 16:9. An intimate, private environment — the interior world of someone who makes things deliberately. Options: a figure at a workbench with a heavy dark garment laid out, back to camera, examining the construction by raking window light; or an empty room with a single draped garment hanging near a tall window, morning light entering from one side; or hands — close but not macro — adjusting the shoulder of a heavy hoodie with careful precision.

The mood is private labor, not commercial display. This is what care looks like before anyone sees it.

LIGHTING: Available light only. Early morning window light or a single pendant. Soft but directional — not flat. Tonal range should be in the mid-to-high key, since the image will be overlaid at 40% opacity on a dark background. Keep the image relatively luminous — bone and linen tones should be visible.

COLOR: Bone and warm linen tones dominate (#f4efe6, #ece3d0). Dark garment as the subject. Warm wood, aged surface tones in the environment. No vivid color.

FILM: Kodak Portra 400. Slightly flat. Muted. 35mm or medium-format. Grain present but fine.

COMPOSITION: Landscape 16:9. Subject occupies one half of the frame. The other half is environment — a wall, a window, a worn surface. The bottom third will be covered by text overlay in-browser.

APPLY GLOBAL STYLE REFERENCE. No logos. No text.

Inspiration: Lemaire SS23 campaign, Todd Hido interior photography, Nan Goldin intimate portraiture.
```

---

## A-03 — Product Lifestyle Shot 01

**File:** `/public/lifestyle/lifestyle-product-01.jpg`
**Aspect Ratio:** 3:4 (portrait)
**Used in:** `app/products/[slug]/page.tsx` — lifestyle imagery section, slot 1 (replace `EditorialQuote`)
**Variation note:** First of two product lifestyle images. Show the garment worn and inhabited — not posed, not symmetrical. This is the "lived-in" shot.

```
PROMPT — A-03 PRODUCT LIFESTYLE 01

Editorial fashion photograph. Portrait orientation, 3:4. A figure wearing an oversized, heavyweight dark hoodie — hood down, relaxed at the shoulders, fabric settled into its natural drape. The setting is intimate and incidental: a cafe corner, the passenger seat of a car at night, a hotel room with one lamp on, a concrete stairwell. The figure is doing something — reading, looking out, waiting. Not posing. Not aware of the camera.

GARMENT DETAIL: The hoodie's weight and drape must be legible. The fabric hangs with substance. The washed texture of the fleece surface reads in the light. This is the material story told through real wear.

LIGHTING: A single practical ambient light source — a table lamp, a streetlight through a window, a fluorescent tube in a corridor. One warm zone, the rest shadow. No studio light. The light catches the surface texture of the fleece.

COLOR: Ink black to deep charcoal for the garment. Bone or warm cream in the environment. Near-monochrome overall. A whisper of champagne gold where the light catches the hoodie.

FILM: Kodak Portra 800. Shot at f/2.8 — some background softness, but the garment texture is sharp. Grain throughout. Warm midtones.

COMPOSITION: Portrait 3:4. Three-quarter or half-body. Subject fills 60–70% of frame. Natural posture — weight on one side, nothing held artificially. Asymmetric.

APPLY GLOBAL STYLE REFERENCE. No logos. No accessories that dominate. No clean-white-studio backgrounds.

Inspiration: Helmut Lang advertising photography, Our Legacy lookbook, Issey Miyake worn-garment photography.
```

---

## A-04 — Product Lifestyle Shot 02

**File:** `/public/lifestyle/lifestyle-product-02.jpg`
**Aspect Ratio:** 3:4 (portrait)
**Used in:** `app/products/[slug]/page.tsx` — lifestyle imagery section, slot 3 (replace `EditorialQuote`)
**Variation note:** Second lifestyle image. Should be tonally cooler and more environmental than A-03 — different visual register from the same campaign. Either a detail macro or a wide environmental with figure from behind.

```
PROMPT — A-04 PRODUCT LIFESTYLE 02

Editorial fashion photograph. Portrait orientation, 3:4. Either: (A) A tight detail crop of the hoodie fabric — the front panel, the kangaroo pocket opening, or the cuff — close enough to read the fleece structure but wide enough to understand the garment. OR (B) A figure from behind, hood up, standing in an open outdoor environment — an overcast beach, a fog-heavy morning street, an empty parking structure — occupying the lower third of the frame, the rest all grey atmosphere.

The mood is the end of something — not melancholic, but settled. This garment has been worn. It belongs.

LIGHTING: (A) Overcast diffused light — soft, flat, showing texture without drama. OR (B) Flat grey ambient — overcast day, diffused sky as light source. Cooler and quieter than A-03.

COLOR: Cooler than A-03. Deep charcoal to near-black garment. Grey, fog, and pale bone in the environment. The image should sit at the cooler end of the bone-to-ink palette range.

FILM: Kodak Portra 400 in overcast — flatter, finer grain, slightly cooler than Portra 800. Slightly underexposed. The image is quieter and more recessive than A-03.

COMPOSITION: Portrait 3:4. Either tightly cropped on fabric (texture fills 80% of frame) or figure in the lower third with atmospheric negative space above. Nothing in between.

APPLY GLOBAL STYLE REFERENCE. No logos. No posed stance. No bright sunlight. No accessories.

Inspiration: Craig Green environmental photography, Raf Simons AW02 lookbook, Wolfgang Tillmans casual fashion documentation.
```

---

## A-05 — Fleece Weave Macro

**File:** `/public/textures/texture-fleece-weave.jpg`
**Aspect Ratio:** 4:5 (portrait)
**Used in:** `app/page.tsx:166` (Materials section, slot 1) · `app/products/[slug]/page.tsx:107` (Fabric Macro section) — replace `<FleeceWeaveArt />`
**Variation note:** Pure material study. No environment, no figure. The fabric is the entire image.

```
PROMPT — A-05 TEXTURE: FLEECE WEAVE MACRO

Extreme close-up macro photograph of heavyweight washed cotton fleece fabric. Portrait orientation, 4:5. The shot is so close that the individual loops and nap of the terry or fleece pile structure are identifiable as distinct elements. The fabric reads as dense, substantial, and aged by washing — this is not a smooth, synthetic fleece. The wash has given it a slightly irregular surface with natural variation in the fiber density.

LIGHTING: Raking directional light from one side, positioned at a very low angle to the fabric surface (approximately 15–20 degrees). The light casts micro-shadows across the fleece loops and pile, revealing the three-dimensional structure of the weave. One side of the image is catching the light; the other falls into shadow. No flat, even lighting.

COLOR: The fabric is deep charcoal to near-ink black (#1c1b18 range). The light-struck fibers catch warm bone highlights (#f4efe6). Shadow zones fall into absolute black (#0b0b0c). The image is near-monochromatic with a warm tonal bias.

FILM: Shot on a 100mm macro lens at f/4–f/5.6. Sharpest in the center plane, falling off slightly at the extreme edges. Kodak Portra 800 look — grain visible, warm, slightly compressed dynamic range.

COMPOSITION: Portrait 4:5. The fabric fills the entire frame. No environment visible. No edges of the garment. No background. The texture IS the composition. The plane of focus runs diagonally across the mid-third of the frame.

APPLY GLOBAL STYLE REFERENCE. No labels. No garment edges. No stitching unless it occurs naturally. No bright colors.

Inspiration: Karl Blossfeldt macro photography, System Magazine fabric editorial, Dries Van Noten textile photography.
```

---

## A-06 — Silk Sheen Macro

**File:** `/public/textures/texture-silk-sheen.jpg`
**Aspect Ratio:** 4:5 (portrait)
**Used in:** `app/page.tsx:171` (Materials section, slot 2) · `app/why-silk/page.tsx:41` (Why Silk page hero fill) — replace `<SilkSheenArt />`
**Variation note:** The luster of silk cannot be simulated in SVG with conviction. This image is the material argument. It must be visually extraordinary.

```
PROMPT — A-06 TEXTURE: SILK SHEEN MACRO

Extreme close-up macro photograph of 22-momme Mulberry silk fabric. Portrait orientation, 4:5. The silk exhibits its natural luster — the characteristic traveling sheen of woven silk that shifts as light moves across the warp-and-weft structure. The fabric is champagne gold to warm ivory in tone (#cdab78 to #f4efe6), chosen specifically to show the luster at maximum visibility.

LIGHTING: Precisely angled directional light at approximately 30 degrees to the fabric surface, from one side. One half of the image catches the luster beautifully — a glowing, liquid-surface quality. The other half falls into warm amber shadow. This contrast — between the lit luster and the rich shadow — is the entire point of the image. The viewer should immediately understand why this material costs what it costs.

COLOR: Champagne gold (#cdab78) in the light zones. Warm amber-brown (#8a6235) in the shadow zones. No cool tones. No ink black — this image is the warm end of the palette, the precious end. It exists in contrast to the dark images elsewhere in the campaign.

FILM: Technical still-life precision. Tack sharp across the center plane at f/5.6–f/8. Medium-format look. The detail of the individual silk threads and their sheen should be legible. Subtle grain — this is a luxury product photograph, not a documentary snap.

COMPOSITION: Portrait 4:5. The silk fills the entire frame. The diagonal of the sheen — the line where light meets shadow — runs from the lower-left to the upper-right, creating compositional movement. No environment.

APPLY GLOBAL STYLE REFERENCE. No labels. No other materials. No stitching. No jewelry or props.

Inspiration: Nick Knight textile editorial, Loro Piana material photography, still-life fabric photography for Vogue Italia.
```

---

## A-07 — Stitch Detail Macro

**File:** `/public/textures/texture-stitch-detail.jpg`
**Aspect Ratio:** 4:5 (portrait)
**Used in:** `app/page.tsx:176` (Materials section, slot 3) — replace `<StitchDetailArt />`
**Variation note:** Construction documentation elevated to editorial art. The seam must look precise and intentional.

```
PROMPT — A-07 TEXTURE: STITCH DETAIL MACRO

Extreme close-up macro photograph of double-needle stitching on a dark heavyweight cotton garment. Portrait orientation, 4:5. The shot focuses on a seam or edge — a side seam, the top edge of a kangaroo pocket, or a cuff hem — showing the two parallel needle lines of double-needle construction. The thread is a near-matching dark tone (deep charcoal on charcoal fleece, or a very slightly warmer dark thread on near-black fleece), but the parallel lines are clearly legible.

LIGHTING: Raking directional light at an extreme low angle (approximately 15 degrees to the fabric surface). The raised thread of each stitch casts a micro-shadow on the fleece surface, making the construction appear topographic — almost architectural. The stitches look structural, not decorative.

COLOR: The fabric is deep charcoal to ink black. The thread catches a marginally warmer tone in the raking light. The image lives in the darkest register of the brand palette. It is a night photograph of a detail.

FILM: Macro lens at f/4. Grain present — pushed Kodak Portra 800 in post. The image should feel aged, precise, and slightly severe. Sharp on the stitching plane, falling off to soft blur at the fabric surface edges.

COMPOSITION: Portrait 4:5. The parallel stitch lines run at a slight diagonal — not horizontal. The seam occupies the center of the frame. Equal amounts of fabric texture on either side of the seam.

APPLY GLOBAL STYLE REFERENCE. No labels. No environment. No bright zones.

Inspiration: Anders Petersen grain work applied to still life, craft documentary photography, Acne Studios material photography.
```

---

## A-08 — Journal Thumbnail: Wardrobe Article

**File:** `/public/journal/journal-wardrobe.jpg`
**Aspect Ratio:** 4:5 (portrait)
**Used in:** `app/journal/page.tsx` — card 1, article "On Building a Wardrobe That Respects Your Time" — replace `<JournalIcon type="wardrobe" />`
**Variation note:** Should evoke curation and deliberate reduction. The fewer items in frame, the better.

```
PROMPT — A-08 JOURNAL: WARDROBE

Editorial still-life photograph. Portrait orientation, 4:5. A small section of a wardrobe rail — 3 to 5 dark garments hanging close together. All garments are tonal: black, deep charcoal, dark olive, warm brown. Nothing bright, nothing patterned. The hangers are wooden or raw iron. The background is a white plaster wall or rough concrete, receding into shadow on one side. The composition conveys that someone has removed everything that didn't belong.

LIGHTING: A shaft of directional light from one side — morning window light or a single overhead pendant — illuminates the center garment or two. Garments at the edges fall into shadow. The ones in light show fabric texture. The ones in shadow are silhouettes.

COLOR: Near-monochrome. Dark garments from ink black to deep charcoal to warm brown. Off-white or rough plaster wall behind. No color garments. No patterned fabrics.

FILM: 35mm. Slightly underexposed. Grain present. Shot at f/4 — center garments sharp, edges soft.

COMPOSITION: Portrait 4:5. The rail occupies the upper two-thirds. The lower third is the draped hem of the garments — falling weight, gravity. Negative space in the top-left or top-right corner.

APPLY GLOBAL STYLE REFERENCE. No logos on garments. No plastic hangers. No retail-store aesthetic. No people.

Inspiration: Christophe Lemaire's personal wardrobe, Japanese fashion editorial minimal wardrobe, A$AP Rocky wardrobe documentation.
```

---

## A-09 — Journal Thumbnail: Silk Grade Article

**File:** `/public/journal/journal-silk-grade.jpg`
**Aspect Ratio:** 4:5 (portrait)
**Used in:** `app/journal/page.tsx` — card 2, article "Inside the Momme: How Silk Quality Is Actually Graded" — replace `<JournalIcon type="momme" />`
**Variation note:** Should visually communicate gradation, comparison, and preciousness without any text or labels. The material speaks for itself.

```
PROMPT — A-09 JOURNAL: SILK GRADE

Editorial still-life photograph. Portrait orientation, 4:5. Multiple silk fabric swatches or folded silk pieces arranged in a precise, layered composition on a dark surface — a dark stone slab, a worn wooden workbench, or a deep charcoal linen background. The silks range from champagne gold to warm ivory to pale bone — all within the warm neutral register of the brand palette. The arrangement is considered, suggesting quality comparison and gradation — some fabrics are flatter, some catch the light with more intensity.

LIGHTING: Raking directional light from the left at a low angle. The finest silk catches the most light — its luster is greater than the others. The difference in light response between fabrics makes the gradation visible without text or labels. Shadows fall to the right. Warm light source (candlelight temperature or low-watt tungsten).

COLOR: The silks occupy the champagne gold to bone range (#cdab78 to #f4efe6). The surface they rest on is ink black or very dark charcoal. Maximum contrast between the precious fabric and the dark ground.

FILM: Technical precision — longer lens (85–100mm), f/5.6. Medium-format look. Grain is subtle. Shot as if for a watch or jewelry editorial. The fabrics should appear rare and precise.

COMPOSITION: Portrait 4:5. The swatches are fanned or layered, occupying the center 70% of the frame. The dark background is visible in the corners and upper register. Not sterile — slightly organic arrangement, as if placed by hand.

APPLY GLOBAL STYLE REFERENCE. No labels. No text. No measuring tools. No hands in frame.

Inspiration: Nick Knight material photography, Brunello Cucinelli fabric editorial, The Row campaign still life.
```

---

## A-10 — Journal Thumbnail: Discipline Article

**File:** `/public/journal/journal-discipline.jpg`
**Aspect Ratio:** 4:5 (portrait)
**Used in:** `app/journal/page.tsx` — card 3, article "Discipline Is a Material Choice" — replace `<JournalIcon type="discipline" />`
**Variation note:** Tonally the hardest, most high-contrast image in the set. Cooler and more severe than A-08 and A-09. This is the pre-dawn, before-anyone-watches image.

```
PROMPT — A-10 JOURNAL: DISCIPLINE

Editorial photograph. Portrait orientation, 4:5. A moment of pre-performance self-preparation — not athletic, but private. Options: (A) A figure from behind, alone in an empty space, before it fills with people — a weight room with all the lights on but no one else there, or a rooftop at blue hour; (B) A close crop of hands adjusting the cuffs or hem of a dark hoodie — the gesture of preparing, not performing, nothing performative or self-conscious; (C) A figure mid-movement, blurred slightly, in a pre-dawn outdoor environment — fog, rain-wet concrete, empty street.

The mood: discipline practiced when no one is watching. Self-imposed standard. Pre-dawn light.

LIGHTING: Harsh functional light — the light of labor, not flattery. Overhead fluorescent in an empty room (blue-white), or pre-dawn street ambient (blue-black), or a single cold window in early morning. No warm tones here. This is the coolest image in the Group A set.

COLOR: Blue-black to near-absolute black (#0b0b0c to cool dark grey). Cold light source (5600K–7000K equivalent). The champagne gold accent is absent in this image — no warm tones. Bone appears only as cold, grey-white light. This is a monochrome, high-contrast, cold image.

FILM: 35mm pushed to ISO 1600. High grain. High contrast. Shot handheld at f/1.8. Only the essential element in focus — the rest is atmosphere.

COMPOSITION: Portrait 4:5. Subject occupies the center or lower-center. The space above is dark and enveloping. Nothing symmetrical. Raw and immediate.

APPLY GLOBAL STYLE REFERENCE. No logos anywhere in frame (clothing, equipment, environment). No gym-brand colors. No lifestyle-ad energy.

Inspiration: Rineke Dijkstra athlete series, Wolfgang Tillmans morning light photography, early Raf Simons AW campaign stillness.
```

---

## Prompt Usage Rules

1. Copy the prompt block exactly — no paraphrasing.
2. Apply the Global Style Reference on every generation, even if the prompt does not repeat it verbatim.
3. Generate at the aspect ratio specified — do not crop post-generation unless the subject is preserved.
4. Generate minimum 2 variations per asset. Select the one that best matches the brand palette and mood.
5. After generation, update the corresponding entry in `/assets/manifest.md` — change status from `pending` to `generated`.
6. After integration into the Next.js component, update status to `integrated`.
7. Do not delete or replace a prompt after generation — keep the original prompt as a permanent record.
