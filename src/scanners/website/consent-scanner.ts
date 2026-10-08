import type { Page } from "playwright";
import { BaseScanner } from "../base-scanner.js";
import type { Finding } from "../../types.js";

export class ConsentScanner extends BaseScanner {
  readonly name = "consent-scanner";
  readonly category = "website-privacy";

  async run(page: Page): Promise<Finding[]> {
    const findings: Finding[] = [];

    const banner = page.locator("button, [role='button'], [aria-label*='cookie' i], [id*='cookie' i]");
    const hasBanner = (await banner.count()) > 0;

    if (hasBanner) {
      findings.push(
        this.makeFinding(
          "CONSENT-001",
          "Consent UI detected",
          "A consent-related UI element was detected on the page.",
          "info",
          "website-privacy",
          [
            {
              type: "consent",
              label: "Consent element",
              value: "Possible consent banner or button detected"
            }
          ]
        )
      );
    } else {
      findings.push(
        this.makeFinding(
          "CONSENT-002",
          "No consent UI detected",
          "No obvious consent prompt was identified at runtime.",
          "medium",
          "website-privacy",
          [
            {
              type: "consent",
              label: "Consent presence check",
              value: "No visible consent control detected"
            }
          ],
          "Verify whether the page relies on implicit consent or a hidden consent mechanism."
        )
      );
    }

    return findings;
  }
}
