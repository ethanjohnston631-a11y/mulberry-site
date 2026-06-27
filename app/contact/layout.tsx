import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about sizing, orders, or the silk itself — reach Mulberry directly.",
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
