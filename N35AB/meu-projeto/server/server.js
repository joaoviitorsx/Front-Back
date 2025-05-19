// server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDB} from './config/database.js';

// Importando Rotas
// import usuarioRoutes from './routes/usuarioRoutes.js';
import tarefaRoutes from './routes/TarefaRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API do Sistema de Agendamentos Online');
  });

app.use('/api/tarefas', tarefaRoutes);

app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota não encontrada',
    caminho: req.originalUrl
  });
});
  
connectDB();


app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});