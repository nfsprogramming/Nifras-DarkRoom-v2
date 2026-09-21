import { chromium } from "playwright";

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:4173", { waitUntil: "load" });
await page.waitForTimeout(5000);

async function lenisToEl(sel, offset = 0) {
  await page.evaluate(
    ({ sel, offset }) => {
      const el = document.querySelector(sel);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const target = Math.min(max, el.getBoundingClientRect().top + window.scrollY + offset);
      window.lenis.scrollTo(target, { duration: 1.2 });
    },
    { sel, offset }
  );
  await page.waitForTimeout(2200);
}

await lenisToEl("#manifesto", 300);
await page.screenshot({ path: "shots/v-about.png" });
const themeAbout = await page.evaluate(() => {
  const el = document.querySelector("#manifesto");
  return getComputedStyle(el).getPropertyValue("--fg").trim();
});

await lenisToEl("#process", 400);
await page.screenshot({ path: "shots/v-process.png" });

await lenisToEl("#work", 200);
await page.screenshot({ path: "shots/v-projects.png" });
try {
  await page.locator("article").first().hover({ timeout: 3000 });
  await page.waitForTimeout(1100);
  await page.screenshot({ path: "shots/v-projects-hover.png" });
} catch {}

console.log("about --fg:", themeAbout);
await browser.close();
