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
npm run dev
```

Locally, accounts work out of the box with an in-memory store, and sign-in codes are printed to the
terminal instead of emailed.

## Going live: environment variables

All variables are documented in `.env.example`. In Vercel → Project → Settings → Environment Variables:

| Variable | What it does |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe secret key. Prices are always taken from `lib/products.ts` on the server. |
| `RESEND_API_KEY` | Sends sign-in codes, order confirmations, contact form mail; stores waitlist/newsletter contacts. |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | Accounts storage. Add via Vercel → Storage → Upstash for Redis (free tier) and they are injected automatically. |
| `NEXT_PUBLIC_STORE_MODE` | `waitlist` (default, no payments), `preorder` or `live`. |
| `NEXT_PUBLIC_PREORDER_SHIP_ESTIMATE` | Required for pre-orders, e.g. `March 2027`. Must be a date you have a reasonable basis for. |
| `NEXT_PUBLIC_COUNTRY_OF_ORIGIN` | Set once the manufacturer is confirmed (e.g. `Portugal`). |
| `NEXT_PUBLIC_SHIPPING_COUNTRIES` | Defaults to `US`. |
| `STRIPE_WEBHOOK_SECRET` | Optional. Webhook endpoint `/api/stripe/webhook`, event `checkout.session.completed`, guarantees confirmation emails. |
| `STRIPE_AUTOMATIC_TAX` | `true` once Stripe Tax is activated. |
| `STRIPE_SHIPPING_RATE_IDS` | Optional comma-separated Stripe shipping rate IDs (`shr_...`). |

## Security model

- **Checkout**: the browser sends only product/color/size/quantity; names and prices are rebuilt from the catalog server-side.
- **Accounts**: passwordless email codes (6 digits, 10-minute expiry, single use, 5 attempts, rate-limited). Session
  tokens are 256-bit random values stored only as SHA-256 hashes; the cookie is `__Host-`, HttpOnly, Secure, SameSite=Lax.
  Customers can sign out everywhere, export their data and delete their account.
- **CSRF**: every state-changing endpoint rejects cross-origin requests.
- **Headers**: strict CSP, HSTS, frame-ancestors none, nosniff, Referrer-Policy, Permissions-Policy.
- **Privacy**: no analytics or tracking cookies, so no cookie banner is required.
