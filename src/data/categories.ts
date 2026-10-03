import type { ToolCategory } from '@/types';

export interface CategoryInfo {
  name: ToolCategory;
  slug: string;
  /** Short label for nav chips. */
  short: string;
  /** H1 on the hub page. */
  heading: string;
  /** Meta description, ~150 chars. */
  metaDescription: string;
  /** Two short paragraphs of genuinely useful orientation for the hub page. */
  intro: string[];
  color: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    name: 'Personal Finance',
    slug: 'personal-finance',
    short: 'Personal Finance',
    heading: 'Free Personal Finance Calculators',
    metaDescription: 'Free mortgage and compound interest calculators with clear assumptions, year-by-year tables and instant results. No sign-up.',
    intro: [
      'Big money decisions, such as a home loan or a long-term savings plan, are mostly arithmetic over a long time. These calculators show the arithmetic so you can compare options before talking to a lender or adviser.',
      'Every result lists its assumptions. Rates, taxes and fees vary by lender and location, so treat the output as a planning estimate rather than a quote.',
    ],
    color: '#0ea5e9',
  },
  {
    name: 'Finance & Business',
    slug: 'finance-business',
    short: 'Business',
    heading: 'Free Business & Pricing Calculators',
    metaDescription: 'Free freelance rate, profit margin, ROAS, Amazon FBA and salary take-home calculators for freelancers and small businesses.',
    intro: [
      'Pricing, margins and ad spend decide whether a small business or freelance practice makes money. These calculators turn those inputs into the numbers that matter: break-even points, hourly rates and profit after fees.',
      'They run in your browser, so you can try uncomfortable what-if scenarios without sharing your financials with anyone.',
    ],
    color: '#10b981',
  },
  {
    name: 'Social Media',
    slug: 'social-media',
    short: 'Creators',
    heading: 'Free Creator & Social Media Earnings Calculators',
    metaDescription: 'Free YouTube RPM, Shorts, TikTok brand deal, Instagram engagement and Patreon calculators for creators. Instant estimates, clear assumptions.',
    intro: [
      'Creator income depends on niche, audience location, format and how you monetise. These calculators put typical ranges behind each assumption so you can see what is driving an estimate and what you can change.',
      'Platform payouts shift often and vary by channel. Use the numbers to plan and negotiate, not as a promise of what you will earn.',
    ],
    color: '#f43f5e',
  },
  {
    name: 'Everyday Math',
    slug: 'everyday-math',
    short: 'Everyday Math',
    heading: 'Free Everyday Math Calculators',
    metaDescription: 'Free percentage calculator and everyday math tools. Fast answers with the working shown. No sign-up needed.',
    intro: [
      'Percentages, discounts, tips and changes over time come up constantly at work and at home. These tools give you the answer and the sentence that explains it, so you can check your own reasoning.',
    ],
    color: '#8b5cf6',
  },
  {
    name: 'Lifestyle',
    slug: 'lifestyle',
    short: 'Health',
    heading: 'Free Health & Lifestyle Calculators',
    metaDescription: 'Free BMI calculator and macro and TDEE calorie planner using standard formulas. Metric and imperial units. For general information only.',
    intro: [
      'Calorie, macro and BMI calculators rely on population-level formulas such as Mifflin-St Jeor and the WHO BMI categories. They are useful starting points, but they cannot see muscle mass, medical history or individual needs.',
      'Use them for general information and talk to a qualified professional before making significant changes to diet or exercise.',
    ],
    color: '#d97706',
  },
  {
    name: 'Date & Time',
    slug: 'date-time',
    short: 'Date & Time',
    heading: 'Free Date & Time Calculators',
    metaDescription: 'Free date calculators: days between dates, days until a date, weekday finder and country holiday countdowns.',
    intro: [
      'Counting days between two dates, finding the weekday for a date, or checking how long until the next public holiday is easy to get wrong by hand, especially across month ends and leap years.',
    ],
    color: '#2563eb',
  },
  {
    name: 'SEO & Webmaster',
    slug: 'seo-webmaster',
    short: 'SEO',
    heading: 'Free SEO & Webmaster Tools',
    metaDescription: 'Free JSON-LD schema markup generator for FAQ, article, product and recipe pages. Copy-ready structured data, no sign-up.',
    intro: [
      'Structured data helps search engines understand a page and can make it eligible for rich results. These tools generate valid JSON-LD you can paste into your site.',
    ],
    color: '#f59e0b',
  },
  {
    name: 'Developer',
    slug: 'developer',
    short: 'Developer',
    heading: 'Free Developer Tools',
    metaDescription: 'Free plain-English to regex generator and tester. Build and test regular expressions live in your browser.',
    intro: [
      'Small utilities that save a trip to the docs: build a regular expression from plain English, then test it against real text before it goes into your code.',
    ],
    color: '#06b6d4',
  },
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoryByName(name: string): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.name === name);
}
