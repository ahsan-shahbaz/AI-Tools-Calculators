import { MacroInputs, MacroCalculationResult, AIMealPlanResponse, MealItem } from '@/types/macro';

export async function generateCustomMealPlan(
  inputs: MacroInputs,
  calc: MacroCalculationResult
): Promise<AIMealPlanResponse> {
  // Simulate AI generation delay
  await new Promise((r) => setTimeout(r, 600));

  const { targetCalories, proteinGrams, carbsGrams, fatGrams } = calc;
  const { dietPreference } = inputs;

  let meals: MealItem[] = [];
  let groceryList: string[] = [];

  if (dietPreference === 'keto') {
    meals = [
      {
        mealName: 'Breakfast',
        foodTitle: 'Scrambled Eggs with Avocado & Smoked Salmon',
        calories: Math.round(targetCalories * 0.28),
        protein: Math.round(proteinGrams * 0.28),
        carbs: Math.round(carbsGrams * 0.20),
        fat: Math.round(fatGrams * 0.32),
        description: '3 whole eggs cooked in grass-fed butter, half avocado, and 60g smoked salmon with fresh chives.'
      },
      {
        mealName: 'Lunch',
        foodTitle: 'Keto Caesar Chicken Salad',
        calories: Math.round(targetCalories * 0.35),
        protein: Math.round(proteinGrams * 0.38),
        carbs: Math.round(carbsGrams * 0.30),
        fat: Math.round(fatGrams * 0.34),
        description: '200g grilled chicken thighs over romaine lettuce, shaved parmesan, extra virgin olive oil, and creamy caesar dressing.'
      },
      {
        mealName: 'Snack',
        foodTitle: 'Macadamia Nuts & String Cheese',
        calories: Math.round(targetCalories * 0.12),
        protein: Math.round(proteinGrams * 0.08),
        carbs: Math.round(carbsGrams * 0.15),
        fat: Math.round(fatGrams * 0.14),
        description: '30g raw macadamia nuts and 1 stick organic mozzarella cheese.'
      },
      {
        mealName: 'Dinner',
        foodTitle: 'Ribeye Steak with Garlic Butter Asparagus',
        calories: Math.round(targetCalories * 0.25),
        protein: Math.round(proteinGrams * 0.26),
        carbs: Math.round(carbsGrams * 0.35),
        fat: Math.round(fatGrams * 0.20),
        description: 'Pan-seared ribeye steak with sautéed asparagus in garlic butter.'
      }
    ];
    groceryList = ['Eggs', 'Grass-fed Butter', 'Avocados', 'Smoked Salmon', 'Chicken Thighs', 'Romaine Lettuce', 'Parmesan', 'Macadamia Nuts', 'Ribeye Steak', 'Asparagus'];
  } else if (dietPreference === 'vegan' || dietPreference === 'vegetarian') {
    meals = [
      {
        mealName: 'Breakfast',
        foodTitle: 'High-Protein Tofu Scramble with Spinach & Whole Grain Toast',
        calories: Math.round(targetCalories * 0.25),
        protein: Math.round(proteinGrams * 0.24),
        carbs: Math.round(carbsGrams * 0.28),
        fat: Math.round(fatGrams * 0.22),
        description: '200g firm tofu seasoned with nutritional yeast, turmeric, baby spinach, and 2 slices sprouted grain toast.'
      },
      {
        mealName: 'Lunch',
        foodTitle: 'Mediterranean Chickpea & Quinoa Power Bowl',
        calories: Math.round(targetCalories * 0.35),
        protein: Math.round(proteinGrams * 0.35),
        carbs: Math.round(carbsGrams * 0.38),
        fat: Math.round(fatGrams * 0.32),
        description: '1 cup cooked quinoa, 1 cup spiced chickpeas, diced cucumbers, kalamata olives, hemp hearts, and lemon tahini dressing.'
      },
      {
        mealName: 'Snack',
        foodTitle: 'Pea Protein Shake with Berries & Almond Butter',
        calories: Math.round(targetCalories * 0.15),
        protein: Math.round(proteinGrams * 0.18),
        carbs: Math.round(carbsGrams * 0.14),
        fat: Math.round(fatGrams * 0.14),
        description: '1 scoop plant protein isolate blended with unsweetened almond milk, 1 cup frozen blueberries, and 1 tbsp almond butter.'
      },
      {
        mealName: 'Dinner',
        foodTitle: 'Lentil Dahl with Steamed Jasmine Rice & Broccoli',
        calories: Math.round(targetCalories * 0.25),
        protein: Math.round(proteinGrams * 0.23),
        carbs: Math.round(carbsGrams * 0.20),
        fat: Math.round(fatGrams * 0.32),
        description: 'Rich red lentil stew simmered in coconut milk, cumin, and ginger, served alongside steamed jasmine rice and broccoli florets.'
      }
    ];
    groceryList = ['Firm Tofu', 'Nutritional Yeast', 'Sprouted Grain Bread', 'Chickpeas', 'Quinoa', 'Tahini', 'Plant Protein Powder', 'Frozen Blueberries', 'Almond Butter', 'Red Lentils', 'Jasmine Rice', 'Broccoli'];
  } else {
    // Standard / High-Protein Omnivore
    meals = [
      {
        mealName: 'Breakfast',
        foodTitle: 'Greek Yogurt Protein Bowl with Berries & Granola',
        calories: Math.round(targetCalories * 0.25),
        protein: Math.round(proteinGrams * 0.26),
        carbs: Math.round(carbsGrams * 0.26),
        fat: Math.round(fatGrams * 0.22),
        description: '250g 0% Greek Yogurt, 1 scoop whey protein, 1 cup fresh mixed berries, 30g low-sugar granola, and a drizzle of raw honey.'
      },
      {
        mealName: 'Lunch',
        foodTitle: 'Grilled Chicken Breast, Basmati Rice & Roasted Asparagus',
        calories: Math.round(targetCalories * 0.35),
        protein: Math.round(proteinGrams * 0.38),
        carbs: Math.round(carbsGrams * 0.36),
        fat: Math.round(fatGrams * 0.30),
        description: '180g marinated chicken breast, 1.5 cups cooked basmati rice, roasted asparagus with 1 tsp olive oil.'
      },
      {
        mealName: 'Afternoon Snack',
        foodTitle: 'Rice Cakes with Peanut Butter & Banana',
        calories: Math.round(targetCalories * 0.15),
        protein: Math.round(proteinGrams * 0.10),
        carbs: Math.round(carbsGrams * 0.18),
        fat: Math.round(fatGrams * 0.18),
        description: '2 lightly salted brown rice cakes topped with 20g natural peanut butter and sliced ripe banana.'
      },
      {
        mealName: 'Dinner',
        foodTitle: 'Wild-Caught Salmon Fillet with Sweet Potato & Green Beans',
        calories: Math.round(targetCalories * 0.25),
        protein: Math.round(proteinGrams * 0.26),
        carbs: Math.round(carbsGrams * 0.20),
        fat: Math.round(fatGrams * 0.30),
        description: '170g oven-baked salmon seasoned with lemon pepper, 200g baked sweet potato, and steamed green beans.'
      }
    ];
    groceryList = ['0% Plain Greek Yogurt', 'Whey Protein Powder', 'Mixed Berries', 'Granola', 'Chicken Breast', 'Basmati Rice', 'Asparagus', 'Rice Cakes', 'Peanut Butter', 'Bananas', 'Atlantic Salmon', 'Sweet Potatoes'];
  }

  const tips = [
    `Drink at least 2.5 to 3.5 liters of water daily to maintain metabolic rate and reduce false hunger signals.`,
    `Prioritize protein timing: Consume 25-40g of protein every 3-4 hours to optimize muscle protein synthesis (MPS).`,
    `Track dry vs. cooked weights consistently—meat shrinks by ~25% cooked, while rice and oats expand by 2-3x.`
  ];

  return {
    dietTitle: `${dietPreference.charAt(0).toUpperCase() + dietPreference.slice(1)} 1-Day Custom Meal Plan`,
    targetCalories,
    meals,
    tips,
    groceryList
  };
}
