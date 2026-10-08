import type { Finding, ScanResult } from "../types.js";

export function generateReport(url: string, title: string, findings: Finding[]): ScanResult {
  const bySeverity = {
    info: 0,
    low: 0,
    medium: 0,
    high: 0,
    critical: 0
  } as Record<"info" | "low" | "medium" | "high" | "critical", number>;

  for (const finding of findings) {
    bySeverity[finding.severity] += 1;
  }

  return {
    url,
    title,
    findings,
    summary: {
      total: findings.length,
      bySeverity
    }
  };
}
