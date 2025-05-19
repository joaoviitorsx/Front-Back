const API_TAREFAS = 'http://localhost:3000/api/tarefas';

export function initTarefas() {
  const main = document.getElementById('conteudoPrincipal');
  main.innerHTML = /*html*/`
    <h2>Gerenciar Tarefas</h2>
    <form id="formTarefa">
      <div class="mb-3">
        <label for="titulo" class="form-label">Título</label>
        <input type="text" class="form-control" id="titulo" required />
      </div>
      <div class="mb-3">
        <label for="descricao" class="form-label">Descrição</label>
        <textarea class="form-control" id="descricao"></textarea>
      </div>
      <div class="mb-3">
        <label for="prioridade" class="form-label">Prioridade</label>
        <select id="prioridade" class="form-select">
          <option value="baixa">Baixa</option>
          <option value="media" selected>Média</option>
          <option value="alta">Alta</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="usuarioId" class="form-label">ID do Usuário</label>
        <input type="text" class="form-control" id="usuarioId" required />
      </div>
      <button type="submit" class="btn btn-primary">Salvar Tarefa</button>
    </form>

    <hr/>
    <h3>Lista de Tarefas</h3>
    <div id="listaTarefas"></div>
  `;

  document.getElementById('formTarefa').addEventListener('submit', salvarTarefa);
  listarTarefas();
}

async function salvarTarefa(e) {
  e.preventDefault();

  const tarefa = {
    titulo: document.getElementById('titulo').value,
    descricao: document.getElementById('descricao').value,
    prioridade: document.getElementById('prioridade').value,
    usuarioId: document.getElementById('usuarioId').value
  };

  const idEditando = document.getElementById('formTarefa').dataset.editandoId;

  try {
    if (idEditando) {
      await fetch(`${API_TAREFAS}/${idEditando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarefa)
      });
      alert('Tarefa atualizada com sucesso!');
    } else {
      await fetch(`${API_TAREFAS}/criarTarefa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarefa)
      });
      alert('Tarefa criada com sucesso!');
    }

    document.getElementById('formTarefa').reset();
    delete document.getElementById('formTarefa').dataset.editandoId;
    listarTarefas();

  } catch (err) {
    alert('Erro ao salvar tarefa.');
    console.error(err);
  }
}

async function listarTarefas() {
  try {
    const resp = await fetch(`${API_TAREFAS}/listarTarefas`);
    const tarefas = await resp.json();
    const div = document.getElementById('listaTarefas');
    div.innerHTML = '';

    tarefas.forEach(t => {
      const card = document.createElement('div');
      card.className = 'card mb-2';
      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${t.titulo}</h5>
          <p class="card-text">${t.descricao || 'Sem descrição'}</p>
          <p class="card-text">Prioridade: <strong>${t.prioridade}</strong></p>
          <p class="card-text">Concluída: ${t.concluida ? '✅' : '❌'}</p>
          <p class="card-text">Usuário ID: ${t.usuarioId}</p>
          <button class="btn btn-sm btn-success me-1" onclick="marcarConcluida('${t._id}')">✅ Concluir</button>
          <button class="btn btn-sm btn-warning me-1" onclick="editarTarefa('${t._id}', '${t.titulo}', '${t.descricao || ''}', '${t.prioridade}', '${t.usuarioId}')">✏️ Editar</button>
          <button class="btn btn-sm btn-danger" onclick="excluirTarefa('${t._id}')">🗑️ Excluir</button>
        </div>
      `;
      div.appendChild(card);
    });
  } catch (err) {
    console.error('Erro ao carregar tarefas:', err);
  }
}

// Função global para marcar como concluída
window.marcarConcluida = async function(id) {
  try {
    const tarefa = await fetch(`${API_TAREFAS}/tarefa/${id}`).then(r => r.json());
    const atualizada = { ...tarefa, concluida: true };

    await fetch(`${API_TAREFAS}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(atualizada)
    });

    alert('Tarefa marcada como concluída!');
    listarTarefas();
  } catch (err) {
    alert('Erro ao concluir tarefa.');
    console.error(err);
  }
}

// Função global para editar tarefa
window.editarTarefa = function(id, titulo, descricao, prioridade, usuarioId) {
  document.getElementById('titulo').value = titulo;
  document.getElementById('descricao').value = descricao;
  document.getElementById('prioridade').value = prioridade;
  document.getElementById('usuarioId').value = usuarioId;
  document.getElementById('formTarefa').dataset.editandoId = id;
}

// Função global para excluir tarefa
window.excluirTarefa = async function(id) {
  if (!confirm('Deseja realmente excluir esta tarefa?')) return;

  try {
    await fetch(`${API_TAREFAS}/excluirTarefa/${id}`, { method: 'DELETE' });
    alert('Tarefa excluída com sucesso!');
    listarTarefas();
  } catch (err) {
    alert('Erro ao excluir tarefa.');
    console.error(err);
  }
}
