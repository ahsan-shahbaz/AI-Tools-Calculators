import { clamp, round } from './finance-math';

export type UnitSystem = 'metric' | 'imperial';

export interface BmiInputs {
  system: UnitSystem;
  /** kg (metric) or lb (imperial) */
  weight: number;
  /** cm (metric) or total inches (imperial) */
  height: number;
}

export type BmiCategory = 'Underweight' | 'Healthy weight' | 'Overweight' | 'Obesity';

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
  /** Healthy range (BMI 18.5-24.9) in the user's own unit. */
  healthyMin: number;
  healthyMax: number;
  /** Positive = above the top of the healthy range, negative = below the bottom, 0 = inside. */
  differenceToRange: number;
  unit: 'kg' | 'lb';
  error: string | null;
}

const KG_PER_LB = 0.45359237;
const CM_PER_INCH = 2.54;

export function categorise(bmi: number): BmiCategory {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Healthy weight';
  if (bmi < 30) return 'Overweight';
  return 'Obesity';
}

export function calculateBmi(raw: BmiInputs): BmiResult {
  const unit = raw.system === 'imperial' ? 'lb' : 'kg';
  const empty: BmiResult = {
    bmi: 0, category: 'Healthy weight', healthyMin: 0, healthyMax: 0, differenceToRange: 0, unit, error: null,
  };
  const weight = clamp(raw.weight, 0, 2_000, 0);
  const height = clamp(raw.height, 0, 300, 0);
  if (weight <= 0 || height <= 0) return { ...empty, error: 'Enter your height and weight.' };

  const kg = raw.system === 'imperial' ? weight * KG_PER_LB : weight;
  const m = (raw.system === 'imperial' ? height * CM_PER_INCH : height) / 100;
  if (m < 0.5 || m > 2.8) return { ...empty, error: 'Height looks out of range.' };

  const bmi = kg / (m * m);
  const toUnit = (valueKg: number) => (raw.system === 'imperial' ? valueKg / KG_PER_LB : valueKg);
  const healthyMin = toUnit(18.5 * m * m);
  const healthyMax = toUnit(24.9 * m * m);
  const current = toUnit(kg);

  let difference = 0;
  if (current > healthyMax) difference = current - healthyMax;
  else if (current < healthyMin) difference = current - healthyMin;

  return {
    bmi: round(bmi, 1),
    category: categorise(bmi),
    healthyMin: round(healthyMin, 1),
    healthyMax: round(healthyMax, 1),
    differenceToRange: round(difference, 1),
    unit,
    error: null,
  };
}
