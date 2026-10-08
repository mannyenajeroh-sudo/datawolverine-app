import { chromium } from "playwright";
import { CookieScanner } from "./scanners/website/cookie-scanner.js";
import { ConsentScanner } from "./scanners/website/consent-scanner.js";
import { SecurityHeaderScanner } from "./scanners/website/security-header-scanner.js";
import { generateReport } from "./reporting/report-generator.js";

async function main() {
  const targetUrl = process.argv[2] ?? "https://example.com";

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(targetUrl, { waitUntil: "domcontentloaded" });

  const context = {
    url: targetUrl,
    timestamp: new Date().toISOString(),
    pageTitle: await page.title(),
    userAgent: await page.evaluate(() => navigator.userAgent)
  };

  const scanners = [
    new CookieScanner(context),
    new ConsentScanner(context),
    new SecurityHeaderScanner(context)
  ];

  const allFindings = [];

  for (const scanner of scanners) {
    const findings = await scanner.run(page);
    allFindings.push(...findings);
  }

  const report = generateReport(targetUrl, context.pageTitle ?? "Untitled page", allFindings);

  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}

main().catch((error) => {
  console.error("DataWolverine scan failed:", error);
  process.exit(1);
});
