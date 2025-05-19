import express from 'express';
import {
  listarTarefas,
  obterTarefa,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa,
  listarParametros
} from '../controllers/TarefaController.js';

const router = express.Router();

router.get('/listarTarefas', listarTarefas);
router.get('/tarefa/:id', obterTarefa);
router.post('/criarTarefa', criarTarefa);
router.put('/:id', atualizarTarefa);
router.delete('/excluirTarefa/:id', deletarTarefa);

router.get('/listarparametros', listarParametros);

// Rota inválida dentro de /tarefa/*
router.use((req, res) => {
  res.status(404).json({
    erro: 'Subrota de /tarefa não encontrada',
    caminho: req.originalUrl
  });
});

export default router;
