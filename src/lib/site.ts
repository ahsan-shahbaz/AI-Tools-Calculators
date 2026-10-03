export const SITE_NAME = 'ToolCalculators';
export const SITE_URL = 'https://tool-calculators.com';
export const SITE_TAGLINE = 'Free online calculators for money, business, creators and everyday decisions';

/** Replace once the domain mailbox exists. Shown on the About and Contact pages. */
export const CONTACT_EMAIL = 'hello@tool-calculators.com';

/** ISO date of the last meaningful content/formula review. Update when you revise tools. */
export const CONTENT_UPDATED = '2026-10-04';

/**
 * Monetization switches. Everything is OFF until you set these environment variables
 * (in .env.local for local testing, or in your host's dashboard for production).
 *
 *   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
 *   NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD=1234567890   (optional, per ad unit)
 *   NEXT_PUBLIC_ADSENSE_SLOT_IN_FEED=1234567890
 *   NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE=1234567890
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX        (optional analytics, consent-gated)
 *   NEXT_PUBLIC_GSC_VERIFICATION=token                 (Google Search Console meta tag)
 */
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? '';
export const ADSENSE_SLOTS: Record<string, string> = {
  leaderboard: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LEADERBOARD ?? '',
  'in-feed': process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_FEED ?? '',
  rectangle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE ?? '',
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RECTANGLE ?? '',
};
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';
export const CONSENT_REQUIRED = Boolean(ADSENSE_CLIENT || GA_MEASUREMENT_ID);
