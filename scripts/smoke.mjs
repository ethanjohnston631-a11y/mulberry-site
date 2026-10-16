// Browser smoke test: every page loads (200), has no console errors and no horizontal overflow on a
// 390px phone viewport. Run against a dev server:  npx next dev -p 3100  then  node scripts/smoke.mjs
import { chromium } from "playwright";

const BASE = process.env.BASE_URL || "http://localhost:3100";
const PAGES = ["/", "/products", "/products/essential-hoodie-black", "/our-story", "/why-silk", "/history",
  "/care-guide", "/journal", "/faq", "/contact", "/account", "/privacy-policy", "/terms", "/returns", "/shipping",
  "/accessibility", "/cancel", "/success"];

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
const errors = [];
page.on("console", (m) => m.type() === "error" && !m.text().includes("caret-color") && errors.push(`${page.url()}: ${m.text()}`));

let failed = 0;
for (const path of PAGES) {
  const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (res.status() !== 200 || overflow > 0) {
    failed++;
    console.log(`FAIL ${path}: status ${res.status()}, horizontal overflow ${overflow}px`);
  }
}
await browser.close();
if (errors.length) {
  failed += errors.length;
  console.log("Console errors:\n" + errors.join("\n"));
}
console.log(failed ? `${failed} problem(s)` : `All ${PAGES.length} pages OK`);
process.exit(failed ? 1 : 0);
