import Tarefa from '../models/Tarefa.js';

export const listarTarefas = async (req, res) => {
  const tarefas = await Tarefa.find();
  res.json(tarefas);
};

export const criarTarefa = async (req, res) => {
  const { titulo, descricao, status, usuarioId, data } = req.body;
  console.log(req.body);
  const novaTarefa = new Tarefa({ titulo, descricao, status, usuarioId, data });
  await novaTarefa.save();
  res.status(201).json(novaTarefa);
};

export const obterTarefa = async (req, res) => {
  const tarefa = await Tarefa.findById(req.params.id);
  if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
  res.json(tarefa);
};

export const listarParametros = async (req, res) => {
  console.log(req.query);
  res.send();
};

export const atualizarTarefa = async (req, res) => {
  const { titulo, descricao, status, usuarioId, data } = req.body;
  const tarefaAtualizada = await Tarefa.findByIdAndUpdate(
    req.params.id,
    { titulo, descricao, status, usuarioId, data },
    { new: true }
  );
  res.json(tarefaAtualizada);
};

export const deletarTarefa = async (req, res) => {
  await Tarefa.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
