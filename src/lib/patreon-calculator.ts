import type { PatreonEarningsInputs, PatreonEarningsResult } from '@/types/social-tools';

const MAX_CALCULATION_INPUT = Number.MAX_SAFE_INTEGER;

function normalizeNonNegative(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(Math.max(value, 0), MAX_CALCULATION_INPUT);
}

function roundToCents(value: number): number {
  return Number(value.toFixed(2));
}

export function calculatePatreonEarnings(inputs: PatreonEarningsInputs): PatreonEarningsResult {
  const paidMembers = Math.floor(normalizeNonNegative(inputs.paidMembers));
  const averageMonthlyPledge = normalizeNonNegative(inputs.averageMonthlyPledge);
  const estimatedFeePercent = Math.min(normalizeNonNegative(inputs.estimatedFeePercent), 100);
  const otherMonthlyCosts = normalizeNonNegative(inputs.otherMonthlyCosts);

  const grossMonthlyPledges = paidMembers * averageMonthlyPledge;
  const estimatedFees = grossMonthlyPledges * (estimatedFeePercent / 100);
  const estimatedMonthlyNet = grossMonthlyPledges - estimatedFees - otherMonthlyCosts;
  const projectedAnnualNet = estimatedMonthlyNet * 12;
  const estimatedNetPerMember = paidMembers > 0 ? estimatedMonthlyNet / paidMembers : 0;
  const netMarginPercent = grossMonthlyPledges > 0
    ? (estimatedMonthlyNet / grossMonthlyPledges) * 100
    : 0;

  return {
    paidMembers,
    grossMonthlyPledges: roundToCents(grossMonthlyPledges),
    estimatedFees: roundToCents(estimatedFees),
    otherMonthlyCosts: roundToCents(otherMonthlyCosts),
    estimatedMonthlyNet: roundToCents(estimatedMonthlyNet),
    projectedAnnualNet: roundToCents(projectedAnnualNet),
    estimatedNetPerMember: roundToCents(estimatedNetPerMember),
    netMarginPercent: roundToCents(netMarginPercent),
  };
}