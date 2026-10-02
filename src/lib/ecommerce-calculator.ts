import { EcommerceInputs, EcommerceCalculationResult } from '@/types/ecommerce';

export function calculateEcommerceProfit(inputs: EcommerceInputs): EcommerceCalculationResult {
  const {
    sellingPrice,
    productCogs,
    shippingCost,
    processingFeePercent,
    processingFeeFixed,
    platformFeePercent,
    monthlyUnitsSold,
    currentAdRoas
  } = inputs;

  // 1. Fee Breakdown
  const paymentGatewayFee = Number(((sellingPrice * (processingFeePercent / 100)) + processingFeeFixed).toFixed(2));
  const platformFee = Number((sellingPrice * (platformFeePercent / 100)).toFixed(2));
  const totalCostPerUnit = Number((productCogs + shippingCost + paymentGatewayFee + platformFee).toFixed(2));

  // 2. Gross Margin Before Ad Spend
  const grossProfitPerUnit = Number((sellingPrice - totalCostPerUnit).toFixed(2));
  const grossMarginPercent = sellingPrice > 0
    ? Number(((grossProfitPerUnit / sellingPrice) * 100).toFixed(1))
    : 0;

  // 3. Break-Even ROAS & CPA
  // Break-Even ROAS = Selling Price / Gross Profit Before Ads
  let breakEvenRoas = 99.0;
  let breakEvenCpa = 0;

  if (grossProfitPerUnit > 0) {
    breakEvenRoas = Number((sellingPrice / grossProfitPerUnit).toFixed(2));
    breakEvenCpa = grossProfitPerUnit;
  }

  // 4. Target ROAS for Net Margins
  // Net Profit = Gross Profit - Ad Spend => Ad Spend = Gross Profit - (Target Margin * Selling Price)
  const margin20NetRequired = sellingPrice * 0.20;
  const adSpendFor20Net = grossProfitPerUnit - margin20NetRequired;
  const targetRoas20Percent = adSpendFor20Net > 0
    ? Number((sellingPrice / adSpendFor20Net).toFixed(2))
    : Number((breakEvenRoas * 1.5).toFixed(2));

  const margin30NetRequired = sellingPrice * 0.30;
  const adSpendFor30Net = grossProfitPerUnit - margin30NetRequired;
  const targetRoas30Percent = adSpendFor30Net > 0
    ? Number((sellingPrice / adSpendFor30Net).toFixed(2))
    : Number((breakEvenRoas * 2.0).toFixed(2));

  // 5. Monthly Projections at Current ROAS
  const monthlyRevenue = Math.round(sellingPrice * monthlyUnitsSold);
  const monthlyTotalCogs = Math.round(totalCostPerUnit * monthlyUnitsSold);
  const safeRoas = Math.max(currentAdRoas, 0.1);
  const monthlyAdSpendAtCurrentRoas = Math.round(monthlyRevenue / safeRoas);
  const monthlyNetProfit = Math.round(monthlyRevenue - monthlyTotalCogs - monthlyAdSpendAtCurrentRoas);
  const monthlyNetMarginPercent = monthlyRevenue > 0
    ? Number(((monthlyNetProfit / monthlyRevenue) * 100).toFixed(1))
    : 0;
  const isProfitableAtCurrentRoas = monthlyNetProfit > 0;

  return {
    sellingPrice,
    totalCostPerUnit,
    paymentGatewayFee,
    platformFee,
    grossProfitPerUnit,
    grossMarginPercent,
    breakEvenRoas,
    breakEvenCpa,
    targetRoas20Percent,
    targetRoas30Percent,
    monthlyRevenue,
    monthlyTotalCogs,
    monthlyAdSpendAtCurrentRoas,
    monthlyNetProfit,
    monthlyNetMarginPercent,
    isProfitableAtCurrentRoas
  };
}
