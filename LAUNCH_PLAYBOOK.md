# ToolCalculators: Launch & Revenue Playbook

What the code already does, what you must do before and after going live, and where the money realistically comes from.

## 1. What is built in

| Area | What it does |
|---|---|
| **High-demand tools** | Mortgage payment, compound interest, percentage, profit margin/markup and BMI calculators sit next to the creator and business tools. These are head search terms with large monthly volume and advertiser demand. |
| **Per-tool content** | Every tool page gets a method, worked example, tips, a "reviewed on" date and (where missing) an FAQ with FAQPage schema. Source: `src/data/tool-content.ts`. |
| **Shareable results** | New tools keep their inputs in the URL (`useUrlState`), and every tool has a share bar (copy link, WhatsApp, X, Facebook, LinkedIn, Reddit, email). |
| **Category hubs** | `/category/<slug>` pages with copy, a CollectionPage/ItemList schema and internal links. Source: `src/data/categories.ts`. |
| **Technical SEO** | Branded Open Graph image for the site and every tool, WebApplication + BreadcrumbList + FAQPage JSON-LD (no duplicates), stable sitemap dates, 32-URL sitemap, `manifest`, icons, security headers, `?q=` search link support. |
| **Trust pages** | About, Contact, Privacy (updated for ads), Terms, Disclaimer. AdSense reviewers look for these. |
| **Monetization (off by default)** | Consent-gated AdSense + optional Google Analytics, `ads.txt` route, labelled affiliate slots. Nothing third-party loads until you set env vars **and** the visitor accepts. |

## 2. Before you deploy (blocking)

1. **Buy and connect the domain.** `SITE_URL` in `src/lib/site.ts` is `https://tool-calculators.com`. If you pick a different domain, change it there once.
2. **Create the mailbox** used in `CONTACT_EMAIL` (`src/lib/site.ts`) or change it. It is shown publicly.
3. **Have the legal pages reviewed.** They are starter text, not legal advice. Add your business name and country.
4. **Deploy** (Vercel is the simplest for Next.js): `npm run build` must pass; set Node 20+.
5. **Verify** `https://<domain>/sitemap.xml`, `/robots.txt`, `/ads.txt` and a tool page's social preview.

## 3. Turn on SEO (day 1)

1. Add the site to **Google Search Console** and **Bing Webmaster Tools**; submit `/sitemap.xml`.
2. Put the Search Console HTML-tag token in `NEXT_PUBLIC_GSC_VERIFICATION`.
3. Request indexing for the home page and the five new calculators.
4. Add a few high-quality links: Product Hunt, Reddit communities where the tool is on-topic (read each rule), relevant "free tools" directories, and a short post for each calculator.

## 4. Turn on revenue

Set these in your host's environment variables (or `.env.local`), then redeploy:

```
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD=...   # optional: one ad unit per placement
NEXT_PUBLIC_ADSENSE_SLOT_IN_FEED=...
NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE=...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX # optional analytics
```

* **AdSense**: apply once the site is live with real content (this build has 18 tools plus explanatory text). With only the client ID, AdSense Auto ads can run; add slot IDs for fixed placements. `ads.txt` fills in automatically.
* **Consent**: the banner appears only when one of those variables is set. Decline means no third-party scripts. If you expect many EU/UK visitors, use a Google-certified consent platform (CMP) instead; AdSense requires it for those regions.
* **Affiliates**: apply to programs for the resources listed in `src/data/affiliates.ts` (FreshBooks, Shopify, Canva, Semrush, Hostinger, vidIQ, Epidemic Sound, LendingTree and so on). When approved, paste the tracking link into that entry's `trackedUrl`. The card then gets an "Affiliate" label, `rel="sponsored"` and the disclosure line automatically. Nothing is labelled affiliate until you do.
* **Best-paying pages**: mortgage and compound interest attract finance advertisers (highest RPM). Keep adding calculators in that cluster.

## 5. Growth roadmap (highest return first)

1. **More head-term calculators**, each with the same content treatment: loan/auto-loan payment, savings goal, retirement, tip, discount/sales tax, ROI, hourly-to-salary, age, due date, unit converters.
2. **Cluster guides**: a 600-1,000 word guide per cluster ("how much house can I afford", "margin vs markup") linking to the calculators. Add as `/guides/<slug>`.
3. **Shareable results everywhere**: only the five new tools sync inputs to the URL today. Extend `useUrlState` to the older tools.
4. **Core Web Vitals**: check PageSpeed after deploy; ad slots already reserve height to avoid layout shift.
5. **Real analytics** once you consent-gate GA: watch Search Console queries and double down on what ranks.

## 6. Honest expectations

Ranking, ad approval and revenue are not guaranteed. Calculator sites usually take months to earn trust, and income follows traffic: AdSense calculator pages commonly earn single-digit to low-double-digit dollars per 1,000 visits depending on niche and country. Finance tools earn more than most. Plan for consistent additions and updates rather than a launch spike.
