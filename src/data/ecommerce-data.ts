import { PlatformPreset } from '@/types/ecommerce';

export const PLATFORM_PRESETS: PlatformPreset[] = [
  {
    id: 'shopify',
    name: 'Shopify / DTC Store',
    icon: '🛍️',
    defaultProcessingFeeRate: 2.9,
    defaultProcessingFixed: 0.30,
    defaultPlatformFeeRate: 2.0,
    description: 'Direct-to-consumer store using Shopify Payments / Stripe. High margins, full customer data ownership.'
  },
  {
    id: 'amazon_fba',
    name: 'Amazon FBA',
    icon: '📦',
    defaultProcessingFeeRate: 0.0,
    defaultProcessingFixed: 0.0,
    defaultPlatformFeeRate: 15.0, // Standard 15% referral fee
    description: 'Amazon marketplace with Prime fulfillment. High buyer conversion but requires higher referral fee buffer.'
  },
  {
    id: 'tiktok_shop',
    name: 'TikTok Shop',
    icon: '🎵',
    defaultProcessingFeeRate: 0.0,
    defaultProcessingFixed: 0.0,
    defaultPlatformFeeRate: 6.0,
    description: 'Viral short-video commerce. Fast-scaling product trends with integrated in-app checkout.'
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce / Custom',
    icon: '⚙️',
    defaultProcessingFeeRate: 2.9,
    defaultProcessingFixed: 0.30,
    defaultPlatformFeeRate: 0.0,
    description: 'Self-hosted WordPress store. Zero platform cuts, only standard payment processing fees apply.'
  }
];

export interface NichePreset {
  name: string;
  price: number;
  cogs: number;
  shipping: number;
}

export const ECOM_NICHE_PRESETS: NichePreset[] = [
  { name: 'Apparel & Streetwear', price: 48.00, cogs: 11.50, shipping: 4.80 },
  { name: 'Beauty & Skincare Serum', price: 38.00, cogs: 4.50, shipping: 3.80 },
  { name: 'Tech Gadget / Wireless Charger', price: 54.00, cogs: 14.00, shipping: 5.20 },
  { name: 'Fitness & Health Supplement', price: 42.00, cogs: 7.20, shipping: 4.50 },
  { name: 'Home & Kitchen Accessory', price: 34.00, cogs: 8.00, shipping: 5.00 }
];

export const ECOM_AFFILIATES = [
  {
    title: 'Shopify ($1/Month Offer)',
    badge: 'Best E-com Platform',
    description: 'Build your online storefront, accept payments worldwide, and access thousands of 1-click upsell apps.',
    ctaText: 'Claim $1/Mo Shopify Deal',
    link: 'https://shopify.com',
    icon: '🛍️'
  },
  {
    title: 'Helium 10 / Jungle Scout',
    badge: 'Amazon & Product Research',
    description: 'Find high-demand, low-competition physical products with verified monthly sales volume and profit margins.',
    ctaText: 'Explore Product Finder',
    link: 'https://helium10.com',
    icon: '📊'
  },
  {
    title: 'Klaviyo Email & SMS',
    badge: 'Zero-Ad-Cost Revenue',
    description: 'Recover abandoned carts and turn 1-time buyers into repeat customers to boost your blended lifetime value (LTV).',
    ctaText: 'Start Free Klaviyo Account',
    link: 'https://klaviyo.com',
    icon: '✉️'
  }
];
