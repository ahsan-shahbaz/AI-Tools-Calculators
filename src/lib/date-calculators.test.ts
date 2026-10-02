import { describe, expect, it } from 'vitest';
import { countBusinessDays, dateDuration, daysBetween, getYearProgress } from './date-calculators';

describe('date calculators', () => {
  it('counts calendar days across leap day without timezone drift', () => {
    expect(daysBetween('2024-02-28', '2024-03-01')).toBe(2);
  });

  it('decomposes a date range into calendar years, months, and days', () => {
    expect(dateDuration('2024-02-29', '2025-03-01')).toEqual({
      years: 1,
      months: 0,
      days: 1,
      totalDays: 366,
    });
  });

  it('counts weekdays inclusively and excludes weekends', () => {
    expect(countBusinessDays('2024-01-05', '2024-01-08')).toBe(2);
  });

  it('returns ISO week and leap-year progress for a date', () => {
    expect(getYearProgress('2024-12-31')).toEqual({
      isoWeek: 1,
      isoYear: 2025,
      dayOfYear: 366,
      daysRemaining: 0,
      progressPercent: 100,
    });
    expect(getYearProgress('2021-01-01')).toMatchObject({ isoWeek: 53, isoYear: 2020 });
  });

  it('rejects invalid or reversed dates', () => {
    expect(daysBetween('2024-02-30', '2024-03-01')).toBeNull();
    expect(dateDuration('2024-05-01', '2024-04-30')).toBeNull();
    expect(countBusinessDays('2024-05-01', '2024-04-30')).toBeNull();
  });
});