import type { Page } from "playwright";
import { BaseScanner } from "../base-scanner.js";
import type { Finding } from "../../types.js";

export class SecurityHeaderScanner extends BaseScanner {
  readonly name = "security-header-scanner";
  readonly category = "web-security";

  async run(page: Page): Promise<Finding[]> {
    const findings: Finding[] = [];
    const response = await page.goto(this.context.url, { waitUntil: "domcontentloaded" });
    const headers = response?.headers() ?? {};

    const requiredHeaders = [
      "content-security-policy",
      "strict-transport-security",
      "x-frame-options",
      "x-content-type-options",
      "referrer-policy"
    ];

    const missingHeaders = requiredHeaders.filter((header) => !(header in headers));

    if (missingHeaders.length) {
      findings.push(
        this.makeFinding(
          "SEC-HEADER-001",
          "Security headers missing",
          "One or more important security headers were not observed.",
          "medium",
          "web-security",
          [
            {
              type: "header",
              label: "Missing headers",
              value: missingHeaders
            }
          ],
          "Add the missing HTTP security headers to improve technical accountability and reduce exposure."
        )
      );
    }

    return findings;
  }
}
