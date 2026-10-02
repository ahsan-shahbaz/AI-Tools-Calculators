import { MacroInputs, MacroCalculationResult } from '@/types/macro';

export function calculateMacros(inputs: MacroInputs): MacroCalculationResult {
  const { gender, age, weightKg, heightCm, activityLevel, goal, splitType } = inputs;

  // 1. Mifflin-St Jeor BMR Formula
  let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }
  bmr = Math.round(bmr);

  // 2. Activity Multiplier
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    heavy: 1.725,
    athlete: 1.9,
  };
  const multiplier = activityMultipliers[activityLevel] || 1.2;
  const tdee = Math.round(bmr * multiplier);

  // 3. Goal Calorie Adjustment
  const goalAdjustments: Record<string, number> = {
    aggressive_cut: -600,
    moderate_cut: -350,
    maintain: 0,
    lean_bulk: 250,
    heavy_bulk: 500,
  };
  const calorieAdjustment = goalAdjustments[goal] || 0;
  const targetCalories = Math.max(tdee + calorieAdjustment, 1200);

  // 4. Macro Splits
  let pRatio = 0.30;
  let cRatio = 0.40;
  let fRatio = 0.30;

  if (splitType === 'high_protein') {
    pRatio = 0.40;
    cRatio = 0.35;
    fRatio = 0.25;
  } else if (splitType === 'keto') {
    pRatio = 0.25;
    cRatio = 0.08;
    fRatio = 0.67;
  } else if (splitType === 'plant_based') {
    pRatio = 0.25;
    cRatio = 0.55;
    fRatio = 0.20;
  }

  const proteinCalories = Math.round(targetCalories * pRatio);
  const carbsCalories = Math.round(targetCalories * cRatio);
  const fatCalories = Math.round(targetCalories * fRatio);

  // Protein & Carbs = 4 kcal/gram, Fat = 9 kcal/gram
  const proteinGrams = Math.round(proteinCalories / 4);
  const carbsGrams = Math.round(carbsCalories / 4);
  const fatGrams = Math.round(fatCalories / 9);

  return {
    bmr,
    tdee,
    targetCalories,
    calorieAdjustment,
    proteinGrams,
    carbsGrams,
    fatGrams,
    proteinCalories,
    carbsCalories,
    fatCalories,
    proteinPercent: Math.round(pRatio * 100),
    carbsPercent: Math.round(cRatio * 100),
    fatPercent: Math.round(fRatio * 100),
  };
}
