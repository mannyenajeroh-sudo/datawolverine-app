# DataWolverine

DataWolverine is a privacy, security, and AI governance runtime scanner framework designed to audit websites, consent flows, AI disclosures, and technical compliance signals.

## Goals

- Browser-based runtime website inspection
- Cookie, tracker, and consent-flow analysis
- Security header and config review
- Modular scanner architecture for future privacy and AI governance modules
- Evidence-driven reporting

## Quick start

1. Install dependencies:

   npm install

2. Run a scan against a target URL:

   npm run dev -- https://example.com

3. Or build the project:

   npm run build

## Current scaffold includes

- Playwright runtime browser inspection
- Cookie scanner
- Consent UI scanner
- Security header scanner
- Report generation in JSON format
- Extensible `BaseScanner` abstraction

## Repository structure

```text
src/
  index.ts
  types.ts
  scanners/
    base-scanner.ts
    website/
      cookie-scanner.ts
      consent-scanner.ts
      security-header-scanner.ts
  reporting/
    report-generator.ts
```

## Planned modules

- Pre-consent tracking scanner
- Reject-parity and dark-pattern scanner
- GPC detection scanner
- AI presence and disclosure scanner
- Governance inventory and AIBOM scanner
- Evidence capture and audit logging

## Notes

This is an MVP scaffold intended to provide a strong starting point for a more comprehensive compliance and privacy audit product.
