export interface FreelanceRolePreset {
  id: string;
  name: string;
  category: string;
  icon: string;
  defaultTargetSalary: number;
  defaultMonthlyExpenses: number;
  defaultBillablePercentage: number;
  averageIndustryRate: { min: number; avg: number; max: number };
  sampleProjectPrompt: string;
}

export interface FreelanceInputs {
  targetSalary: number;
  monthlyExpenses: number;
  vacationWeeks: number;
  hoursPerWeek: number;
  billablePercentage: number;
  taxRate: number; // in percent (e.g. 25)
  profitMarginBuffer: number; // in percent (e.g. 15)
}

export interface FreelanceCalculationResult {
  grossAnnualRevenueTarget: number;
  annualTaxAmount: number;
  annualBusinessExpenses: number;
  netAnnualTakeHome: number;
  workingWeeksPerYear: number;
  totalAnnualHours: number;
  billableHoursPerYear: number;
  nonBillableHoursPerYear: number;
  hourlyRate: {
    breakeven: number;
    target: number;
    premiumValue: number;
  };
  dayRate: {
    target: number;
    premiumValue: number;
  };
  monthlyRevenueNeeded: number;
  minimumProjectFloor: number;
}

export interface ProjectTaskItem {
  task: string;
  hours: number;
  description: string;
}

export interface AIProjectProposal {
  projectTitle: string;
  estimatedHours: number;
  recommendedPrice: number;
  pricingRange: { min: number; max: number };
  tasks: ProjectTaskItem[];
  paymentMilestones: {
    phase: string;
    percentage: number;
    amount: number;
    trigger: string;
  }[];
  scopeGuardrails: string[];
  clientPitchEmail: string;
}
