import mongoose from 'mongoose';

const tarefaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    minlength: 3
  },
  descricao: {
    type: String
  },
  concluida: {
    type: Boolean,
    default: false
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  },
  prioridade: {
    type: String,
    enum: ['baixa', 'media', 'alta'],
    default: 'media'
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
});

tarefaSchema.methods.marcarComoConcluida = function() {
  this.concluida = true;
  return this.save();
};

tarefaSchema.statics.buscarPorPrioridade = function(prioridade) {
  return this.find({ prioridade });
};

export default mongoose.model('Tarefa', tarefaSchema);
