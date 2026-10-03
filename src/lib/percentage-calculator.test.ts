import { describe, expect, it } from 'vitest';
import { calculatePercentage } from './percentage-calculator';

describe('calculatePercentage', () => {
  it('computes X% of Y', () => expect(calculatePercentage('percent-of', 15, 200).value).toBe(30));
  it('computes what percent X is of Y', () => expect(calculatePercentage('what-percent', 30, 120).value).toBe(25));
  it('computes percentage change both ways', () => {
    expect(calculatePercentage('change', 80, 100).value).toBe(25);
    expect(calculatePercentage('change', 100, 80).value).toBe(-20);
  });
  it('increases and decreases by a percent', () => {
    expect(calculatePercentage('increase', 50, 10).value).toBe(55);
    expect(calculatePercentage('decrease', 50, 10).value).toBe(45);
  });
  it('rejects division by zero and invalid numbers', () => {
    expect(calculatePercentage('what-percent', 5, 0).error).toBeTruthy();
    expect(calculatePercentage('change', 0, 5).error).toBeTruthy();
    expect(calculatePercentage('percent-of', NaN, 5).error).toBeTruthy();
  });
});
