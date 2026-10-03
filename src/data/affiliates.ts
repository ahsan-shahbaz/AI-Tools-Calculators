import type { ToolCategory } from '@/types';

export interface Resource {
  name: string;
  blurb: string;
  cta: string;
  /** Plain destination. Used as-is when no `trackedUrl` is set. */
  url: string;
  /**
   * Paste your approved affiliate/tracking link here once the program accepts you.
   * When set, the link is labelled "Affiliate", gets rel="sponsored", and the disclosure line appears.
   */
  trackedUrl?: string;
}

/**
 * Suggested resources shown under each calculator. These are plain links today (no commission),
 * which keeps the site honest until you join each program. Add a `trackedUrl` per entry to monetise it.
 */
export const RESOURCES: Record<ToolCategory, Resource[]> = {
  'Personal Finance': [
    { name: 'CFPB Owning a Home', blurb: 'Free, unbiased guides to loan estimates, closing costs and comparing lenders.', cta: 'Read the guides', url: 'https://www.consumerfinance.gov/owning-a-home/' },
    { name: 'LendingTree', blurb: 'Compare loan offers from multiple lenders in one place.', cta: 'Compare offers', url: 'https://www.lendingtree.com' },
    { name: 'Investor.gov', blurb: 'Compound interest and investing basics from the U.S. SEC.', cta: 'Learn the basics', url: 'https://www.investor.gov' },
  ],
  'Finance & Business': [
    { name: 'FreshBooks', blurb: 'Invoicing and expense tracking for freelancers and small businesses.', cta: 'See invoicing tools', url: 'https://www.freshbooks.com' },
    { name: 'Shopify', blurb: 'Launch an online store with built-in payments and shipping.', cta: 'Explore Shopify', url: 'https://www.shopify.com' },
    { name: 'Canva', blurb: 'Design proposals, product images and ads without a designer.', cta: 'Try Canva', url: 'https://www.canva.com' },
  ],
  'Social Media': [
    { name: 'vidIQ', blurb: 'Keyword research and analytics to grow a YouTube channel.', cta: 'Explore vidIQ', url: 'https://vidiq.com' },
    { name: 'Epidemic Sound', blurb: 'Royalty-free music and effects that avoid copyright claims.', cta: 'Browse music', url: 'https://www.epidemicsound.com' },
    { name: 'Descript', blurb: 'Edit video and audio by editing the transcript.', cta: 'Try Descript', url: 'https://www.descript.com' },
  ],
  'Everyday Math': [
    { name: 'Khan Academy', blurb: 'Free lessons on percentages, ratios and everyday maths.', cta: 'Start learning', url: 'https://www.khanacademy.org/math' },
    { name: 'Notion', blurb: 'Keep calculations, budgets and notes in one workspace.', cta: 'Explore Notion', url: 'https://www.notion.so' },
  ],
  Lifestyle: [
    { name: 'Cronometer', blurb: 'Track calories, macros and micronutrients with a detailed food database.', cta: 'Explore Cronometer', url: 'https://cronometer.com' },
    { name: 'MyFitnessPal', blurb: 'Log meals and workouts and follow your progress.', cta: 'Explore MyFitnessPal', url: 'https://www.myfitnesspal.com' },
  ],
  'Date & Time': [
    { name: 'Google Calendar', blurb: 'Turn countdowns and deadlines into reminders.', cta: 'Open Calendar', url: 'https://calendar.google.com' },
    { name: 'Notion', blurb: 'Plan projects and timelines in one place.', cta: 'Explore Notion', url: 'https://www.notion.so' },
  ],
  'SEO & Webmaster': [
    { name: 'Google Search Console', blurb: 'Free tool to monitor how your pages appear in Google Search.', cta: 'Open Search Console', url: 'https://search.google.com/search-console' },
    { name: 'Semrush', blurb: 'Keyword research and site audits for SEO.', cta: 'Explore Semrush', url: 'https://www.semrush.com' },
    { name: 'Hostinger', blurb: 'Fast, affordable web hosting for new sites.', cta: 'See hosting plans', url: 'https://www.hostinger.com' },
  ],
  Developer: [
    { name: 'regex101', blurb: 'Debug and explain regular expressions across flavours.', cta: 'Open regex101', url: 'https://regex101.com' },
    { name: 'MDN Web Docs', blurb: 'Reference for JavaScript regular expressions and more.', cta: 'Read the docs', url: 'https://developer.mozilla.org/docs/Web/JavaScript/Guide/Regular_expressions' },
  ],
};
