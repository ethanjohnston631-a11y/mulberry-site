# Mulberry Empire: Launch Plan

*Written 2 Oct 2026. Starting cash: about $1,700. Goal: a real, legally sound premium brand without betting
everything on one production order.*

## The principle
**Don't pay for inventory with your own money. Prove demand first, then let customers fund production through
pre-orders.** With $1,700 you can't fund a 50 to 150 piece run, and you shouldn't try. What you can fund is the
proof that makes the run inevitable: a real prototype, a real factory sample and a real waitlist.

---

## Step 0: Trademark (before anything else; week 1)
**This is the biggest risk in the business, ahead of money, factories or the website.**

Mulberry Company (Design) Ltd, the British luxury house, holds a **live US trademark registration for MULBERRY
covering clothing** (USPTO serial no. 79136966, class 25: t-shirts, tops, sweaters, jackets, sports
clothing and more). A hoodie with "MULBERRY" across the chest, sold as luxury apparel, is very likely to draw a
cease-and-desist letter, and potentially a lawsuit, demands for your inventory to be destroyed and a forced rebrand
*after* you've paid for labels, prints and stock.

What to do:
1. **Book a trademark attorney consultation now.** Many offer a free or low-cost first consult. Ask: "Can I use
   MULBERRY or MULBERRY EMPIRE for apparel in the US, given registration 79136966?"
2. **Prepare for the likely answer**, which is to lead with a distinct mark. Options to discuss: a new name; a
   coined word that keeps the silk story; or keeping "Mulberry silk" purely as a *material description*
   ("lined in Mulberry silk" is a fiber description, not a brand) while the brand on the chest is something you own.
3. **Once cleared, file your own US application** (USPTO base fee is about $350 per class, class 25). This protects
   the brand you build.
4. **Until then:** don't order branded labels, hang tags, printed packaging or bulk prints. The tech pack already
   marks the wordmark as "brand sign-off required". Sampling for fit, silk construction and quality is fine.

The site is currently in **waitlist mode**, which means no sales, and that keeps exposure low while this is resolved.

## Step 1: Business basics (week 1, mostly free)
- **LLC** in your state (fees vary by state) to separate your personal assets from the business.
- **EIN** from the IRS (free), a **business bank account**, and make sure Stripe is in the business's name.
- **Sales tax permit** in your home state (free in most states) before taking any payment, then turn on
  `STRIPE_AUTOMATIC_TAX` after activating Stripe Tax.

## Step 2: Prototype it yourself (weeks 1–4, roughly $200–400)
- Buy **one premium heavyweight blank** (CFB's webshop has no minimum; ASBX sells website samples).
- Buy **about 1 meter of 22-momme Mulberry silk charmeuse** from a silk supplier.
- Pay a **local tailor or alterations shop** to line the hood following page 4 of the tech pack.
- Result: a real Sovereign you can wear-test, wash-test and **photograph**. Prompt P-01 in
  `docs/IMAGE-PROMPTS.md` shows the shot to recreate for real.

## Step 3: Get factory quotes (in progress; inquiries sent 12 Oct 2026)
All inquiries link to the tech pack Google Doc (`1UPHHLMMUPC9zv4358Iwdi3xCs-QWpfbdEbFkjRxNHGM`). It's shared
view-only with the Portugal and US factories; the China factories received the specs in the email body.

| Factory | Where | Minimum (published) | Status |
|---|---|---|---|
| ASBX | Barcelos, PT | 100, or 50 with a surcharge | Reply sent in thread, 12 Oct |
| Create Fashion Brand | Barcelos, PT | 150 cut & sew; 50 custom blanks; 1-pc blanks and Sample Room | Reply sent; auto-ack, 24–72h review |
| White Cotton | Barcelos, PT | 50 per style | Inquiry sent 12 Oct |
| Labwear Studios | Portugal | 50 per style | Inquiry sent 12 Oct |
| Plucky Reach | Los Angeles | from 50; hood lining listed | Asked for written ballpark before a discovery call |
| Full Speed 100 | Los Angeles | 50–100 basic hoodies | Inquiry sent 12 Oct (blank-mod + cut & sew) |
| Groovecolor | Dongguan, CN | 50–100 per color; makes satin-lined hoodies | Inquiry sent 12 Oct (silk + satin quote) |
| INNBLAC | Zhejiang, CN | n/a; satin-lined specialist | Inquiry sent 12 Oct |
| DOCSUN | Guangzhou, CN | n/a; mulberry silk OEM | Asked to make the hoodie or supply silk panels |
| BOMME Studio | n/a | n/a | Follow-up sent 12 Oct |
| Taha Group | n/a | n/a | Bounced (inbox full), dropped |

**Fastest route to wearable hoodies:** a premium blank (Los Angeles Apparel HF09 garment dye, 14 oz, about
$50 in bulk) plus the silk hood lining and embroidery added by an LA contractor. The real silk adds only about
$5–12 per piece (22-momme charmeuse is about $11–25 a yard, about half a yard per hood). Skip Comfort Colors
1567: at 9.5 oz with 20% polyester, it's too light for a $248 piece.

Choose on: **silk competence** (can they show linings?), communication speed, sample cost, and payment terms.
ASBX leads today on responsiveness and fit.

Pay for **one development sample** from the winner (budget about $250–600, which is typical; the real figure comes
from their quote). This sample becomes your hero photos and your quality benchmark.

## Step 4: Build the waitlist (weeks 2–12, close to $0)
- The site already captures waitlist signups with color and size interest, stored in Resend.
- Post the prototype process on Instagram (@mulberry.hoods): silk sourcing, the tailor, the wash test, the first
  wear. Build-in-public content converts for founder brands.
- **Target: 200 or more waitlist emails before opening pre-orders.** Only a fraction of a waitlist buys, so you
  need a deep list to fill a 50-piece run. Treat the number of pre-orders in the first week as your real signal.

## Step 5: Launch ONE colorway as a pre-order (around month 3–4)
- **One color, one style.** Five colors × a 50-piece minimum = 250+ pieces. One color = 50. Pick the color your
  waitlist votes for (the data is in each signup).
- Set the ship estimate to the factory lead time **plus 3–4 weeks of buffer**.
- Switch the site: `NEXT_PUBLIC_STORE_MODE=preorder` and `NEXT_PUBLIC_PREORDER_SHIP_ESTIMATE="<month year>"`.
  The legal wording (ship window, cancel any time for a full refund) is already built in.
- Pay the factory deposit from pre-order revenue. **Never place the bulk order before deposits cover it.**
- Unit economics to aim for: total landed cost (garment + silk + shipping + duties + packaging) at or below
  roughly **30% of the $248 retail price**. If the quotes come in higher, rethink the price or the spec before
  launching.

## Step 6: Deliver, then grow (month 5+)
- Communicate during production (photos from the factory), ship on time, and collect reviews and wear photos.
- Switch to `live` for remaining stock. Add colorways one at a time, funded by the previous run.
- Only expand shipping beyond the US after you've looked at VAT/GST registration for those countries.

---

## Your $1,700, allocated
| Item | Estimate |
|---|---|
| Trademark consult (often free) + filing once cleared | $0–350 |
| Prototype: blank + silk + tailor | $200–400 |
| Factory development sample + shipping | $300–650 |
| LLC + sales tax permit | depends on state |
| Reserve (Upstash and Resend are free tiers; domain renewal; surprises) | remainder |

These are typical ranges, not quotes. The factory replies will give you real numbers.

---

## Website switches (Vercel → Project → Settings → Environment Variables)
| When | Set |
|---|---|
| Now | Add Upstash for Redis (Vercel → Storage, free tier). It turns on customer accounts |
| Pre-order launch | `NEXT_PUBLIC_STORE_MODE=preorder`, `NEXT_PUBLIC_PREORDER_SHIP_ESTIMATE`, `NEXT_PUBLIC_COUNTRY_OF_ORIGIN` |
| Before first sale | Stripe Tax on, then `STRIPE_AUTOMATIC_TAX=true`; Stripe webhook, then `STRIPE_WEBHOOK_SECRET` |
| Optional | `NEXT_PUBLIC_BUSINESS_ADDRESS`, `NEXT_PUBLIC_GOVERNING_STATE` (shown in the legal pages) |

**Note:** the legal pages were written to current US e-commerce standards (FTC Mail Order Rule, CCPA and state
privacy laws, CAN-SPAM, ADA/WCAG) but they are not a substitute for a lawyer. Ask the trademark attorney to give
them a quick look in the same consult.
