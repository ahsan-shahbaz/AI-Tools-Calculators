export type EcommercePlatform = 'shopify' | 'amazon_fba' | 'tiktok_shop' | 'woocommerce';

export interface PlatformPreset {
  id: EcommercePlatform;
  name: string;
  icon: string;
  defaultProcessingFeeRate: number; // e.g. 2.9
  defaultProcessingFixed: number; // e.g. 0.30
  defaultPlatformFeeRate: number; // e.g. 2.0 for shopify, 15.0 for amazon
  description: string;
}

export interface EcommerceInputs {
  platform: EcommercePlatform;
  sellingPrice: number;
  productCogs: number; // Cost of goods sold
  shippingCost: number; // Shipping & packaging per unit
  processingFeePercent: number; // Payment gateway % (e.g. 2.9)
  processingFeeFixed: number; // Payment gateway fixed fee (e.g. 0.30)
  platformFeePercent: number; // Marketplace / platform cut (e.g. 15% Amazon, 0-2% Shopify)
  monthlyUnitsSold: number;
  currentAdRoas: number; // e.g. 2.5
}

export interface EcommerceCalculationResult {
  sellingPrice: number;
  totalCostPerUnit: number;
  paymentGatewayFee: number;
  platformFee: number;
  grossProfitPerUnit: number; // before ad spend
  grossMarginPercent: number; // before ad spend
  breakEvenRoas: number; // Minimum ROAS to not lose money
  breakEvenCpa: number; // Max ad cost to acquire 1 customer ($)
  
  // Profit targets
  targetRoas20Percent: number; // ROAS needed for 20% net margin
  targetRoas30Percent: number; // ROAS needed for 30% net margin

  // Monthly projections at current ROAS
  monthlyRevenue: number;
  monthlyTotalCogs: number;
  monthlyAdSpendAtCurrentRoas: number;
  monthlyNetProfit: number;
  monthlyNetMarginPercent: number;
  isProfitableAtCurrentRoas: boolean;
}

export interface AIOptimizationRecommendation {
  marginHealth: 'Excellent' | 'Healthy' | 'Thin Margin Risk' | 'Critical Danger';
  summaryDiagnosis: string;
  aovTactics: {
    tactic: string;
    description: string;
    impact: string;
  }[];
  adAngleHooks: {
    hookType: string;
    script: string;
    whyItWorks: string;
  }[];
  pricingAdvice: string;
}
