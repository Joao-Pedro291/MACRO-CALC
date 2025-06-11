import express from "express";
import users from "../data/users.js"
const router = express.Router();


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

function calcularMacronutrientes(user) {
  const bmr =
    10 * user.weight +
    6.25 * user.height -
    5 * user.age +
    (user.sex === "masculino" ? 5 : -161);

  let calories = bmr * getActivityFactor(user.activityLevel);

  if (user.goal === "ganhar") {
    calories += 500;
  } else if (user.goal === "perder") {
    calories -= 500;
  }

  calories = Math.round(calories);

  const protein = Math.round(user.weight * 2); 
  const fats = Math.round(user.weight * 1); 
  const carbs = Math.round((calories - (protein * 4 + fats * 9)) / 4);

  return { calories, protein, fats, carbs };
}

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
