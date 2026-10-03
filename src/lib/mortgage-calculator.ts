import { clamp, monthlyPayment, round } from './finance-math';

export interface MortgageInputs {
  homePrice: number;
  downPaymentPercent: number;
  interestRate: number; // APR, percent
  termYears: number;
  propertyTaxRate: number; // percent of home price per year
  homeInsurancePerYear: number;
  hoaPerMonth: number;
  extraMonthlyPayment: number;
}

export interface MortgageYearRow {
  year: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
}

export interface MortgageResult {
  loanAmount: number;
  downPayment: number;
  principalAndInterest: number;
  propertyTax: number;
  insurance: number;
  hoa: number;
  pmi: number;
  totalMonthly: number;
  totalInterest: number;
  totalPaid: number;
  payoffMonths: number;
  /** Interest saved vs. paying only the scheduled amount (0 without extra payments). */
  interestSavedByExtra: number;
  monthsSavedByExtra: number;
  yearly: MortgageYearRow[];
}

/** PMI is estimated at 0.5% of the loan per year while the down payment is under 20%. */
export const PMI_ANNUAL_RATE = 0.005;

function amortise(loan: number, monthlyRate: number, months: number, payment: number, extra: number) {
  let balance = loan;
  let interestTotal = 0;
  let month = 0;
  const yearly: MortgageYearRow[] = [];
  let yearPrincipal = 0;
  let yearInterest = 0;

  while (balance > 0.005 && month < months) {
    const interest = balance * monthlyRate;
    const principal = Math.min(balance, payment - interest + extra);
    balance -= principal;
    interestTotal += interest;
    yearPrincipal += principal;
    yearInterest += interest;
    month += 1;
    if (month % 12 === 0 || balance <= 0.005) {
      yearly.push({
        year: Math.ceil(month / 12),
        principalPaid: round(yearPrincipal),
        interestPaid: round(yearInterest),
        endingBalance: round(Math.max(balance, 0)),
      });
      yearPrincipal = 0;
      yearInterest = 0;
    }
  }
  return { interestTotal, month, yearly };
}

export function calculateMortgage(raw: MortgageInputs): MortgageResult {
  const homePrice = clamp(raw.homePrice, 0, 100_000_000, 0);
  const downPaymentPercent = clamp(raw.downPaymentPercent, 0, 100, 0);
  const interestRate = clamp(raw.interestRate, 0, 30, 0);
  const termYears = Math.round(clamp(raw.termYears, 1, 40, 30));
  const propertyTaxRate = clamp(raw.propertyTaxRate, 0, 10, 0);
  const insurance = clamp(raw.homeInsurancePerYear, 0, 1_000_000, 0);
  const hoa = clamp(raw.hoaPerMonth, 0, 100_000, 0);
  const extra = clamp(raw.extraMonthlyPayment, 0, 1_000_000, 0);

  const downPayment = (homePrice * downPaymentPercent) / 100;
  const loanAmount = Math.max(homePrice - downPayment, 0);
  const months = termYears * 12;
  const monthlyRate = interestRate / 100 / 12;
  const payment = monthlyPayment(loanAmount, monthlyRate, months);

  const propertyTax = (homePrice * propertyTaxRate) / 100 / 12;
  const pmi = downPaymentPercent < 20 ? (loanAmount * PMI_ANNUAL_RATE) / 12 : 0;
  const totalMonthly = payment + propertyTax + insurance / 12 + hoa + pmi;

  const base = amortise(loanAmount, monthlyRate, months, payment, 0);
  const withExtra = extra > 0 ? amortise(loanAmount, monthlyRate, months, payment, extra) : base;

  return {
    loanAmount: round(loanAmount),
    downPayment: round(downPayment),
    principalAndInterest: round(payment),
    propertyTax: round(propertyTax),
    insurance: round(insurance / 12),
    hoa: round(hoa),
    pmi: round(pmi),
    totalMonthly: round(totalMonthly + extra),
    totalInterest: round(withExtra.interestTotal),
    totalPaid: round(loanAmount + withExtra.interestTotal),
    payoffMonths: withExtra.month,
    interestSavedByExtra: round(base.interestTotal - withExtra.interestTotal),
    monthsSavedByExtra: base.month - withExtra.month,
    yearly: withExtra.yearly,
  };
}
