import { round } from './finance-math';

export type PercentageMode = 'percent-of' | 'what-percent' | 'change' | 'increase' | 'decrease';

export interface PercentageResult {
  value: number | null;
  /** Plain-English sentence describing the answer, or null when the inputs are not valid. */
  sentence: string | null;
  error: string | null;
}

const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 4 });

export function calculatePercentage(mode: PercentageMode, a: number, b: number): PercentageResult {
  if (![a, b].every((n) => typeof n === 'number' && Number.isFinite(n))) {
    return { value: null, sentence: null, error: 'Enter two valid numbers.' };
  }

  switch (mode) {
    case 'percent-of': {
      const value = round((a / 100) * b, 6);
      return { value, sentence: `${fmt(a)}% of ${fmt(b)} is ${fmt(value)}.`, error: null };
    }
    case 'what-percent': {
      if (b === 0) return { value: null, sentence: null, error: 'The total cannot be zero.' };
      const value = round((a / b) * 100, 6);
      return { value, sentence: `${fmt(a)} is ${fmt(value)}% of ${fmt(b)}.`, error: null };
    }
    case 'change': {
      if (a === 0) return { value: null, sentence: null, error: 'Percentage change is undefined when the starting value is zero.' };
      const value = round(((b - a) / Math.abs(a)) * 100, 6);
      const word = value >= 0 ? 'increase' : 'decrease';
      return { value, sentence: `From ${fmt(a)} to ${fmt(b)} is a ${fmt(Math.abs(value))}% ${word}.`, error: null };
    }
    case 'increase': {
      const value = round(a * (1 + b / 100), 6);
      return { value, sentence: `${fmt(a)} increased by ${fmt(b)}% is ${fmt(value)}.`, error: null };
    }
    case 'decrease': {
      const value = round(a * (1 - b / 100), 6);
      return { value, sentence: `${fmt(a)} decreased by ${fmt(b)}% is ${fmt(value)}.`, error: null };
    }
    default:
      return { value: null, sentence: null, error: 'Unknown calculation.' };
  }
}
