import { clamp, round } from './finance-math';

export type CompoundFrequency = 1 | 2 | 4 | 12 | 365;

export interface CompoundInterestInputs {
  initialDeposit: number;
  monthlyContribution: number;
  annualRate: number; // percent
  years: number;
  compoundsPerYear: CompoundFrequency;
  inflationRate: number; // percent, used for the "today's money" figure
}

export interface CompoundYearRow {
  year: number;
  contributions: number;
  interest: number;
  balance: number;
}

export interface CompoundInterestResult {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
  inflationAdjustedBalance: number;
  yearly: CompoundYearRow[];
}

/**
 * Month-by-month simulation. The nominal annual rate is compounded `compoundsPerYear`
 * times a year; contributions land at the end of each month.
 */
export function calculateCompoundInterest(raw: CompoundInterestInputs): CompoundInterestResult {
  const initial = clamp(raw.initialDeposit, 0, 1_000_000_000, 0);
  const monthly = clamp(raw.monthlyContribution, 0, 100_000_000, 0);
  const rate = clamp(raw.annualRate, 0, 100, 0);
  const years = Math.round(clamp(raw.years, 1, 60, 10));
  const n = ([1, 2, 4, 12, 365] as number[]).includes(raw.compoundsPerYear) ? raw.compoundsPerYear : 12;
  const inflation = clamp(raw.inflationRate, 0, 50, 0);

  const monthlyGrowth = (1 + rate / 100 / n) ** (n / 12) - 1;
  let balance = initial;
  let contributed = initial;
  const yearly: CompoundYearRow[] = [];

  for (let month = 1; month <= years * 12; month += 1) {
    balance = balance * (1 + monthlyGrowth) + monthly;
    contributed += monthly;
    if (month % 12 === 0) {
      yearly.push({
        year: month / 12,
        contributions: round(contributed),
        interest: round(balance - contributed),
        balance: round(balance),
      });
    }
  }

  return {
    finalBalance: round(balance),
    totalContributions: round(contributed),
    totalInterest: round(balance - contributed),
    inflationAdjustedBalance: round(balance / (1 + inflation / 100) ** years),
    yearly,
  };
}
