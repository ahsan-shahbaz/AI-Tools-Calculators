import { describe, expect, it } from 'vitest';
import { calculateBmi, categorise } from './bmi-calculator';

describe('calculateBmi', () => {
  it('computes metric BMI and the healthy range', () => {
    const r = calculateBmi({ system: 'metric', weight: 70, height: 175 });
    expect(r.bmi).toBe(22.9);
    expect(r.category).toBe('Healthy weight');
    expect(r.healthyMin).toBeCloseTo(56.7, 1);
    expect(r.healthyMax).toBeCloseTo(76.3, 1);
    expect(r.differenceToRange).toBe(0);
  });
  it('matches imperial input to metric', () => {
    const r = calculateBmi({ system: 'imperial', weight: 154.3, height: 68.9 });
    expect(r.bmi).toBeCloseTo(22.9, 1);
    expect(r.unit).toBe('lb');
  });
  it('reports distance above the healthy range', () => {
    const r = calculateBmi({ system: 'metric', weight: 95, height: 175 });
    expect(r.category).toBe('Obesity');
    expect(r.differenceToRange).toBeGreaterThan(0);
  });
  it('uses standard WHO cut-offs', () => {
    expect(categorise(18.4)).toBe('Underweight');
    expect(categorise(24.9)).toBe('Healthy weight');
    expect(categorise(25)).toBe('Overweight');
    expect(categorise(30)).toBe('Obesity');
  });
  it('returns an error for missing or absurd input', () => {
    expect(calculateBmi({ system: 'metric', weight: 0, height: 170 }).error).toBeTruthy();
    expect(calculateBmi({ system: 'metric', weight: 70, height: 10 }).error).toBeTruthy();
    expect(calculateBmi({ system: 'metric', weight: NaN, height: NaN }).error).toBeTruthy();
  });
});
