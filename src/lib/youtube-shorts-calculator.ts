import { ShortsEarningsInputs, ShortsEarningsResult } from '@/types/social-tools';

export function calculateYouTubeShortsEarnings(inputs: ShortsEarningsInputs): ShortsEarningsResult {
  const { dailyShortViews, avgCpm, videosPerWeek, revenueShare, retentionBonus } = inputs;

  const monthlyViews = dailyShortViews * 30.41;
  const effectiveCpm = Math.max(avgCpm * (1 + retentionBonus / 100), 0.01);
  const monthlyEarnings = Number(((monthlyViews / 1000) * effectiveCpm * (revenueShare / 100)).toFixed(2));
  const dailyEarnings = Number(((dailyShortViews / 1000) * effectiveCpm * (revenueShare / 100)).toFixed(2));
  const earningsPerVideo = Number(((monthlyEarnings / (videosPerWeek * 4.35)).toFixed(2)));
  const annualEarnings = Number((monthlyEarnings * 12).toFixed(2));

  return {
    monthlyViews: Math.round(monthlyViews),
    monthlyEarnings,
    dailyEarnings,
    earningsPerVideo,
    annualEarnings,
    effectiveCpm: Number(effectiveCpm.toFixed(2))
  };
}
