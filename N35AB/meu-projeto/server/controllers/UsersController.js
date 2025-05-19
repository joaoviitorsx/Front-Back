// server/controllers/UsersController.js
import Users from '../models/Users.js';

export const listarUsers = async (req, res) => {
  const users = await Users.find();
  res.json(users);  
};

// export const criarAgendamento = async (req, res) => {
//   const { nome, data, horario } = req.body;
//   const novo = new Agendamento({ nome, data, horario });
//   await novo.save();
//   res.status(201).json(novo);
// };

// export const obterAgendamento = async (req, res) => {
//   const ag = await Agendamento.findById(req.params.id);
//   if (!ag) return res.status(404).json({ erro: 'Agendamento não encontrado' });
//   res.json(ag);
// };

// export const atualizarAgendamento = async (req, res) => {
//   const { nome, data, horario } = req.body;
//   const ag = await Agendamento.findByIdAndUpdate(req.params.id, { nome, data, horario }, { new: true });
//   res.json(ag);
// };

// export const deletarAgendamento = async (req, res) => {
//   await Agendamento.findByIdAndDelete(req.params.id);
//   res.status(204).end();
// };

