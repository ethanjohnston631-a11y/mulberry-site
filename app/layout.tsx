import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({ subsets: ["latin"], variable: "--inter-font", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--playfair-font", display: "swap" });

export const metadata: Metadata = {
  title: "Mulberry — Empire of Silk",
  description:
    "Mulberry crafts flagship essentials lined in Mulberry silk — for those who measure success in decades, not seasons.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
