export type Severity = "info" | "low" | "medium" | "high" | "critical";

export interface EvidenceItem {
  type: "cookie" | "network" | "dom" | "header" | "consent" | "storage" | "custom";
  label: string;
  value: string | Record<string, unknown> | unknown[];
  snippet?: string;
}

export interface Finding {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  category: string;
  evidence: EvidenceItem[];
  recommendation?: string;
}

export interface ScanContext {
  url: string;
  timestamp: string;
  pageTitle?: string;
  userAgent?: string;
}

export interface ScanResult {
  url: string;
  title: string;
  findings: Finding[];
  summary: {
    total: number;
    bySeverity: Record<Severity, number>;
  };
}
