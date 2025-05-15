import express from 'express';
import User from '../models/User.js';
import { calculateTMB, calculateCalories, calculateMacros } from '../utils/macrosCalculator.js';

const router = express.Router();

// Rota para calcular macronutrientes baseado em dados do usuário
router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;

    let user;

    if (userId) {
      user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    } else {
      // Caso envie dados no corpo direto (sem userId)
      user = req.body;
    }

    const tmb = calculateTMB(user);
    const calories = calculateCalories(tmb, user.activityLevel, user.goal);
    const macros = calculateMacros(calories, user.goal);

    // Salva no histórico se for usuário cadastrado
    if (userId) {
      user.history.push({
        calories,
        protein: macros.protein,
        carbs: macros.carbs,
        fats: macros.fat,
      });
      await user.save();
    }

    res.json({
      calories,
      protein: macros.protein,
      carbs: macros.carbs,
      fats: macros.fat,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
