export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'heavy' | 'athlete';
export type FitnessGoal = 'aggressive_cut' | 'moderate_cut' | 'maintain' | 'lean_bulk' | 'heavy_bulk';
export type MacroSplitType = 'high_protein' | 'balanced' | 'keto' | 'plant_based';
export type DietPreference = 'standard' | 'high_protein' | 'vegetarian' | 'vegan' | 'keto';

export interface MacroInputs {
  gender: Gender;
  age: number;
  weightKg: number;
  heightCm: number;
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
  splitType: MacroSplitType;
  dietPreference: DietPreference;
}

export interface MacroCalculationResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  calorieAdjustment: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  proteinCalories: number;
  carbsCalories: number;
  fatCalories: number;
  proteinPercent: number;
  carbsPercent: number;
  fatPercent: number;
}

export interface MealItem {
  mealName: string;
  foodTitle: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
}

export interface AIMealPlanResponse {
  dietTitle: string;
  targetCalories: number;
  meals: MealItem[];
  tips: string[];
  groceryList: string[];
}
