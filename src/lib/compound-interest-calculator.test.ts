import { describe, expect, it } from 'vitest';
import { calculateCompoundInterest } from './compound-interest-calculator';

const base = {
  initialDeposit: 10_000,
  monthlyContribution: 0,
  annualRate: 7,
  years: 10,
  compoundsPerYear: 12 as const,
  inflationRate: 0,
};

describe('calculateCompoundInterest', () => {
  it('matches the closed-form compound growth formula', () => {
    const r = calculateCompoundInterest(base);
    expect(r.finalBalance).toBeCloseTo(10_000 * (1 + 0.07 / 12) ** 120, 1);
    expect(r.totalContributions).toBe(10_000);
    expect(r.yearly).toHaveLength(10);
  });

  it('adds monthly contributions', () => {
    const r = calculateCompoundInterest({ ...base, initialDeposit: 0, monthlyContribution: 500, annualRate: 0 });
    expect(r.finalBalance).toBe(60_000);
    expect(r.totalInterest).toBe(0);
  });

  it('applies inflation to produce a todays-money figure', () => {
    const r = calculateCompoundInterest({ ...base, inflationRate: 3 });
    expect(r.inflationAdjustedBalance).toBeCloseTo(r.finalBalance / 1.03 ** 10, 1);
    expect(r.inflationAdjustedBalance).toBeLessThan(r.finalBalance);
  });

  it('survives bad input', () => {
    const r = calculateCompoundInterest({
      initialDeposit: NaN, monthlyContribution: -4, annualRate: Infinity, years: 0,
      compoundsPerYear: 7 as never, inflationRate: NaN,
    });
    expect(Number.isFinite(r.finalBalance)).toBe(true);
  });
});
