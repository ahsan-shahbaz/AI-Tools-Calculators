# ToolCalculators: Agent Handoff

Use this brief as current project context when reviewing or improving the site. Confirm the live source before changing behavior; the tool catalog and routes are the source of truth.

## Product Overview

- **Product:** ToolCalculators, a free, responsive web-tool directory for creators, small businesses, developers, and everyday planning.
- **Goal:** Make useful calculators easy to discover, use, and trust; prepare the site for sustainable revenue after the domain and external monetization accounts are configured.
- **Planned domain:** `https://tool-calculators.com` (the owner still plans to purchase/configure it; domain ownership and DNS have not been verified here).
- **Local preview last used:** `http://localhost:3002`.
- **Core UX:** searchable directory, category filters, calculator-specific routes, immediate client-side results, no login flow.

## Current Tool Catalog

All 18 listed tools have a route and are marked live in `src/data/youtube-data.ts`. The homepage directory and sitemap use this catalog.

| Tool | Category | Route | Main behavior / implementation |
|---|---|---|---|
| YouTube Money & RPM Calculator | Social Media | `/tools/youtube-money-calculator` | Estimates daily, monthly, and yearly earnings by views, niche, audience region, video format, and mid-roll assumption; includes milestones, sponsorship estimates, and locally generated topic ideas. Logic: `src/lib/youtube-calculator.ts`, `src/lib/ai-generator.ts`. |
| Freelance Rate & Quote Generator | Finance & Business | `/tools/freelance-rate-calculator` | Estimates hourly/day/project pricing and creates a proposal from role and project inputs. Logic: `src/lib/freelance-calculator.ts`, `src/lib/freelance-ai.ts`. |
| E-commerce Profit & Break-Even ROAS Calculator | Finance & Business | `/tools/break-even-roas-calculator` | Models product costs, margin, advertising break-even, and optimization suggestions. Logic/data: `src/lib/ecommerce-calculator.ts`, `src/lib/ecommerce-ai.ts`, `src/data/ecommerce-data.ts`. |
| JSON-LD Schema Markup Generator | SEO & Webmaster | `/tools/schema-markup-generator` | Builds structured-data JSON-LD for supported page types. Logic: `src/lib/schema-generator.ts`. |
| Plain English to Regex Generator & Tester | Developer | `/tools/regex-generator` | Maps supported plain-language patterns to regex and lets users test expressions. Logic: `src/lib/regex-generator.ts`. |
| Macro & TDEE Calorie Planner | Lifestyle | `/tools/macro-tdee-calculator` | Estimates BMR/TDEE and macro targets, then creates a sample meal plan based on a diet preference. Logic: `src/lib/macro-calculator.ts`, `src/lib/macro-ai.ts`. |
| YouTube Shorts Earnings Estimator | Social Media | `/tools/youtube-shorts-earnings-estimator` | Estimates revenue from daily views, CPM, revenue-share, retention-uplift, and upload-frequency assumptions. Logic: `src/lib/youtube-shorts-calculator.ts`. |
| Patreon Earnings Estimator | Social Media | `/tools/patreon-earnings-estimator` | Estimates gross monthly pledges and projected net earnings from paid members, average pledge, an editable combined fee estimate, and monthly costs. Logic: `src/lib/patreon-calculator.ts`. |
| TikTok Brand Deal Rate Calculator | Social Media | `/tools/tiktok-brand-deal-rate-calculator` | Heuristic per-post and monthly deal estimate using followers, engagement, views, niche multiplier, and package tier. Logic: `src/lib/tiktok-brand-deal-calculator.ts`. |
| Instagram Engagement Rate Tool | Social Media | `/tools/instagram-engagement-rate-tool` | Calculates engagement rate, monthly interactions, a quality score, and an audience tier. Shares currently receive a 2x weighting. Logic: `src/lib/instagram-engagement-calculator.ts`. |
| Amazon FBA Net Profit Calculator | Finance & Business | `/tools/amazon-fba-net-profit-calculator` | Estimates revenue, unit costs, monthly profit, net margin, and break-even price; ad spend is a monthly cost. Logic: `src/lib/fba-profit-calculator.ts`. |
| Salary to Hourly Take-Home Calculator | Finance & Business | `/tools/salary-to-hourly-take-home` | Estimates take-home income and hourly pay from annual salary, bonus, a flat tax-rate assumption, insurance, retirement, and working time. Logic: `src/lib/salary-take-home-calculator.ts`. |
| Date & Time Calculators | Date & Time | `/tools/date-time-calculators` | Five date tools, country holiday countdowns, and an optional three-question daily Date Dash game. Holiday dates are generated locally at dev/build/test time; lunar events are marked tentative. Logic: `src/lib/date-calculators.ts`, `src/lib/date-game.ts`; source data: `src/data/holiday-calendar.json`. |

## Technical Map

- **Framework:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, lucide-react.
- **Product architecture:** 18 free, responsive tools in eight categories. There is no login, database, or runtime holiday API; calculator calculations run client-side.
- **Entry points:** `src/app/page.tsx` (tool directory), `src/app/layout.tsx` (global shell and root SEO), `src/components/Header.tsx`, `src/components/Footer.tsx`.
- **Quick games:** `src/components/StayAndPlay.tsx` provides persistent header access plus a dismissible invite after three minutes of visible-tab time. It includes Rock–Paper–Scissors, Tic-Tac-Toe, Mini Sudoku, Number Trail, and Word Guess; scores stay in memory and are not stored or sent. Rules live in `src/lib/quick-games.ts`.
- **Catalog and shared types:** `src/data/youtube-data.ts` (`ALL_TOOLS`) is the source of truth; shared catalog types are in `src/types/index.ts` (`ToolDirectoryItem`).
- **Calculator logic:** `src/lib/*.ts`; keep pure calculations separate from UI.
- **Holiday calendar:** `scripts/generate-holiday-calendar.mjs` uses the `date-holidays` development dependency to generate five years of local public/bank holiday data before dev, build, and tests. Islamic and other lunar dates are estimates pending local confirmation. Holiday data attribution and license are shown in the date toolkit.
- **Tool routes:** `src/app/tools/<slug>/page.tsx`. Per-tool `layout.tsx` files apply metadata through `src/lib/seo.ts`.
- **Adding or renaming a tool:** Update all of `ALL_TOOLS`, its route page, its per-route metadata layout, and relevant internal links. Sitemap generation is catalog-driven; do not edit it manually for each tool.
- **SEO endpoints:** `src/app/sitemap.ts`, `src/app/robots.ts`; canonical base URL lives in `src/lib/site.ts`.
- **Trust pages:** `/privacy-policy`, `/terms-of-use`, `/disclaimer`.
- **Styles:** `src/app/globals.css` and Tailwind utility classes in components/pages.
- **Ad preview:** `src/components/AdPlaceholder.tsx`; preview is development-only and returns `null` in production.
- **Recommendation links:** creator, ecommerce, and freelance recommendations are plain external URLs at present. There are no referral IDs verified in the repository.
- **Persistence/services:** no user accounts or database. Calculator logic runs in the browser. There is no configured analytics provider or external AI model/API. Functions with “AI” in their names use local templates, rules, or preset content (some simulate a short delay); describe them honestly as generated suggestions unless a real model is integrated.
- **Commands:** `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm test` (Vitest). Focused calculator tests are colocated as `*.test.ts` files in `src/lib`.

## Current SEO and Trust State

- Root metadata, canonical URL, Open Graph/Twitter metadata, and WebSite JSON-LD are configured.
- Tool metadata is generated from each `ALL_TOOLS` item; keep catalog titles/descriptions specific, factual, and distinct.
- Sitemap includes the home page, all tools, and trust pages. Robots allows crawling and points to the sitemap.
- Calculator inputs are handled client-side. Do not add analytics, advertising cookies, or third-party tracking without reviewing consent requirements and updating the privacy policy.
- Financial, creator-earnings, salary, and health results are estimates. Keep assumptions visible and disclaimers easy to find; do not promise outcomes or present estimates as professional advice.
- The legal pages are starter content, not jurisdiction-specific legal advice. Have the owner review them before launch.

## Revenue Status: Not Activated

- No ad-network script, publisher ID, ad account approval, or live ad placement is configured. Ad placeholders are not rendered in production.
- Recommendation URLs currently point directly to vendor sites. Affiliate tracking, partner approval, and earned commissions are not configured or verified.
- Before monetizing, obtain approved program identifiers, integrate them according to provider policies, label sponsored placements, disclose affiliate relationships next to recommendations, and update privacy/consent language where needed.
- Search ranking, revenue, program acceptance, and conversion are not guaranteed.

## Agent Priorities

1. **Formula credibility:** Make assumptions visible in the UI. Validate inputs, set sensible min/max bounds, show inline errors, handle zero/negative/very large inputs, and never display `NaN` or `Infinity`. Review estimates against clearly stated formulas and current provider rules. Use Vitest for focused pure-function tests in `src/lib`.
2. **End-user UX:** Support shareable results through URL query parameters (encode inputs and hydrate on load), provide copy-to-clipboard fallbacks, and add visible methodology and FAQ sections per tool. Preserve keyboard access and announce changing results with `aria-live` where appropriate.
3. **Search quality:** Add genuinely useful tool-specific methodology notes, worked examples, and FAQs. Avoid thin duplicate copy and keyword stuffing.
4. **Related tools:** Add contextual cross-links between complementary calculators, such as salary ↔ freelance rate ↔ FBA, to encourage useful onward navigation.

## Guardrails for Changes

- Do not add analytics, ad scripts, cookies, or tracking without explicit owner request. Update and review the privacy policy before adding any such integration.
- Do not add real API calls, backend services, or database code. Modules named `*-ai.ts` use local templates/rules; never present their output as live AI.
- Do not use “guaranteed,” “accurate,” or “official” in user-facing copy. Financial, health, and earnings outputs are estimates; keep disclaimers visible.
- Do not add login, accounts, or paywalls. The product stays free and client-side.
- Financial and earnings tools must show their assumptions in the UI (for example RPM ranges, flat tax rate, and revenue-share percentage); do not hide methodology in code.
- Use strict TypeScript; avoid `any` unless justified in a code comment. Keep calculator logic pure: inputs in, outputs out, with no side effects or DOM access in `src/lib` calculator modules.
- Use Tailwind utilities for styling and lucide-react for icons. Add `"use client"` only where interactivity requires it.
- Preserve the Next.js App Router and existing project patterns; check the catalog and nearby types before adding abstractions or duplicating metadata.
- Validate changes with `npm test` and `npm run build`. Use Vitest and colocate tests as `*.test.ts` beside calculator logic in `src/lib`.
- The production canonical domain is currently set in `src/lib/site.ts` to `https://tool-calculators.com`. Confirm the final hostname and HTTPS redirect before launch, then verify the deployed sitemap in Google Search Console.

## Update 2026-10-04: growth and monetization pass

Read `LAUNCH_PLAYBOOK.md` first. This supersedes the "Revenue Status: Not Activated" and some Guardrails above:

- **New tools:** mortgage-payment, compound-interest, percentage, profit-margin, BMI (logic in `src/lib/*-calculator.ts` with tests; shared maths in `src/lib/finance-math.ts`). New categories: `Personal Finance`, `Everyday Math`. Category hub pages live at `/category/<slug>` (`src/data/categories.ts`).
- **Shared tool layout:** `src/app/tools/layout.tsx` renders `ToolExtras` under every calculator (share bar, method/example/tips from `src/data/tool-content.ts`, FAQ + FAQPage schema when the page has none, resources, ad slot, related tools, WebApplication/Breadcrumb schema). Do not add `RelatedTools` or full `ToolStructuredData` to individual pages; pass `faqs` only.
- **When adding a tool:** catalog entry, route page + `layout.tsx` (metadata) + `opengraph-image.tsx` (copy any existing one), a `TOOL_CONTENT` entry, and tests. Use `CalcKit` and `useUrlState` for shareable inputs.
- **Monetization is env-driven and consent-gated** (`src/lib/site.ts`, `ConsentBanner`, `ThirdPartyScripts`, `AdPlaceholder`). With no env vars nothing third-party loads and no banner shows. Affiliate links are plain until a `trackedUrl` is set in `src/data/affiliates.ts`; only then are they labelled and marked `rel="sponsored"`.
- The owner has explicitly asked for a revenue-focused site, so ads/affiliates/analytics via the existing consent flow are in scope. Still no login, paywalls, backend or database, and keep the estimate disclaimers and the "no guaranteed/accurate/official" copy rule.
- `src.zip` in the repo root is a stale archive and can be deleted.
