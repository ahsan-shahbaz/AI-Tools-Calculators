# ToolCalculators - AI-Powered Free Web Tools Portal

A responsive web tool portal built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. It includes 12 browser-based calculators for creators, businesses, developers, and everyday planning.

---

## 🚀 Live Flagship Tool: AI YouTube Money & RPM Calculator
Located at: `/tools/youtube-money-calculator`

### Key Features:
1. **Accurate Formula Math Engine:**
   - 12 specific YouTube niches (Personal Finance, Tech & SaaS, Real Estate, Gaming, Fitness, Beauty, Education, etc.).
   - Audience geography multipliers (Tier 1 US/UK/CA/AU vs. Tier 2 & Tier 3).
   - Long-form vs. YouTube Shorts switch (accurately calculating $0.03 - $0.09 Shorts RPM).
   - Mid-roll ad toggle (>8 minutes video length) for +25% RPM boost.
2. **Multi-Horizon Earnings Display:**
   - Real-time animated calculations for Daily, Monthly, and Yearly revenue (Min, Average, Max).
   - Milestone Target Calculator (e.g., views needed to hit $1,000, $5,000, or $10,000/month).
   - Estimated brand sponsorship earnings + total creator monetization potential.
3. **AI Viral Video Topic & Strategy Generator:**
   - Built-in dynamic AI generation with zero API cost.
   - Outputs 4 viral video concepts with high-CTR titles, 5-second hook scripts, thumbnail concepts, and estimated RPM potential.
   - Algorithmic optimization tips tailored to the selected niche.
4. **1-Click Copy & Share Summary:**
   - Formats a clean text report for creators to paste into notes or share on social media.
5. **SEO & FAQ Infrastructure:**
   - Comprehensive Q&A section answering top-volume Google queries on CPM vs. RPM, high-paying niches, and Shorts monetization.

---

## Search and Domain Setup

Search metadata is defined in `src/app/layout.tsx`; each calculator has its own title, description, and canonical URL. `src/app/sitemap.ts` generates a sitemap from the tool catalog, and `src/app/robots.ts` publishes its location.

The canonical site URL is set in `src/lib/site.ts` to `https://tool-calculators.com`. Confirm domain ownership, HTTPS, and the production redirect/canonical hostname before launch. After deployment, verify the site in Google Search Console and submit `/sitemap.xml`.

## Revenue Activation

Revenue integrations are **not active** in the current build. Ad placements are previewed during development and hidden in production. The recommendation URLs are direct links, not affiliate-tracked links; no publisher account, referral ID, or analytics integration is configured.

Before enabling ads or affiliate monetization:
- Apply to the chosen ad and affiliate programs and obtain approved publisher/referral identifiers.
- Integrate their approved scripts or links, and review their policies and the site's privacy/consent requirements.
- Clearly label paid placements and disclose affiliate relationships next to relevant recommendations.
- Update `src/app/privacy-policy/page.tsx` if tracking, cookies, or third-party data collection is introduced.
- Recheck the user experience, performance, and all calculator results after each integration.

Never publish example IDs or imply a partnership before it is approved. Revenue and search ranking are not guaranteed.

---

## 🛠️ Local Development & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🌐 100% Free Hosting Deployment (Vercel / Cloudflare Pages)

1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ToolCalculators Portal"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/AI-Tools.git
   git push -u origin main
   ```
2. Go to [Vercel.com](https://vercel.com) (or Cloudflare Pages), sign in with GitHub, and click **"New Project"**.
3. Select this repo and click **"Deploy"**. Vercel will automatically build and host your site on a fast global CDN with free SSL.
