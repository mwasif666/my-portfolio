import { chromium } from "playwright";

const out = process.argv[2];
const browser = await chromium.launch({ channel: "msedge" });

for (const [w, h] of [[1920, 1000], [1440, 900], [1280, 800], [820, 900], [390, 844]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 120)));
  await page.goto("http://localhost:4173/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);

  const info = await page.evaluate(() => {
    const s = document.querySelector("#capabilities");
    return {
      staticMode: s.dataset.static ?? "no",
      heightVh: +(s.offsetHeight / window.innerHeight).toFixed(2),
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      cards: s.querySelectorAll("article").length,
      line: s.querySelectorAll("[class*='verticalLine']").length,
    };
  });
  console.log(w, JSON.stringify(info), errors.length ? errors : "");

  if (w === 390 || w === 1920) {
    const top = await page.evaluate(
      () => document.querySelector("#capabilities").getBoundingClientRect().top + window.scrollY,
    );
    await page.evaluate((v) => window.scrollTo(0, v), top + (w === 390 ? 600 : 3000));
    await page.waitForTimeout(1600);
    await page.screenshot({ path: `${out}/final-${w}.png` });
  }
  await page.close();
}

await browser.close();
