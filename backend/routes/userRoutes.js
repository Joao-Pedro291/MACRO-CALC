import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Criar usuário
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Atualizar usuário
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Buscar usuário por id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Buscar todos usuários (opcional)
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export default router;
