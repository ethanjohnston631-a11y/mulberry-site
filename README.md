# Mulberry Empire

Premium luxury-brand e-commerce site for The Sovereign Hoodie — a flagship hoodie lined in Mulberry silk. Next.js App Router, Tailwind, Framer Motion, Stripe Checkout.

## Recommended Photography & Asset Shoot List

Every `ImagePlaceholder` component on the site is labeled "Recommended Asset" with a caption describing exactly what should replace it. Priority order for a future shoot:

1. **Hero / lifestyle** — model wearing The Sovereign, cinematic lighting, used on homepage hero and Our Story hero.
2. **Macro fabric photography** — close-up of the 490gsm fleece weave (exterior) and the 22-momme silk lining (hood interior) — used on the product page "Material Story" section and homepage "Materials" section.
3. **Silk filament macro** — extreme close-up of raw silk fiber/thread, used on the Why Silk hero.
4. **Silkworm & cocoon imagery** — used to reinforce brand origin (could appear on Why Silk or History pages).
5. **Ancient sericulture illustration** — historical/illustrative, used on the History page timeline (Ancient China, Han/Tang dynasties).
6. **Silk Road map or caravan illustration** — used on the homepage Heritage section and History hero.
7. **Royal court silk garment (historical)** — reinforces the "fabric of emperors" timeline entry.
8. **Care guide visual instructions** — 5 images, one per care step (washing, drying, storage, maintenance, longevity).
9. **Editorial / journal photography** — 3+ images for Journal article cards.
10. **Founder portrait or studio imagery** — Our Story hero, reinforces the founder-driven narrative.

All placeholders are built with the brand's ink/gold palette and the silkworm watermark so the site reads as intentional, not broken, until real photography is dropped in — simply swap the `<Image>` `src` in each `ImagePlaceholder` usage (or replace the component instance directly) once assets are ready.

## Setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

- `STRIPE_SECRET_KEY` — from the Stripe dashboard (use a test key first: `sk_test_...`)
- `NEXT_PUBLIC_SITE_URL` — your deployed domain, e.g. `https://mulberry.com` (used for Stripe redirect URLs)

```bash
npm run dev
```

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the same env vars (`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_SITE_URL`) in Vercel project settings.
4. Deploy.

Checkout uses Stripe's hosted Checkout in one-time payment mode — no Stripe Products need to be pre-created; line items are generated dynamically from the cart.
