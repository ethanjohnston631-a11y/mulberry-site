import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { BUSINESS, POLICY } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description: `Return eligible Mulberry pieces within ${POLICY.returnWindowDays} days of delivery. How returns, refunds, exchanges and pre-order cancellations work.`,
};

const mail = <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>;
const days = POLICY.returnWindowDays;

const sections: LegalSection[] = [
  {
    id: "window",
    title: `${days}-day returns`,
    body: (
      <>
        <p>You can return any item within {days} days of delivery for a refund, as long as it is:</p>
        <ul>
          <li>unworn (beyond trying it on), unwashed and free of odors, marks or pet hair;</li>
          <li>returned with its original tags attached; and</li>
          <li>returned in its original packaging where possible.</li>
        </ul>
        <p>We inspect every return. Items that don&apos;t meet these conditions may be sent back to you.</p>
      </>
    ),
  },
  {
    id: "how",
    title: "How to start a return",
    body: (
      <ol className="list-decimal space-y-2 pl-5">
        <li>Email {mail} with your order number (it starts with MB-) and the items you&apos;re returning.</li>
        <li>We&apos;ll reply with the return address and instructions, usually within two business days.</li>
        <li>Pack the item securely and send it using a trackable service. Keep your tracking number until your refund arrives.</li>
      </ol>
    ),
  },
  {
    id: "costs",
    title: "Return shipping costs",
    body: (
      <p>
        Return shipping is your responsibility unless the item is faulty, damaged in transit or not what you ordered. In
        those cases we cover it (see <a href="#defects">Faulty or incorrect items</a>). Original shipping charges are refunded only
        if the return is due to our error.
      </p>
    ),
  },
  {
    id: "refunds",
    title: "Refunds",
    body: (
      <p>
        Once your return arrives and passes inspection, we&apos;ll email you and refund the item price to your original
        payment method within 5 business days. Your bank may take a further 5 to 10 business days to show it.
      </p>
    ),
  },
  {
    id: "exchanges",
    title: "Exchanges",
    body: (
      <p>
        Need a different size or color? Return the original for a refund and place a new order for the piece you want.
        That way your new size isn&apos;t held up by the return. Because we produce in limited runs, we can&apos;t reserve stock
        during a return.
      </p>
    ),
  },
  {
    id: "defects",
    title: "Faulty or incorrect items",
    body: (
      <>
        <p>
          If your piece arrives damaged, faulty, or isn&apos;t what you ordered, email {mail} within {days} days of delivery
          with your order number and photos. We&apos;ll arrange a free return and, at your choice, a replacement (if available)
          or a full refund including shipping. This is in addition to your rights under law.
        </p>
        <p>
          Wear from normal use, and damage caused by not following the <Link href="/care-guide">Care Guide</Link> (for
          example tumble drying or bleaching the silk lining), are not defects.
        </p>
      </>
    ),
  },
  {
    id: "pre-orders",
    title: "Cancelling a pre-order",
    body: (
      <p>
        You can cancel a pre-order for a full refund at any time before it ships: email {mail} with your order number.
        Refunds for cancelled pre-orders are issued within 5 business days of your request. If we can&apos;t ship within
        the window we gave you, we&apos;ll contact you first and you can cancel for a full refund.
      </p>
    ),
  },
];

export default function ReturnsPage() {
  return (
    <LegalPage
      label="Support"
      title="Returns & Refunds"
      intro={<p>We want you to keep your Sovereign for years. If it isn&apos;t right, here&apos;s how to send it back.</p>}
      sections={sections}
    />
  );
}
