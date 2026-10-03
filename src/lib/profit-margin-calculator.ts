import { clamp, round } from './finance-math';

export type MarginMode = 'from-price' | 'target-margin' | 'target-markup';

export interface ProfitMarginInputs {
  mode: MarginMode;
  cost: number;
  sellingPrice: number; // used by 'from-price'
  targetMarginPercent: number; // used by 'target-margin'
  targetMarkupPercent: number; // used by 'target-markup'
  units: number;
}

export interface ProfitMarginResult {
  sellingPrice: number;
  profitPerUnit: number;
  marginPercent: number;
  markupPercent: number;
  totalRevenue: number;
  totalProfit: number;
  error: string | null;
}

const EMPTY: ProfitMarginResult = {
  sellingPrice: 0, profitPerUnit: 0, marginPercent: 0, markupPercent: 0, totalRevenue: 0, totalProfit: 0, error: null,
};

export function calculateProfitMargin(raw: ProfitMarginInputs): ProfitMarginResult {
  const cost = clamp(raw.cost, 0, 1_000_000_000, 0);
  const units = Math.round(clamp(raw.units, 1, 1_000_000_000, 1));

  let price: number;
  if (raw.mode === 'target-margin') {
    const margin = clamp(raw.targetMarginPercent, 0, 99.99, 0);
    price = cost / (1 - margin / 100);
  } else if (raw.mode === 'target-markup') {
    const markup = clamp(raw.targetMarkupPercent, 0, 100_000, 0);
    price = cost * (1 + markup / 100);
  } else {
    price = clamp(raw.sellingPrice, 0, 1_000_000_000, 0);
  }

  if (price <= 0) return { ...EMPTY, error: 'Enter a selling price or target above zero.' };

  const profit = price - cost;
  return {
    sellingPrice: round(price),
    profitPerUnit: round(profit),
    marginPercent: round((profit / price) * 100),
    markupPercent: cost > 0 ? round((profit / cost) * 100) : 0,
    totalRevenue: round(price * units),
    totalProfit: round(profit * units),
    error: null,
  };
}
