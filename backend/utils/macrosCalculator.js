// Função para calcular TMB usando fórmula Mifflin-St Jeor
export function calculateTMB({ weight, height, age, sex }) {
  if (sex === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

// Fatores de atividade
const activityFactors = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

// Função para calcular calorias ajustadas pelo nível de atividade e objetivo
export function calculateCalories(tmb, activityLevel, goal) {
  const factor = activityFactors[activityLevel] || 1.2;
  let calories = tmb * factor;

  if (goal === 'gain') calories += 300;
  else if (goal === 'loss') calories -= 300;

  return Math.round(calories);
}

// Calcula macronutrientes em gramas (baseado nas calorias totais)
export function calculateMacros(calories, goal) {
  let proteinPerc, fatPerc, carbPerc;

  if (goal === 'gain') {
    proteinPerc = 0.3;
    fatPerc = 0.25;
    carbPerc = 0.45;
  } else if (goal === 'loss') {
    proteinPerc = 0.4;
    fatPerc = 0.3;
    carbPerc = 0.3;
  } else {
    proteinPerc = 0.3;
    fatPerc = 0.3;
    carbPerc = 0.4;
  }

  const protein = Math.round((calories * proteinPerc) / 4);
  const fat = Math.round((calories * fatPerc) / 9);
  const carbs = Math.round((calories * carbPerc) / 4);

  return { protein, fat, carbs };
}
