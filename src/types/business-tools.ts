export interface FbaProfitInputs {
  sellingPrice: number;
  cogs: number;
  shippingCost: number;
  amazonReferralFeePercent: number;
  amazonReferralFeeFixed: number;
  fbaFulfillmentFee: number;
  storageFee: number;
  adSpend: number;
  otherFees: number;
  monthlyUnitsSold: number;
}

export interface FbaProfitResult {
  grossRevenue: number;
  totalVariableCosts: number;
  grossProfit: number;
  netProfit: number;
  netMarginPercent: number;
  breakEvenPrice: number;
  monthlyProfit: number;
}

export interface SalaryTakeHomeInputs {
  annualSalary: number;
  hoursPerWeek: number;
  weeksPerYear: number;
  taxRate: number;
  healthInsurance: number;
  retirementContribution: number;
  bonus: number;
}

export interface SalaryTakeHomeResult {
  grossAnnualIncome: number;
  netAnnualIncome: number;
  monthlyTakeHome: number;
  hourlyTakeHome: number;
  effectiveHourlyGross: number;
  annualTaxes: number;
}
