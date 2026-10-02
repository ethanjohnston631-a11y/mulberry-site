import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { BUSINESS, POLICY } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you use the Mulberry Empire website or place an order.",
};

const mail = <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>;
const governingLaw = BUSINESS.governingState
  ? `the laws of the State of ${BUSINESS.governingState} and applicable U.S. federal law`
  : "the laws of the U.S. state in which Mulberry Empire is organized and applicable U.S. federal law";

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement",
    body: (
      <p>
        These Terms are an agreement between you and {BUSINESS.name} (&ldquo;Mulberry,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;).
        They apply when you use this website, create an account, join our waitlist or place an order. Our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>, <Link href="/shipping">Shipping Policy</Link> and{" "}
        <Link href="/returns">Returns Policy</Link> form part of these Terms. If you don&apos;t agree, please don&apos;t use the
        site. Nothing in these Terms limits any rights you have under consumer protection laws that cannot be waived.
      </p>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility and accounts",
    body: (
      <>
        <p>You must be at least 18, or the age of majority where you live, to place an order. Younger visitors may order only with the involvement of a parent or guardian.</p>
        <p>
          Accounts use one-time codes sent to your email instead of passwords. Keep access to your email account secure.
          Anyone who can read your email can sign in to your Mulberry account. Tell us promptly at {mail} if you think your
          account has been used without permission. You can sign out of all devices or delete your account at any time
          from the <Link href="/account">Account</Link> page.
        </p>
      </>
    ),
  },
  {
    id: "products",
    title: "Products and descriptions",
    body: (
      <>
        <p>
          We try to describe and photograph every product accurately. Colors can look different on different screens, and
          because our garments are washed and finished in small batches, slight variations in shade and texture are a
          normal characteristic, not a defect.
        </p>
        <p>
          Where a product is marked as a first run, pre-order or waitlist item, images may show a pre-production sample and
          the final production piece may differ in minor details. We will never change materials or specifications listed on
          the product page in a way that lowers quality without telling you first and offering a full refund.
        </p>
      </>
    ),
  },
  {
    id: "orders",
    title: "Orders, pricing and payment",
    body: (
      <>
        <p>
          Prices are shown in U.S. dollars. Shipping costs and applicable sales tax are shown at checkout before you pay. Payment
          is taken by Stripe when you place your order. Your order is accepted when we send the order confirmation email.
        </p>
        <p>
          We may refuse or cancel an order, for example if a product is unavailable, if there is an obvious error in price
          or description, or if we suspect fraud. If we cancel an order you have paid for, we&apos;ll refund you in full.
          We may limit quantities per order.
        </p>
        <p>Prices may change, but a change never affects an order we have already accepted.</p>
      </>
    ),
  },
  {
    id: "pre-orders",
    title: "Pre-orders",
    body: (
      <p>
        When we offer pre-orders, the estimated ship window is shown on the product page, in your bag, at checkout and in
        your confirmation email, and payment is taken at checkout. If we can&apos;t ship within the stated window, we&apos;ll
        email you before it passes with a new estimate and the choice to wait or cancel for a full refund. You may cancel a
        pre-order for a full refund at any time before it ships. Full details are in our{" "}
        <Link href="/shipping#pre-orders">Shipping Policy</Link>.
      </p>
    ),
  },
  {
    id: "shipping",
    title: "Shipping and delivery",
    body: (
      <p>
        We ship to the destinations listed in our <Link href="/shipping">Shipping Policy</Link>. Title and risk of loss pass to
        you when the order is delivered to the address you gave us. If a package is lost or arrives damaged, contact us and
        we&apos;ll make it right.
      </p>
    ),
  },
  {
    id: "returns",
    title: "Returns and refunds",
    body: (
      <p>
        You may return eligible items within {POLICY.returnWindowDays} days of delivery, as described in our{" "}
        <Link href="/returns">Returns Policy</Link>.
      </p>
    ),
  },
  {
    id: "ip",
    title: "Our content and brand",
    body: (
      <p>
        The Mulberry name, logos, designs, photography, illustrations and text on this site belong to us or our licensors and
        are protected by intellectual property laws. You may view and share pages for personal, non-commercial use. Any other
        use, including copying designs or using our brand, requires our written permission.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <p>
        Don&apos;t misuse the site. That includes trying to access accounts or systems that aren&apos;t yours, interfering with the
        site&apos;s security or operation, scraping it in bulk, buying for unauthorized resale using automated tools, or using
        it for anything unlawful or fraudulent. We may suspend access or cancel orders connected to misuse.
      </p>
    ),
  },
  {
    id: "warranties",
    title: "Warranties",
    body: (
      <p>
        If an item arrives faulty or not as described, our <Link href="/returns#defects">Returns Policy</Link> explains how
        we&apos;ll repair, replace or refund it, in addition to any rights you have by law. Apart from that, and to the
        extent the law allows, the website is provided &ldquo;as is&rdquo; and we don&apos;t promise it will always be
        available or error-free.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        To the extent the law allows, we are not liable for indirect, incidental or consequential losses arising from your use
        of the site or our products, and our total liability for any claim relating to an order is limited to the amount
        you paid for that order. Nothing in these Terms excludes or limits liability that cannot be excluded or limited by
        law, including liability for fraud, or for death or personal injury caused by negligence.
      </p>
    ),
  },
  {
    id: "disputes",
    title: "Governing law and disputes",
    body: (
      <>
        <p>
          If something goes wrong, please contact us first at {mail}. Most issues can be resolved quickly, and we&apos;ll
          make a genuine effort to do so within 30 days.
        </p>
        <p>
          These Terms are governed by {governingLaw}, without regard to conflict-of-law rules. If you are a consumer, you
          keep the protection of the mandatory laws of the place you live and may bring a claim in your local courts,
          including small claims court.
        </p>
      </>
    ),
  },
  {
    id: "general",
    title: "General",
    body: (
      <p>
        We may update these Terms from time to time. The version shown when you place an order applies to that order. If any
        part of these Terms is found unenforceable, the rest stays in effect. If we don&apos;t enforce a right right away,
        we haven&apos;t given it up. Questions about these Terms: {mail}
        {BUSINESS.mailingAddress ? <>, {BUSINESS.mailingAddress}</> : null}.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={<p>Plain-language terms for using our site and buying from us. Please read them before placing an order.</p>}
      sections={sections}
    />
  );
}
