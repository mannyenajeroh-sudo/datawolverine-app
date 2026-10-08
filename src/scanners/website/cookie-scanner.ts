import type { Page } from "playwright";
import { BaseScanner } from "../base-scanner.js";
import type { Finding } from "../../types.js";

export class CookieScanner extends BaseScanner {
  readonly name = "cookie-scanner";
  readonly category = "website-privacy";

  async run(page: Page): Promise<Finding[]> {
    const findings: Finding[] = [];
    const cookies = await page.context().cookies();

    const firstParty = cookies.filter((cookie) => !cookie.domain.startsWith("."));
    const thirdParty = cookies.filter((cookie) => cookie.domain.includes(".") && !page.url().includes(cookie.domain));

    findings.push(
      this.makeFinding(
        "COOKIE-001",
        "Cookies detected",
        "Cookies were observed during runtime inspection.",
        "info",
        "website-privacy",
        [
          {
            type: "cookie",
            label: "Cookie inventory",
            value: cookies.map((cookie) => ({
              name: cookie.name,
              domain: cookie.domain,
              expires: cookie.expires,
              sameSite: cookie.sameSite,
              secure: cookie.secure,
              httpOnly: cookie.httpOnly
            }))
          }
        ],
        "Review each cookie and map it to a clear purpose and consent basis."
      )
    );

    if (firstParty.length) {
      findings.push(
        this.makeFinding(
          "COOKIE-002",
          "First-party cookies present",
          "First-party cookies were detected on the page.",
          "low",
          "website-privacy",
          [
            {
              type: "cookie",
              label: "First-party cookies",
              value: firstParty.map((cookie) => cookie.name)
            }
          ]
        )
      );
    }

    if (thirdParty.length) {
      findings.push(
        this.makeFinding(
          "COOKIE-003",
          "Third-party cookies present",
          "Third-party cookies were detected, which may indicate tracking or advertising behavior.",
          "medium",
          "website-privacy",
          [
            {
              type: "cookie",
              label: "Third-party cookies",
              value: thirdParty.map((cookie) => ({
                name: cookie.name,
                domain: cookie.domain
              }))
            }
          ],
          "Check whether third-party cookies are necessary and whether consent gates them."
        )
      );
    }

    return findings;
  }
}
