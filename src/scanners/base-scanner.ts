import type { Page } from "playwright";
import type { Finding, ScanContext, Severity } from "../types.js";

export abstract class BaseScanner {
  abstract readonly name: string;
  abstract readonly category: string;

  protected constructor(protected readonly context: ScanContext) {}

  abstract run(page: Page): Promise<Finding[]>;

  protected async getCookies(page: Page): Promise<string[]> {
    const cookies = await page.context().cookies();
    return cookies.map((cookie) => `${cookie.name}=${cookie.value} (${cookie.domain})`);
  }

  protected makeFinding(
    id: string,
    title: string,
    description: string,
    severity: Severity,
    category: string,
    evidence: Finding["evidence"],
    recommendation?: string
  ): Finding {
    return {
      id,
      title,
      description,
      severity,
      category,
      evidence,
      recommendation
    };
  }
}
