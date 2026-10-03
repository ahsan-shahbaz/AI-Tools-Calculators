import { describe, expect, it } from 'vitest';
import { calculateMortgage, type MortgageInputs } from './mortgage-calculator';

const base: MortgageInputs = {
  homePrice: 400_000,
  downPaymentPercent: 20,
  interestRate: 6,
  termYears: 30,
  propertyTaxRate: 1.2,
  homeInsurancePerYear: 1_500,
  hoaPerMonth: 0,
  extraMonthlyPayment: 0,
};

describe('calculateMortgage', () => {
  it('matches the standard amortisation formula', () => {
    const r = calculateMortgage(base);
    expect(r.loanAmount).toBe(320_000);
    expect(r.principalAndInterest).toBeCloseTo(1918.56, 2);
    expect(r.propertyTax).toBe(400);
    expect(r.insurance).toBe(125);
    expect(r.pmi).toBe(0);
    // Independent check: total of 360 level payments minus principal (within rounding of the payment).
    expect(r.totalInterest).toBeCloseTo(r.principalAndInterest * 360 - 320_000, -1);
    expect(r.payoffMonths).toBe(360);
    expect(r.yearly).toHaveLength(30);
    expect(r.yearly[29].endingBalance).toBeCloseTo(0, 0);
  });

  it('adds PMI when the down payment is under 20%', () => {
    const r = calculateMortgage({ ...base, downPaymentPercent: 10 });
    expect(r.pmi).toBeCloseTo((360_000 * 0.005) / 12, 2);
  });

  it('handles a 0% interest rate without dividing by zero', () => {
    const r = calculateMortgage({ ...base, interestRate: 0 });
    expect(r.principalAndInterest).toBeCloseTo(320_000 / 360, 2);
    expect(r.totalInterest).toBe(0);
  });

  it('reports interest and time saved by extra payments', () => {
    const r = calculateMortgage({ ...base, extraMonthlyPayment: 300 });
    expect(r.monthsSavedByExtra).toBeGreaterThan(40);
    expect(r.interestSavedByExtra).toBeGreaterThan(50_000);
    expect(r.payoffMonths).toBeLessThan(360);
  });

  it('never returns NaN or Infinity for hostile input', () => {
    const r = calculateMortgage({
      homePrice: NaN, downPaymentPercent: -5, interestRate: Infinity, termYears: 0,
      propertyTaxRate: -1, homeInsurancePerYear: NaN, hoaPerMonth: -3, extraMonthlyPayment: NaN,
    });
    for (const v of Object.values(r)) {
      if (typeof v === 'number') expect(Number.isFinite(v)).toBe(true);
    }
  });
});
