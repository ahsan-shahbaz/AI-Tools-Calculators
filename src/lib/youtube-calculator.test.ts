import { describe, expect, it } from 'vitest';
import type { CountryTier, NicheInfo } from '@/types';
import { calculateViewsForMilestone, calculateYouTubeEarnings } from './youtube-calculator';

const niche: NicheInfo = {
  id: 'test',
  name: 'Test niche',
  icon: 'T',
  minRpm: 2,
  avgRpm: 4,
  maxRpm: 8,
  shortsAvgRpm: 0.05,
  description: '',
  topSponsors: [],
};

const country: CountryTier = {
  id: 'test',
  name: 'Test region',
  multiplier: 1.5,
  flag: 'T',
  tier: 1,
};

function expectFiniteNumbers(value: object): void {
  for (const entry of Object.values(value)) {
    if (typeof entry === 'number') {
      expect(Number.isFinite(entry)).toBe(true);
    } else if (typeof entry === 'object' && entry !== null) {
      expectFiniteNumbers(entry);
    }
  }
}

describe('calculateYouTubeEarnings', () => {
  it('calculates long-form views, revenue, and sponsorship estimates', () => {
    const result = calculateYouTubeEarnings(10_000, 'longform', niche, country);

    expect(result.dailyViews).toBe(10_000);
    expect(result.monthlyViews).toBe(304_100);
    expect(result.yearlyViews).toBe(3_650_000);
    expect(result.effectiveRpm).toBe(6);
    expect(result.dailyEarnings).toEqual({ min: 30, avg: 60, max: 120 });
    expect(result.monthlyEarnings).toEqual({ min: 912.3, avg: 1_824.6, max: 3_649.2 });
    expect(result.sponsorshipEstimate.avg).toBe(4_014.12);
    expect(result.totalPotentialMonthly).toBe(5_838.72);
  });

  it('returns zero views and earnings for zero daily views', () => {
    const result = calculateYouTubeEarnings(0, 'longform', niche, country);

    expect(result.dailyViews).toBe(0);
    expect(result.monthlyViews).toBe(0);
    expect(result.yearlyViews).toBe(0);
    expect(result.dailyEarnings).toEqual({ min: 0, avg: 0, max: 0 });
    expect(result.monthlyEarnings).toEqual({ min: 0, avg: 0, max: 0 });
    expect(result.yearlyEarnings).toEqual({ min: 0, avg: 0, max: 0 });
    expect(result.sponsorshipEstimate).toEqual({ min: 0, avg: 0, max: 0 });
    expect(result.totalPotentialMonthly).toBe(0);
  });

  it('clamps negative views to zero', () => {
    const result = calculateYouTubeEarnings(-1_000, 'longform', niche, country);

    expect(result.dailyViews).toBe(0);
    expect(result.monthlyViews).toBe(0);
    expect(result.totalPotentialMonthly).toBe(0);
  });

  it.each([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    'normalizes non-finite daily views (%s) to zero',
    (dailyViews) => {
      const result = calculateYouTubeEarnings(dailyViews, 'longform', niche, country);

      expect(result.dailyViews).toBe(0);
      expectFiniteNumbers(result);
    }
  );

  it('keeps results finite for extreme view counts', () => {
    const result = calculateYouTubeEarnings(Number.MAX_VALUE, 'longform', niche, country);

    expect(result.dailyViews).toBe(Number.MAX_SAFE_INTEGER);
    expectFiniteNumbers(result);
  });
});

describe('calculateViewsForMilestone', () => {
  it('calculates monthly and daily views for a positive RPM', () => {
    expect(calculateViewsForMilestone(5_000, 5)).toEqual({
      monthlyViewsNeeded: 1_000_000,
      dailyViewsNeeded: 32_884,
    });
  });

  it.each([0, -1, Number.NaN])('returns zero when RPM is %s', (effectiveRpm) => {
    expect(calculateViewsForMilestone(5_000, effectiveRpm)).toEqual({
      monthlyViewsNeeded: 0,
      dailyViewsNeeded: 0,
    });
  });

  it('keeps division results finite for extreme targets and tiny RPM values', () => {
    const result = calculateViewsForMilestone(Number.MAX_VALUE, Number.MIN_VALUE);

    expectFiniteNumbers(result);
    expect(result.monthlyViewsNeeded).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
  });
});