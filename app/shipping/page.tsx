import type { Metadata } from "next";
import Link from "next/link";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { BUSINESS, PREORDER_SHIP_ESTIMATE, SHIPPING_COUNTRIES, STORE_MODE, shippingCountriesText } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Shipping",
  description: "Where Mulberry ships, processing and delivery times, pre-orders, tracking and lost or damaged parcels.",
};

const mail = <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>;
const international = SHIPPING_COUNTRIES.some((c) => c !== "US");

const sections: LegalSection[] = [
  {
    id: "where",
    title: "Where we ship",
    body: (
      <p>
        We currently ship to {shippingCountriesText()}. We&apos;ll add more destinations over time. Join{" "}
        <a href="#dispatch">The Dispatch</a> to hear first.
      </p>
    ),
  },
  {
    id: "processing",
    title: "Processing time",
    body: (
      <p>
        In-stock orders are processed within 2 to 3 business days (Monday to Friday, excluding U.S. holidays). Pre-orders
        ship within the window shown when you ordered (see below).
      </p>
    ),
  },
  {
    id: "delivery",
    title: "Delivery times and costs",
    body: (
      <>
        <p>
          Once shipped, U.S. orders typically arrive in 4 to 7 business days
          {international ? "; international orders typically take 7 to 14 business days" : ""}. Delivery estimates are provided by
          the carrier and are not guaranteed.
        </p>
        <p>Shipping costs and any applicable sales tax are shown at checkout before you pay.</p>
      </>
    ),
  },
  {
    id: "pre-orders",
    title: "Pre-orders",
    body: (
      <>
        {STORE_MODE === "preorder" && PREORDER_SHIP_ESTIMATE ? (
          <p>
            <strong>Current pre-orders are estimated to ship {PREORDER_SHIP_ESTIMATE}.</strong>
          </p>
        ) : (
          <p>We are not taking pre-orders at the moment.</p>
        )}
        <ul>
          <li>The estimated ship window is shown on the product page, in your bag, at checkout and in your confirmation email.</li>
          <li>Payment is taken when you place the pre-order.</li>
          <li>If we can&apos;t ship within that window, we&apos;ll email you before it passes with a revised date. You can choose to wait or cancel for a full refund. If we don&apos;t hear from you, we&apos;ll follow the law that applies to delayed orders, which may mean cancelling and refunding automatically.</li>
          <li>You can cancel for a full refund at any time before your order ships. Refunds are issued within 5 business days of your request.</li>
        </ul>
      </>
    ),
  },
  {
    id: "tracking",
    title: "Tracking",
    body: <p>You&apos;ll receive a shipping confirmation with a tracking link as soon as your order leaves us.</p>,
  },
  ...(international
    ? [
        {
          id: "duties",
          title: "International duties and taxes",
          body: (
            <p>
              Orders shipped outside the United States may be subject to import duties, taxes and brokerage fees charged by
              the destination country. These are set by local authorities, are not included in our prices or shipping
              charges, and are payable by the recipient on delivery.
            </p>
          ),
        },
      ]
    : []),
  {
    id: "address",
    title: "Addresses",
    body: (
      <p>
        Please double-check your shipping address at checkout. If you spot a mistake, email {mail} right away. We can
        update it if the order hasn&apos;t shipped. We can&apos;t redirect a parcel once it&apos;s with the carrier.
      </p>
    ),
  },
  {
    id: "lost-damaged",
    title: "Lost or damaged parcels",
    body: (
      <p>
        If your tracking hasn&apos;t updated for 7 business days, or your parcel arrives damaged, email {mail} with your order
        number (and photos of any damage). We&apos;ll work with the carrier and send a replacement or a full refund. You
        won&apos;t be left waiting on a carrier claim.
      </p>
    ),
  },
];

export default function ShippingPage() {
  return (
    <LegalPage
      label="Support"
      title="Shipping"
      intro={<p>Everything you need to know about getting your Mulberry piece to your door.</p>}
      sections={sections}
    />
  );
}
