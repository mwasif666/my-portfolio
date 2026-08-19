import { chromium } from "playwright";

const browser = await chromium.launch({ channel: "msedge" });
const viewports = [
  { label: "desktop", width: 1440, height: 900 },
  { label: "tablet", width: 820, height: 900 },
  { label: "mobile", width: 390, height: 844 },
];
const selectors = ["#home", "#about", "#services", "#projects", "#why", "#journey", "#developer-systems", "#contact"];

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.goto("http://127.0.0.1:4173", { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForTimeout(3800);

  for (const selector of selectors) {
    const section = page.locator(selector).first();
    if (!(await section.count())) continue;
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await section.screenshot({ path: `scripts/audit-${viewport.label}-${selector.slice(1)}.png` });
  }

  const report = await page.evaluate(() => {
    const visible = (element) => {
      const style = getComputedStyle(element);
      return style.display !== "none" && style.visibility !== "hidden";
    };
    const overflow = [...document.querySelectorAll("h1, h2, h3, p, strong, button, a")]
      .filter(visible)
      .filter((element) => element.scrollWidth > element.clientWidth + 2)
      .map((element) => ({
        tag: element.tagName,
        text: element.textContent.trim().replace(/\s+/g, " ").slice(0, 90),
        client: element.clientWidth,
        scroll: element.scrollWidth,
      }));
    return {
      viewport: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      overflow,
    };
  });
  report.errors = errors;
  console.log(viewport.label, JSON.stringify(report));
  await page.close();
}

await browser.close();
