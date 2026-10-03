import { describe, expect, it } from 'vitest';
import { calculateProfitMargin, type ProfitMarginInputs } from './profit-margin-calculator';

const base: ProfitMarginInputs = {
  mode: 'from-price', cost: 60, sellingPrice: 100, targetMarginPercent: 40, targetMarkupPercent: 50, units: 10,
};

describe('calculateProfitMargin', () => {
  it('separates margin from markup', () => {
    const r = calculateProfitMargin(base);
    expect(r.profitPerUnit).toBe(40);
    expect(r.marginPercent).toBe(40);
    expect(r.markupPercent).toBe(66.67);
    expect(r.totalProfit).toBe(400);
  });
  it('prices from a target margin', () => {
    expect(calculateProfitMargin({ ...base, mode: 'target-margin' }).sellingPrice).toBe(100);
  });
  it('prices from a target markup', () => {
    const r = calculateProfitMargin({ ...base, mode: 'target-markup' });
    expect(r.sellingPrice).toBe(90);
    expect(r.marginPercent).toBe(33.33);
  });
  it('reports a negative margin when selling below cost', () => {
    expect(calculateProfitMargin({ ...base, sellingPrice: 50 }).marginPercent).toBe(-20);
  });
  it('returns an error instead of NaN for a zero price', () => {
    const r = calculateProfitMargin({ ...base, sellingPrice: 0 });
    expect(r.error).toBeTruthy();
    expect(Number.isFinite(r.marginPercent)).toBe(true);
  });
});
