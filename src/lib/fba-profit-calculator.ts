import { FbaProfitInputs, FbaProfitResult } from '@/types/business-tools';

export function calculateFbaNetProfit(inputs: FbaProfitInputs): FbaProfitResult {
  const {
    sellingPrice,
    cogs,
    shippingCost,
    amazonReferralFeePercent,
    amazonReferralFeeFixed,
    fbaFulfillmentFee,
    storageFee,
    adSpend,
    otherFees,
    monthlyUnitsSold,
  } = inputs;

  const referralFee = Number(((sellingPrice * (amazonReferralFeePercent / 100)) + amazonReferralFeeFixed).toFixed(2));
  const totalVariableCosts = Number((cogs + shippingCost + referralFee + fbaFulfillmentFee + storageFee + otherFees).toFixed(2));
  const grossRevenue = Number((sellingPrice * monthlyUnitsSold).toFixed(2));
  const grossProfit = Number((grossRevenue - (totalVariableCosts * monthlyUnitsSold)).toFixed(2));
  const netProfit = Number((grossProfit - adSpend).toFixed(2));
  const netMarginPercent = grossRevenue > 0 ? Number(((netProfit / grossRevenue) * 100).toFixed(1)) : 0;
  const referralRate = Math.min(Math.max(amazonReferralFeePercent, 0), 99.99) / 100;
  const adCostPerUnit = monthlyUnitsSold > 0 ? adSpend / monthlyUnitsSold : 0;
  const breakEvenPrice = monthlyUnitsSold > 0
    ? Number(((cogs + shippingCost + amazonReferralFeeFixed + fbaFulfillmentFee + storageFee + otherFees + adCostPerUnit) / (1 - referralRate)).toFixed(2))
    : 0;
  const monthlyProfit = netProfit;

  return {
    grossRevenue,
    totalVariableCosts,
    grossProfit,
    netProfit,
    netMarginPercent,
    breakEvenPrice,
    monthlyProfit,
  };
}
