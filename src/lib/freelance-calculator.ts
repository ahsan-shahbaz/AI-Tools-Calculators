import { FreelanceInputs, FreelanceCalculationResult } from '@/types/freelance';

export function calculateFreelanceRates(inputs: FreelanceInputs): FreelanceCalculationResult {
  const {
    targetSalary,
    monthlyExpenses,
    vacationWeeks,
    hoursPerWeek,
    billablePercentage,
    taxRate,
    profitMarginBuffer
  } = inputs;

  // 1. Annual Expenses
  const annualBusinessExpenses = monthlyExpenses * 12;

  // 2. Net Required Amount
  const netRequired = targetSalary + annualBusinessExpenses;

  // 3. Gross Target Revenue (Accounting for self-employment + income tax)
  const taxFraction = Math.min(Math.max(taxRate, 0), 60) / 100;
  const grossAnnualRevenueTarget = Math.round(netRequired / (1 - taxFraction));
  const annualTaxAmount = Math.round(grossAnnualRevenueTarget * taxFraction);
  const netAnnualTakeHome = targetSalary;

  // 4. Hours Calculation
  const workingWeeksPerYear = Math.max(52 - vacationWeeks, 1);
  const totalAnnualHours = workingWeeksPerYear * hoursPerWeek;
  const billableFraction = Math.min(Math.max(billablePercentage, 10), 100) / 100;
  const billableHoursPerYear = Math.max(Math.round(totalAnnualHours * billableFraction), 1);
  const nonBillableHoursPerYear = totalAnnualHours - billableHoursPerYear;

  // 5. Rates
  const breakevenHourly = Number((grossAnnualRevenueTarget / billableHoursPerYear).toFixed(2));
  const profitMultiplier = 1 + Math.max(profitMarginBuffer, 0) / 100;
  const targetHourly = Math.round(breakevenHourly * profitMultiplier);
  const premiumHourly = Math.round(targetHourly * 1.35);

  const targetDayRate = Math.round(targetHourly * 7);
  const premiumDayRate = Math.round(premiumHourly * 7);

  const monthlyRevenueNeeded = Math.round(grossAnnualRevenueTarget / 12);
  const minimumProjectFloor = Math.round(targetHourly * 10); // Standard 10-hour minimum engagement

  return {
    grossAnnualRevenueTarget,
    annualTaxAmount,
    annualBusinessExpenses,
    netAnnualTakeHome,
    workingWeeksPerYear,
    totalAnnualHours,
    billableHoursPerYear,
    nonBillableHoursPerYear,
    hourlyRate: {
      breakeven: breakevenHourly,
      target: targetHourly,
      premiumValue: premiumHourly
    },
    dayRate: {
      target: targetDayRate,
      premiumValue: premiumDayRate
    },
    monthlyRevenueNeeded,
    minimumProjectFloor
  };
}
