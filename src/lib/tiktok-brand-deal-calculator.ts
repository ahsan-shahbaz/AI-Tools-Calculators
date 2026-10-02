import { TikTokBrandDealInputs, TikTokBrandDealResult } from '@/types/social-tools';

export function calculateTikTokBrandDealRate(inputs: TikTokBrandDealInputs): TikTokBrandDealResult {
  const { followers, engagementRate, avgViewsPerPost, nicheMultiplier, postsPerMonth, packageType } = inputs;

  const engagementFactor = Math.min(Math.max(engagementRate, 1), 20) / 10;
  const audiencePower = Math.min(Math.max(followers / 1000, 0.5), 1000);
  const viewFactor = Math.min(Math.max(avgViewsPerPost / 10000, 0.5), 100);

  const packageModifiers = {
    starter: 0.8,
    standard: 1,
    premium: 1.5,
  };

  const baseRate = ((audiencePower * engagementFactor * viewFactor * nicheMultiplier) / 2) * packageModifiers[packageType];
  const estimatedRate = Math.max(Number(baseRate.toFixed(0)), 150);
  const monthlyPotential = Number((estimatedRate * postsPerMonth).toFixed(0));

  let engagementTier = 'Growing';
  if (engagementRate >= 8) engagementTier = 'High Authority';
  else if (engagementRate >= 5) engagementTier = 'Strong Reach';
  else if (engagementRate >= 3) engagementTier = 'Developing';

  let packageLabel = 'Starter Package';
  if (packageType === 'standard') packageLabel = 'Standard Partnership';
  else if (packageType === 'premium') packageLabel = 'Premium Campaign';

  return {
    baseRate: Number(baseRate.toFixed(0)),
    estimatedRate,
    monthlyPotential,
    packageLabel,
    engagementTier
  };
}
