import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { BUSINESS } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Mulberry's commitment to an accessible website, and how to get help or give feedback.",
};

const mail = <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>;

const sections: LegalSection[] = [
  {
    id: "standard",
    title: "Our standard",
    body: (
      <p>
        We aim for this website to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA, so that everyone can
        browse, learn about and buy from Mulberry, including people who use screen readers, keyboard navigation,
        magnification or voice control.
      </p>
    ),
  },
  {
    id: "measures",
    title: "What we do",
    body: (
      <ul>
        <li>Text and interface colors are chosen to meet WCAG AA contrast ratios.</li>
        <li>Every part of the shop, including the menu, product options, bag and checkout, works with a keyboard alone, with a visible focus indicator.</li>
        <li>Form fields have labels, errors are announced to assistive technology, and buttons describe what they do.</li>
        <li>Images that carry meaning have text alternatives.</li>
        <li>Animation is reduced when your device is set to reduce motion.</li>
        <li>Checkout is provided by Stripe, which maintains its own accessibility program.</li>
      </ul>
    ),
  },
  {
    id: "limitations",
    title: "Known limitations",
    body: (
      <p>
        Some decorative illustrations are purely visual and are hidden from screen readers. We review the site regularly
        and fix issues as we find them.
      </p>
    ),
  },
  {
    id: "help",
    title: "Need help or found a barrier?",
    body: (
      <p>
        If anything on this site is difficult to use, email {mail} with &ldquo;Accessibility&rdquo; in the subject. Tell us the
        page and what happened. We&apos;ll respond within two business days and, if you&apos;d like, help you place your order
        directly by email.
      </p>
    ),
  },
];

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility"
      intro={<p>Luxury should be easy to reach. Here&apos;s how we make this site work for everyone.</p>}
      sections={sections}
    />
  );
}
