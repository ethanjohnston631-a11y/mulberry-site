// Single source of truth for business facts that appear in legal copy, checkout and product pages.
// Every value here is either a confirmed fact or read from an environment variable, so the
// public site never states something that isn't true yet.

export type StoreMode = "waitlist" | "preorder" | "live";

function readMode(): StoreMode {
  const raw = process.env.NEXT_PUBLIC_STORE_MODE;
  if (raw === "preorder" || raw === "live") return raw;
  // Default: no payment is taken until production is confirmed.
  return "waitlist";
}

export const STORE_MODE: StoreMode = readMode();

// Shown on the product page, cart and checkout when STORE_MODE is "preorder", e.g. "March 2027".
// Pre-orders are refused at checkout unless this is set (FTC Mail Order Rule: you must have a
// reasonable basis for the ship date you state).
export const PREORDER_SHIP_ESTIMATE = process.env.NEXT_PUBLIC_PREORDER_SHIP_ESTIMATE?.trim() || "";

// Whether customers can pay right now. Pre-orders stay closed until a ship estimate is set.
export const CHECKOUT_OPEN = STORE_MODE === "live" || (STORE_MODE === "preorder" && !!PREORDER_SHIP_ESTIMATE);

// Required for the Textile Act "Made in USA" / "Imported" disclosure once goods are sold.
export const COUNTRY_OF_ORIGIN = process.env.NEXT_PUBLIC_COUNTRY_OF_ORIGIN?.trim() || "";

// Countries Stripe Checkout accepts shipping addresses for. US-only by default: selling into the
// UK, EU or Australia triggers VAT/GST registration duties from the first sale.
export const SHIPPING_COUNTRIES: string[] = (process.env.NEXT_PUBLIC_SHIPPING_COUNTRIES || "US")
  .split(",")
  .map((c) => c.trim().toUpperCase())
  .filter((c) => /^[A-Z]{2}$/.test(c));

const COUNTRY_NAMES: Record<string, string> = {
  US: "the United States",
  CA: "Canada",
  GB: "the United Kingdom",
  AU: "Australia",
};

export function shippingCountriesText() {
  const names = SHIPPING_COUNTRIES.map((c) => COUNTRY_NAMES[c] ?? c);
  if (names.length <= 1) return names[0] ?? "the United States";
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export const BUSINESS = {
  name: "Mulberry Empire",
  email: "info@mulberryempire.com",
  site: "https://www.mulberryempire.com",
  // Optional: shown in legal pages and order emails when provided.
  mailingAddress: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS?.trim() || "",
  // Optional: the US state whose law governs the Terms (e.g. "Texas").
  governingState: process.env.NEXT_PUBLIC_GOVERNING_STATE?.trim() || "",
};

export const POLICY = {
  lastUpdated: "October 2, 2026",
  termsVersion: "2026-10-02",
  returnWindowDays: 30,
  maxQtyPerLine: 10,
  maxItemsPerOrder: 20,
};

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || BUSINESS.site;
