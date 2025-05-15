// routes/calcRoutes.js
import express from "express";
const router = express.Router();

// Simulando usuários em memória com o novo campo 'goal'
const users = [
  {
    id: 1,
    name: "João",
    age: 25,
    sex: "masculino",
    weight: 70,
    height: 175,
    activityLevel: "moderado",
    goal: "manter", // pode ser 'ganhar', 'perder' ou 'manter'
  },
  {
    id: 2,
    name: "Maria",
    age: 30,
    sex: "feminino",
    weight: 60,
    height: 165,
    activityLevel: "leve",
    goal: "perder",
  },
];

// Mapeando níveis de atividade para fator
function getActivityFactor(level) {
  const map = {
    sedentario: 1.2,
    leve: 1.375,
    moderado: 1.55,
    intenso: 1.725,
    extremo: 1.9,
  };
  return map[level] || 1.2;
}

// Função de cálculo de macronutrientes
function calcularMacronutrientes(user) {
  const bmr =
    10 * user.weight +
    6.25 * user.height -
    5 * user.age +
    (user.sex === "masculino" ? 5 : -161);

  let calories = bmr * getActivityFactor(user.activityLevel);

  // Ajustar calorias de acordo com objetivo
  if (user.goal === "ganhar") {
    calories += 500;
  } else if (user.goal === "perder") {
    calories -= 500;
  }

  calories = Math.round(calories);

  const protein = Math.round(user.weight * 2); // 2g por kg
  const fats = Math.round(user.weight * 1); // 1g por kg
  const carbs = Math.round((calories - (protein * 4 + fats * 9)) / 4);

  return { calories, protein, fats, carbs };
}

// Rota GET para calcular os macros com base no ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id == id);

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  const macros = calcularMacronutrientes(user);
  res.json(macros);
});

export default router;
