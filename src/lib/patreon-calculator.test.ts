import { describe, expect, it } from 'vitest';
import type { PatreonEarningsInputs } from '@/types/social-tools';
import { calculatePatreonEarnings } from './patreon-calculator';

const normalInputs: PatreonEarningsInputs = {
  paidMembers: 100,
  averageMonthlyPledge: 5,
  estimatedFeePercent: 10,
  otherMonthlyCosts: 100,
};

function expectFiniteNumbers(value: object): void {
  for (const entry of Object.values(value)) {
    if (typeof entry === 'number') {
      expect(Number.isFinite(entry)).toBe(true);
    }
  }
}

describe('calculatePatreonEarnings', () => {
  it('calculates gross pledges, estimated deductions, and net projections', () => {
    expect(calculatePatreonEarnings(normalInputs)).toEqual({
      paidMembers: 100,
      grossMonthlyPledges: 500,
      estimatedFees: 50,
      otherMonthlyCosts: 100,
      estimatedMonthlyNet: 350,
      projectedAnnualNet: 4_200,
      estimatedNetPerMember: 3.5,
      netMarginPercent: 70,
    });
  });

  it('returns zero pledge revenue when there are no paid members', () => {
    const result = calculatePatreonEarnings({ ...normalInputs, paidMembers: 0, otherMonthlyCosts: 0 });

    expect(result.grossMonthlyPledges).toBe(0);
    expect(result.estimatedFees).toBe(0);
    expect(result.estimatedMonthlyNet).toBe(0);
    expect(result.estimatedNetPerMember).toBe(0);
    expect(result.netMarginPercent).toBe(0);
  });

  it('normalizes negative inputs to zero', () => {
    const negativeInputs: PatreonEarningsInputs = {
      paidMembers: -10,
      averageMonthlyPledge: -5,
      estimatedFeePercent: -10,
      otherMonthlyCosts: -100,
    };

    const result = calculatePatreonEarnings(negativeInputs);

    expect(result).toEqual({
      paidMembers: 0,
      grossMonthlyPledges: 0,
      estimatedFees: 0,
      otherMonthlyCosts: 0,
      estimatedMonthlyNet: 0,
      projectedAnnualNet: 0,
      estimatedNetPerMember: 0,
      netMarginPercent: 0,
    });
  });

  it('caps fees at 100 percent and keeps extreme inputs finite', () => {
    const extremeInputs: PatreonEarningsInputs = {
      paidMembers: Number.MAX_VALUE,
      averageMonthlyPledge: Number.MAX_VALUE,
      estimatedFeePercent: Number.MAX_VALUE,
      otherMonthlyCosts: Number.MAX_VALUE,
    };

    const result = calculatePatreonEarnings(extremeInputs);

    expect(result.estimatedFees).toBe(result.grossMonthlyPledges);
    expect(result.paidMembers).toBe(Number.MAX_SAFE_INTEGER);
    expectFiniteNumbers(result);
  });

  it('normalizes non-finite values and caps the fee percentage', () => {
    const invalidInputs: PatreonEarningsInputs = {
      paidMembers: Number.NaN,
      averageMonthlyPledge: Number.POSITIVE_INFINITY,
      estimatedFeePercent: Number.NaN,
      otherMonthlyCosts: Number.NEGATIVE_INFINITY,
    };

    const result = calculatePatreonEarnings(invalidInputs);

    expect(result.grossMonthlyPledges).toBe(0);
    expectFiniteNumbers(result);
  });
});