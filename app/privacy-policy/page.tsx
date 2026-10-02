import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { BUSINESS } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Mulberry Empire collects, uses and protects your personal information, and the choices you have.",
};

const mail = <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>;

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <p>
        This website is operated by {BUSINESS.name} (&ldquo;Mulberry,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;), which decides
        how your personal information is used. You can reach us about anything in this policy at {mail}
        {BUSINESS.mailingAddress ? <> or by post at {BUSINESS.mailingAddress}</> : null}.
      </p>
    ),
  },
  {
    id: "what-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p><strong>Information you give us:</strong></p>
        <ul>
          <li><strong>Account:</strong> your email address, and the date you created the account.</li>
          <li><strong>Orders:</strong> your name, email, shipping and billing address, and what you bought. Payment cards are entered directly into Stripe&apos;s secure checkout. We never see or store your full card number.</li>
          <li><strong>Waitlist and newsletter:</strong> your email address, your consent and when you gave it, and (for the waitlist) the color and size you&apos;re interested in.</li>
          <li><strong>Messages:</strong> your name, email and anything you write to us through the contact form or by email.</li>
        </ul>
        <p><strong>Information collected automatically:</strong></p>
        <ul>
          <li>Standard server logs kept by our hosting provider (such as IP address, browser type and the page requested), used for security and to keep the site running.</li>
          <li>Your bag is saved in your browser&apos;s local storage so it&apos;s still there when you return.</li>
          <li>If you sign in, one essential cookie keeps you signed in (see <a href="#cookies">Cookies</a>).</li>
        </ul>
        <p><strong>Information from others:</strong> Stripe tells us whether a payment succeeded and gives us the order details we need to fulfil it (for example, card brand and last four digits, and billing and shipping address).</p>
        <p>We do not collect sensitive personal information, and we do not use analytics, advertising or social media tracking tools.</p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use it",
    body: (
      <>
        <ul>
          <li><strong>To fulfil your order</strong>: processing payment, shipping, sending order and shipping updates, and handling returns and refunds. (Legal basis where applicable: performance of a contract.)</li>
          <li><strong>To run your account</strong>: signing you in, saving your bag across devices and showing your order history. (Contract.)</li>
          <li><strong>To answer you</strong>: replying to messages and support requests. (Legitimate interests.)</li>
          <li><strong>To send marketing emails</strong>, only if you&apos;ve opted in. Every marketing email has an unsubscribe link. (Consent.)</li>
          <li><strong>To keep the site secure</strong>: preventing fraud, abuse and unauthorized access. (Legitimate interests.)</li>
          <li><strong>To meet legal obligations</strong>: such as tax and accounting records. (Legal obligation.)</li>
        </ul>
        <p>We do not use your information for automated decision-making or profiling that has legal or similarly significant effects on you.</p>
      </>
    ),
  },
  {
    id: "who-we-share-with",
    title: "Who we share it with",
    body: (
      <>
        <p>We share personal information only with service providers that help us run the store. They may use it only to provide their service to us:</p>
        <ul>
          <li><strong>Stripe</strong>: payment processing and fraud prevention.</li>
          <li><strong>Resend</strong>: sending account, order and (if you opt in) marketing emails.</li>
          <li><strong>Vercel</strong>: website hosting.</li>
          <li><strong>Upstash</strong>: secure storage for accounts and saved bags.</li>
          <li><strong>Shipping carriers</strong>: your name and address, to deliver your order.</li>
        </ul>
        <p>We may also disclose information if required by law, to protect our rights or the safety of others, or as part of a sale or reorganization of the business (in which case this policy will continue to apply).</p>
        <p><strong>We do not sell your personal information, and we do not share it for cross-context behavioral advertising.</strong> We have not done so in the past 12 months.</p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    body: (
      <>
        <p>We keep this deliberately minimal:</p>
        <ul>
          <li><strong>Session cookie</strong> (<code>__Host-mb_session</code>): set only when you sign in, so you stay signed in. It is strictly necessary, cannot be read by scripts, and expires after 30 days or when you sign out.</li>
          <li><strong>Local storage</strong> (<code>mulberry-cart</code>): remembers the items in your bag on this device. It never leaves your browser unless you are signed in.</li>
        </ul>
        <p>We do not use analytics, advertising or third-party tracking cookies, so there is nothing to consent to or opt out of. If that ever changes, we will update this policy and ask for your consent first where the law requires it.</p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <ul>
        <li>Sign-in codes: 10 minutes, and single-use.</li>
        <li>Sign-in sessions: up to 30 days, or until you sign out.</li>
        <li>Account and saved bag: until you delete your account. Saved bags are cleared after 180 days without activity.</li>
        <li>Order and payment records: as long as tax and accounting laws require (generally up to 7 years).</li>
        <li>Newsletter and waitlist: until you unsubscribe. We keep a record of your consent or unsubscribe as proof.</li>
        <li>Messages: as long as needed to resolve your request, and no longer than 3 years.</li>
      </ul>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights and choices",
    body: (
      <>
        <p>Depending on where you live, you may have the right to:</p>
        <ul>
          <li>know what personal information we hold about you and get a copy of it;</li>
          <li>correct inaccurate information;</li>
          <li>delete your information;</li>
          <li>receive your information in a portable format;</li>
          <li>opt out of marketing at any time;</li>
          <li>opt out of the sale or sharing of your information, or of targeted advertising (we do none of these);</li>
          <li>withdraw consent, and object to or restrict certain processing; and</li>
          <li>not be treated differently for exercising any of these rights.</li>
        </ul>
        <p>
          <strong>Do it yourself:</strong> signed-in customers can download their data, change email preferences and delete their
          account from the <Link href="/account">Account</Link> page.
        </p>
        <p>
          <strong>Or ask us:</strong> email {mail} with &ldquo;Privacy Request&rdquo; in the subject. We&apos;ll confirm the request
          comes from you (usually by replying to the email address on file) and respond within 30 days, or 45 days where
          state law allows. An authorized agent may make a request for you with your signed permission.
        </p>
        <p>
          <strong>Appeals:</strong> if we decline your request, you can appeal by replying with &ldquo;Appeal&rdquo; in the subject.
          We&apos;ll respond within 45 days. If you&apos;re still not satisfied, you may contact your state Attorney General or
          your local data protection authority.
        </p>
        <p><strong>Global Privacy Control:</strong> we honor GPC browser signals as a request to opt out of the sale or sharing of personal information.</p>
      </>
    ),
  },
  {
    id: "california",
    title: "California and other U.S. state notices",
    body: (
      <>
        <p>
          This section supplements the policy for residents of California and other states with comprehensive privacy laws
          (including Colorado, Connecticut, Oregon, Texas, Utah and Virginia). In the past 12 months we have collected these
          categories of personal information, from the sources and for the purposes described above:
        </p>
        <ul>
          <li><strong>Identifiers</strong> such as name, email address, postal address and IP address;</li>
          <li><strong>Customer records</strong> such as billing and shipping details (card details are held only by Stripe);</li>
          <li><strong>Commercial information</strong> such as products purchased or added to your waitlist; and</li>
          <li><strong>Internet activity</strong> limited to the server logs described above.</li>
        </ul>
        <p>
          We disclose these categories to the service providers listed above for business purposes only. We do not sell or
          share personal information, we do not collect sensitive personal information, and we have no actual knowledge of
          selling or sharing information of anyone under 16. California&apos;s &ldquo;Shine the Light&rdquo; law: we do not
          disclose personal information to third parties for their own direct marketing.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect it",
    body: (
      <p>
        The site is served only over encrypted HTTPS. Accounts are passwordless: you sign in with a single-use code sent to
        your email, so there is no password that could be leaked or reused. Session tokens are stored only in hashed form.
        Card payments are handled entirely by Stripe, which is certified to PCI DSS Level 1. No system is perfectly
        secure, but we work to protect your information and will notify you and the authorities of a breach where the law
        requires.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        This site is not intended for children under 16 and we do not knowingly collect their personal information. If you
        believe a child has given us information, contact {mail} and we will delete it.
      </p>
    ),
  },
  {
    id: "international",
    title: "Where your information is processed",
    body: (
      <p>
        We are based in the United States and our service providers process data in the United States. If you visit from
        elsewhere, your information will be transferred to and processed in the United States, with safeguards provided by
        our providers&apos; data protection terms.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We&apos;ll post any changes here and update the date at the top. If a change materially affects how we use
        information we already hold, we&apos;ll notify you by email or on the site before it takes effect.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={
        <p>
          We collect as little as we need to make and deliver your order, and nothing for advertising. This policy explains
          what we collect, why, who we share it with, and how to exercise your rights.
        </p>
      }
      sections={sections}
    />
  );
}
