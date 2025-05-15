import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import userRoutes from './routes/userRoutes.js';
import calcRoutes from './routes/calcRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/calc', calcRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.send('API MACRO CALC rodando');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
