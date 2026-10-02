import { EcommerceInputs, EcommerceCalculationResult, AIOptimizationRecommendation } from '@/types/ecommerce';

export async function generateEcommerceAiOptimization(
  inputs: EcommerceInputs,
  calc: EcommerceCalculationResult,
  productName: string
): Promise<AIOptimizationRecommendation> {
  // Simulate AI reasoning delay for good UX
  await new Promise((resolve) => setTimeout(resolve, 600));

  const { breakEvenRoas, grossMarginPercent, breakEvenCpa, sellingPrice } = calc;

  // 1. Determine Margin Health
  let marginHealth: AIOptimizationRecommendation['marginHealth'];
  let summaryDiagnosis: string;

  if (grossMarginPercent >= 70 && breakEvenRoas <= 1.45) {
    marginHealth = 'Excellent';
    summaryDiagnosis = `Outstanding unit economics! With a ${grossMarginPercent}% gross margin and a low break-even ROAS of ${breakEvenRoas}x, you have massive ad buffer to outbid competitors on Facebook, TikTok, and Google Ads.`;
  } else if (grossMarginPercent >= 50 && breakEvenRoas <= 2.0) {
    marginHealth = 'Healthy';
    summaryDiagnosis = `Solid, scalable margins. A break-even ROAS of ${breakEvenRoas}x gives you comfortable room to achieve a 20%+ net profit margin as long as your blended ad campaigns perform around 2.2x - 2.8x ROAS.`;
  } else if (grossMarginPercent >= 35 && breakEvenRoas <= 2.8) {
    marginHealth = 'Thin Margin Risk';
    summaryDiagnosis = `Caution: Thin margin territory. Needing a ${breakEvenRoas}x ROAS just to break even leaves you vulnerable to rising CPMs and ad account fluctuations. Prioritize bundling and AOV immediately.`;
  } else {
    marginHealth = 'Critical Danger';
    summaryDiagnosis = `High Risk: Your product margin is too compressed (${grossMarginPercent}%). Needing a ${breakEvenRoas}x ROAS to break even means most paid traffic campaigns will lose money. You must raise prices or lower supplier COGS.`;
  }

  // 2. AOV Tactics
  const bundleThreshold = Math.round(sellingPrice * 1.6);
  const freeShippingThreshold = Math.round(sellingPrice * 1.35);

  const aovTactics = [
    {
      tactic: `Tiered Quantity Bundles ("Buy 2 Save 15%, Buy 3 Get 1 Free")`,
      description: `Create a pre-selected multi-pack bundle on your product page. Since shipping cost scales minimally on additional units, your second item carries up to 85% gross margin.`,
      impact: `+22% to +35% Increase in Average Order Value (AOV)`
    },
    {
      tactic: `Dynamic Free Shipping Progress Bar at $${freeShippingThreshold}`,
      description: `Set your free shipping threshold 25%-35% higher than your primary product price ($${sellingPrice}). Customers will naturally add an accessory or refill to avoid a $5 shipping fee.`,
      impact: `Reduces cart abandonment by up to 18%`
    },
    {
      tactic: `Post-Purchase 1-Click Upsell (Complementary Add-On)`,
      description: `Offer an essential accessory, extended warranty, or premium refill immediately after checkout before the receipt page. Zero extra ad acquisition cost.`,
      impact: `12%-20% Take-rate with 100% net contribution`
    }
  ];

  // 3. Ad Angle Hooks for Paid Social (Meta / TikTok / YouTube Shorts)
  const itemLabel = productName.trim() ? productName : 'your product';
  const adAngleHooks = [
    {
      hookType: 'Problem-Agitation-Solution (Direct Response)',
      script: `"If you still struggle with [Core Problem], stop wasting money on [Traditional Method]. Here is why ${itemLabel} changes everything in 30 seconds..."`,
      whyItWorks: 'Directly calls out the prospect’s current frustration and creates urgency in the first 3 seconds.'
    },
    {
      hookType: 'The "Unboxing & First Impression" Social Proof',
      script: `"I kept seeing this viral ${itemLabel} all over TikTok, so I ordered it to see if it actually works or if it's overhyped..."`,
      whyItWorks: 'Disarms ad skepticism by adopting a third-party objective tester persona.'
    },
    {
      hookType: 'The "Before vs After" Comparison Split-Screen',
      script: `"Side-by-side comparison: On the left, doing it without ${itemLabel}. On the right, doing it with it. Watch the difference..."`,
      whyItWorks: 'Visual proof hooks capture retention fast on sound-off mobile feeds, driving higher click-through-rates (CTR).'
    }
  ];

  // 4. Strategic Pricing Advice
  const recommendedNewPrice = Math.round(sellingPrice * 1.15) - 0.01;
  const pricingAdvice = grossMarginPercent < 55
    ? `Consider testing a price increase from $${sellingPrice} to $${recommendedNewPrice}. In e-commerce, a 15% price increase rarely drops conversion rates by more than 3%, but drastically drops your break-even ROAS from ${breakEvenRoas}x down to ~${(breakEvenRoas * 0.82).toFixed(2)}x.`
    : `Your pricing is healthy. Focus on testing 5-10 creative ad hooks weekly to keep customer acquisition cost (CAC) below your max target of $${breakEvenCpa.toFixed(2)}.`;

  return {
    marginHealth,
    summaryDiagnosis,
    aovTactics,
    adAngleHooks,
    pricingAdvice
  };
}
