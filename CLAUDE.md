# Mulberry Empire: project guide

Premium apparel brand (founder: Ethan Johnston, info@mulberryempire.com). One flagship product: **The Sovereign
Hoodie**, a heavyweight garment-washed cotton hoodie with a hood lined in **22-momme Mulberry silk**, $248.
Next.js 16 App Router + Tailwind + Stripe Checkout + Resend + Upstash Redis, deployed on Vercel from `main`.

## Commands
- `npm run dev` (accounts use an in-memory store; sign-in codes print to the terminal)
- `npm run typecheck` · `npm test` (vitest) · `npm run build`
- CI (`.github/workflows/ci.yml`) runs all three on every push and PR.

## Where things live
- `lib/products.ts`: catalog. **The only source of prices**; the server rebuilds every cart line from it.
- `lib/site-config.ts`: store mode, ship estimate, origin, shipping countries, policy constants. Legal copy reads from here.
- `lib/server/*`: auth (passwordless email codes, hashed sessions), KV, email, Stripe, subscribers. Server-only.
- `app/api/*`: checkout, auth, cart, account, orders, subscribe, contact, stripe webhook.
- `docs/tech-pack/`: tech pack source (`build.mjs` → HTML + PDF). `docs/LAUNCH-PLAN.md`, `docs/IMAGE-PROMPTS.md`.

## Rules that protect the business. Don't break these
1. **Never trust the browser for prices, names or images.** Checkout only accepts slug/color/size/quantity.
2. **Store modes:** `waitlist` (default, no payment), `preorder` (requires `NEXT_PUBLIC_PREORDER_SHIP_ESTIMATE`;
   FTC Mail Order Rule), `live`. Don't add a payment path that bypasses `CHECKOUT_OPEN`.
3. **No health or medical claims** about silk (hair breakage, skin conditions, bacteria, moisture retention).
   Friction, softness and breathability are fine. Don't claim facts about manufacturing that aren't confirmed
   (country of origin, "by hand", measurements).
4. **Trademark risk:** "MULBERRY" is a registered US trademark of Mulberry Company (Design) Ltd for clothing
   (serial 79136966). Don't add new uses of "MULBERRY" as a standalone brand mark on product or packaging
   without the founder's confirmation that legal clearance is done. "Mulberry silk" as a material description is fine.
5. **Privacy:** no analytics or tracking scripts without updating the Privacy Policy and adding consent.
   Marketing email requires an explicit opt-in tick.
6. All state-changing API routes must call `isSameOrigin` and validate input; keep security headers in `next.config.js`.
7. Accessibility: labelled inputs, keyboard-operable controls, `aria-*` on toggles, WCAG AA contrast.

## Manufacturing status (Oct 2026)
Tech pack MB-SOV-001 is shared as a Google Doc (id `1UPHHLMMUPC9zv4358Iwdi3xCs-QWpfbdEbFkjRxNHGM`). Inquiries
were sent 12 Oct 2026 to ASBX, Create Fashion Brand, White Cotton, Labwear (Portugal), Plucky Reach and Full Speed
100 (LA), Groovecolor, INNBLAC and DOCSUN (China), and BOMME Studio. Plan: sample first, then about 50 pcs in one
colorway (Black), funded by pre-orders. The founder approves all payments.
