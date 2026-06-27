import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Order Confirmed", robots: { index: false } };

export default function SuccessLayout({ children }: { children: ReactNode }) {
  return children;
}
