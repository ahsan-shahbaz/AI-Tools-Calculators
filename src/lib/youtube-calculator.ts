import { VideoFormat, NicheInfo, CountryTier, CalculationResult } from '@/types';

const MAX_CALCULATION_INPUT = Number.MAX_SAFE_INTEGER;

function normalizeNonNegative(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value, 0), MAX_CALCULATION_INPUT);
}

function roundCurrency(value: number): number {
  if (!Number.isFinite(value)) return MAX_CALCULATION_INPUT;
  return Number(value.toFixed(2));
}

export function calculateYouTubeEarnings(
  dailyViews: number,
  format: VideoFormat,
  niche: NicheInfo,
  country: CountryTier
): CalculationResult {
  const normalizedDailyViews = normalizeNonNegative(dailyViews);
  const countryMultiplier = normalizeNonNegative(country.multiplier);
  const monthlyViews = normalizedDailyViews * 30.41;
  const yearlyViews = normalizedDailyViews * 365;

  let baseMinRpm: number;
  let baseAvgRpm: number;
  let baseMaxRpm: number;

  if (format === 'shorts') {
    // Shorts RPM is typically $0.03 - $0.09 across most niches
    baseAvgRpm = normalizeNonNegative(niche.shortsAvgRpm);
    baseMinRpm = baseAvgRpm * 0.7;
    baseMaxRpm = baseAvgRpm * 1.5;
  } else {
    baseMinRpm = normalizeNonNegative(niche.minRpm);
    baseAvgRpm = normalizeNonNegative(niche.avgRpm);
    baseMaxRpm = normalizeNonNegative(niche.maxRpm);
  }

  // Apply country multiplier
  const effectiveMinRpm = roundCurrency(baseMinRpm * countryMultiplier);
  const effectiveAvgRpm = roundCurrency(baseAvgRpm * countryMultiplier);
  const effectiveMaxRpm = roundCurrency(baseMaxRpm * countryMultiplier);

  // AdSense Earnings = (Views / 1000) * RPM
  const dailyEarnings = {
    min: roundCurrency((normalizedDailyViews / 1000) * effectiveMinRpm),
    avg: roundCurrency((normalizedDailyViews / 1000) * effectiveAvgRpm),
    max: roundCurrency((normalizedDailyViews / 1000) * effectiveMaxRpm),
  };

  const monthlyEarnings = {
    min: roundCurrency((monthlyViews / 1000) * effectiveMinRpm),
    avg: roundCurrency((monthlyViews / 1000) * effectiveAvgRpm),
    max: roundCurrency((monthlyViews / 1000) * effectiveMaxRpm),
  };

  const yearlyEarnings = {
    min: roundCurrency((yearlyViews / 1000) * effectiveMinRpm),
    avg: roundCurrency((yearlyViews / 1000) * effectiveAvgRpm),
    max: roundCurrency((yearlyViews / 1000) * effectiveMaxRpm),
  };

  // Brand Sponsorship Estimation:
  // For long-form, brand deals pay ~$15 to $35 CPM. For channels with >20k monthly views
  const sponsorCpmAvg = format === 'longform' ? 22 * countryMultiplier : 2.5 * countryMultiplier;
  const eligibleSponsorViews = Math.max(0, monthlyViews * 0.4); // ~40% views on sponsored integrations
  const sponsorshipEstimate = {
    min: roundCurrency((eligibleSponsorViews / 1000) * (sponsorCpmAvg * 0.6)),
    avg: roundCurrency((eligibleSponsorViews / 1000) * sponsorCpmAvg),
    max: roundCurrency((eligibleSponsorViews / 1000) * (sponsorCpmAvg * 1.6)),
  };

  const totalPotentialMonthly = roundCurrency(monthlyEarnings.avg + sponsorshipEstimate.avg);

  return {
    dailyViews: normalizedDailyViews,
    monthlyViews: Math.round(monthlyViews),
    yearlyViews: Math.round(yearlyViews),
    effectiveRpm: effectiveAvgRpm,
    dailyEarnings,
    monthlyEarnings,
    yearlyEarnings,
    sponsorshipEstimate,
    totalPotentialMonthly,
  };
}

export function calculateViewsForMilestone(
  targetMonthlyDollars: number,
  effectiveRpm: number
): { monthlyViewsNeeded: number; dailyViewsNeeded: number } {
  const target = normalizeNonNegative(targetMonthlyDollars);
  const rpm = normalizeNonNegative(effectiveRpm);
  if (rpm === 0 || target === 0) return { monthlyViewsNeeded: 0, dailyViewsNeeded: 0 };

  const rawMonthlyViews = (target / rpm) * 1000;
  const monthlyViewsNeeded = Number.isFinite(rawMonthlyViews)
    ? Math.min(Math.round(rawMonthlyViews), MAX_CALCULATION_INPUT)
    : MAX_CALCULATION_INPUT;
  const dailyViewsNeeded = Math.min(Math.round(monthlyViewsNeeded / 30.41), MAX_CALCULATION_INPUT);

  return { monthlyViewsNeeded, dailyViewsNeeded };
}
