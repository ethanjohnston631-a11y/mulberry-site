# Mulberry

Premium hoodie e-commerce site. Next.js App Router, Tailwind, Framer Motion, Stripe Checkout.

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
