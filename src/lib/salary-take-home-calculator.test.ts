import { describe, expect, it } from 'vitest';
import type { SalaryTakeHomeInputs } from '@/types/business-tools';
import { calculateSalaryTakeHome } from './salary-take-home-calculator';

const normalInputs: SalaryTakeHomeInputs = {
  annualSalary: 100_000,
  bonus: 5_000,
  hoursPerWeek: 40,
  weeksPerYear: 50,
  taxRate: 20,
  healthInsurance: 6_000,
  retirementContribution: 5_000,
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

describe('calculateSalaryTakeHome', () => {
  it('calculates gross, taxes, deductions, and hourly take-home', () => {
    expect(calculateSalaryTakeHome(normalInputs)).toEqual({
      grossAnnualIncome: 105_000,
      netAnnualIncome: 73_000,
      monthlyTakeHome: 6_083.33,
      hourlyTakeHome: 36.5,
      effectiveHourlyGross: 52.5,
      annualTaxes: 21_000,
    });
  });

  it('returns zeros when all inputs are zero, including zero work hours', () => {
    const zeroInputs: SalaryTakeHomeInputs = {
      annualSalary: 0,
      bonus: 0,
      hoursPerWeek: 0,
      weeksPerYear: 0,
      taxRate: 0,
      healthInsurance: 0,
      retirementContribution: 0,
    };

    expect(calculateSalaryTakeHome(zeroInputs)).toEqual({
      grossAnnualIncome: 0,
      netAnnualIncome: 0,
      monthlyTakeHome: 0,
      hourlyTakeHome: 0,
      effectiveHourlyGross: 0,
      annualTaxes: 0,
    });
  });

  it('clamps negative income, deduction, rate, and work-hour inputs to zero', () => {
    const negativeInputs: SalaryTakeHomeInputs = {
      annualSalary: -100_000,
      bonus: -5_000,
      hoursPerWeek: -40,
      weeksPerYear: -50,
      taxRate: -20,
      healthInsurance: -6_000,
      retirementContribution: -5_000,
    };

    expect(calculateSalaryTakeHome(negativeInputs)).toEqual({
      grossAnnualIncome: 0,
      netAnnualIncome: 0,
      monthlyTakeHome: 0,
      hourlyTakeHome: 0,
      effectiveHourlyGross: 0,
      annualTaxes: 0,
    });
  });

  it.each([
    { hoursPerWeek: 0, weeksPerYear: 50 },
    { hoursPerWeek: 40, weeksPerYear: 0 },
  ])('returns finite hourly values when work-time denominator is zero', ({ hoursPerWeek, weeksPerYear }) => {
    const result = calculateSalaryTakeHome({ ...normalInputs, hoursPerWeek, weeksPerYear });

    expect(result.hourlyTakeHome).toBe(0);
    expect(result.effectiveHourlyGross).toBe(0);
    expectFiniteNumbers(result);
  });

  it('keeps results finite for extreme and non-finite inputs', () => {
    const extremeInputs: SalaryTakeHomeInputs = {
      annualSalary: Number.MAX_VALUE,
      bonus: Number.MAX_VALUE,
      hoursPerWeek: Number.MAX_VALUE,
      weeksPerYear: Number.MAX_VALUE,
      taxRate: Number.MAX_VALUE,
      healthInsurance: Number.MAX_VALUE,
      retirementContribution: Number.MAX_VALUE,
    };
    const invalidInputs: SalaryTakeHomeInputs = {
      annualSalary: Number.POSITIVE_INFINITY,
      bonus: Number.NaN,
      hoursPerWeek: Number.POSITIVE_INFINITY,
      weeksPerYear: Number.NaN,
      taxRate: Number.NaN,
      healthInsurance: Number.POSITIVE_INFINITY,
      retirementContribution: Number.NaN,
    };

    expectFiniteNumbers(calculateSalaryTakeHome(extremeInputs));
    expectFiniteNumbers(calculateSalaryTakeHome(invalidInputs));
  });
});