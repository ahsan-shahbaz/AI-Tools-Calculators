import { SalaryTakeHomeInputs, SalaryTakeHomeResult } from '@/types/business-tools';

const MAX_CALCULATION_INPUT = Number.MAX_SAFE_INTEGER;

function normalizeNonNegative(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value, 0), MAX_CALCULATION_INPUT);
}

export function calculateSalaryTakeHome(inputs: SalaryTakeHomeInputs): SalaryTakeHomeResult {
  const {
    annualSalary,
    hoursPerWeek,
    weeksPerYear,
    taxRate,
    healthInsurance,
    retirementContribution,
    bonus,
  } = inputs;

  const normalizedSalary = normalizeNonNegative(annualSalary);
  const normalizedBonus = normalizeNonNegative(bonus);
  const normalizedHoursPerWeek = normalizeNonNegative(hoursPerWeek);
  const normalizedWeeksPerYear = normalizeNonNegative(weeksPerYear);
  const normalizedHealthInsurance = normalizeNonNegative(healthInsurance);
  const normalizedRetirementContribution = normalizeNonNegative(retirementContribution);
  const normalizedTaxRate = normalizeNonNegative(taxRate);

  const grossAnnualIncome = normalizedSalary + normalizedBonus;
  const taxFraction = Math.min(normalizedTaxRate, 100) / 100;
  const annualTaxes = Number((grossAnnualIncome * taxFraction).toFixed(2));
  const netAnnualIncome = Number((grossAnnualIncome - annualTaxes - normalizedHealthInsurance - normalizedRetirementContribution).toFixed(2));

  const monthlyTakeHome = Number((netAnnualIncome / 12).toFixed(2));
  const totalAnnualHours = normalizedHoursPerWeek * normalizedWeeksPerYear;
  const effectiveHourlyGross = totalAnnualHours > 0 ? Number((grossAnnualIncome / totalAnnualHours).toFixed(2)) : 0;
  const hourlyTakeHome = totalAnnualHours > 0 ? Number((netAnnualIncome / totalAnnualHours).toFixed(2)) : 0;

  return {
    grossAnnualIncome,
    netAnnualIncome,
    monthlyTakeHome,
    hourlyTakeHome,
    effectiveHourlyGross,
    annualTaxes,
  };
}
