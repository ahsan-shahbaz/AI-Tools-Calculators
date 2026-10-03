# ToolCalculators

Free, private, browser-based calculators for money, business, creators and everyday decisions. Built with Next.js (App Router), React, TypeScript and Tailwind CSS. No accounts, no backend, no database: every calculation runs in the visitor's browser.

[![CI](https://github.com/ahsan-shahbaz/AI-Tools-Calculators/actions/workflows/ci.yml/badge.svg)](https://github.com/ahsan-shahbaz/AI-Tools-Calculators/actions/workflows/ci.yml)

## What's inside

- **18 calculators** in 8 categories: mortgage, compound interest, percentage, profit margin, BMI, freelance rates, e-commerce/FBA profit, salary take-home, YouTube/Shorts/TikTok/Instagram/Patreon creator tools, date tools, regex and JSON-LD generators.
- **Method, worked example and FAQ** on every tool page (`src/data/tool-content.ts`), with matching structured data.
- **Shareable results**: inputs sync to the URL on the newer tools (`src/lib/use-url-state.ts`).
- **SEO**: per-page metadata, generated Open Graph images, sitemap, category hub pages, JSON-LD.
- **Monetization (off by default)**: consent-gated AdSense/GA and labelled affiliate slots, enabled only through environment variables.

## Architecture

| Path | Purpose |
|---|---|
| `src/app/` | Routes. `tools/<slug>/` holds each calculator page, its metadata `layout.tsx` and `opengraph-image.tsx`. `tools/layout.tsx` adds the shared sections under every tool. |
| `src/lib/*-calculator.ts` | Pure calculation modules (no DOM, no side effects) with colocated `*.test.ts`. |
| `src/data/` | Tool catalog (`youtube-data.ts`), categories, per-tool content, affiliate resources. |
| `src/components/` | Shared UI (`ToolShell`, `CalcKit`, `ShareBar`, consent and ad components). |

Design rules: keep calculator logic pure and tested, show assumptions in the UI, never present estimates as advice, and never show `NaN`/`Infinity`. See `AGENT_HANDOFF.md` for conventions and `LAUNCH_PLAYBOOK.md` for launch and revenue steps.

## Getting started

Requires Node.js 20+.

```bash
npm ci
npm run dev        # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm test` | Vitest unit tests |
| `npm run typecheck` | TypeScript, no emit |
| `npm run build` | Production build |
| `npm start` | Serve the production build |

Copy `.env.example` to `.env.local` to try ads, analytics or Search Console verification locally.

## Adding a calculator

1. Pure logic and tests in `src/lib/<name>-calculator.ts`.
2. Catalog entry in `src/data/youtube-data.ts` and a `TOOL_CONTENT` entry in `src/data/tool-content.ts`.
3. `src/app/tools/<slug>/page.tsx`, `layout.tsx` (metadata) and `opengraph-image.tsx` (copy an existing one).
4. `npm test && npm run typecheck && npm run build`.

## Contributing

Branch from `main`, keep changes focused, use [Conventional Commits](https://www.conventionalcommits.org/), and open a pull request. CI must pass.

## Disclaimer

Results are estimates for general information, not financial, tax, legal or medical advice.
