import axios from 'axios';
import { mostrarMensagem } from './mensagensReducer';

const http = axios.create({
  baseURL: 'https://minhastarefas-api.herokuapp.com'
});

const ACTIONS = {
  LISTAR: 'TAREFAS_LISTAR',
  ADD: 'TAREFAS_ADD',
  REMOVER: 'TAREFAS_REMOVE',
  UPDATE_STATUS: 'TAREFAS_UPDATE_STATUS'
};

const ESTADO_INICIAL = {
  tarefas: [],
  quantidade: 0,
  percentualConcluido: 100
};
export const tarefaReducer = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
    case ACTIONS.LISTAR:
      let obj = {
        quantidade: action.tarefas.length,
        tarefas: action.tarefas
      }
      return {
        ...state,
        tarefas: action.tarefas,
        quantidade: action.tarefas.length,
        percentualConcluido: atualizaConcluidas(obj)

      };
    case ACTIONS.ADD:
      return {
        ...state,
        tarefas: [...state.tarefas, action.tarefa],
        quantidade: action.tarefas.length,
        percentualConcluido: atualizaConcluidas(state)
      };
    case ACTIONS.REMOVER:
      return {
        ...state,
        tarefas: state.tarefas.filter(tarefa => tarefa.id !== action.id),
        quantidade: action.tarefas.length,
        percentualConcluido: atualizaConcluidas(state)
      };
    case ACTIONS.UPDATE_STATUS:
      const lista = [...state.tarefas];

      lista.forEach(tarefa => {
        if (tarefa.id === action.id) {
          tarefa.done = true;
        }        
      });
      return {
        ...state,
        tarefas: lista,
        percentualConcluido: atualizaConcluidas(state)
      };

    default:
      return state;
  }
};

export function listar() {
  return dispatch => {
    http
      .get('/tarefas', {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
      })
      .then(response => {
        dispatch({
          type: ACTIONS.LISTAR,
          tarefas: response.data
        });
      });
  };
}

export function salvar(tarefa) {
  return dispatch => {
    http
      .post('/tarefas', tarefa, {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
      })
      .then(response => {
        dispatch([
          {
            type: ACTIONS.ADD,
            tarefa: response.data
          },
          mostrarMensagem('Tarefa Salva com Sucesso!')
        ]);
      })
      .catch(erro => {
        console.log('Erro ao tentar salvar: ', erro);
      });
  };
}

export function atualizaConcluidas(state) {
  let quantidadeTarefasConcluidas = 0;
  state.tarefas.forEach(tarefa => {
    if (tarefa.done) {
      quantidadeTarefasConcluidas= quantidadeTarefasConcluidas +1;
    }
  });

  return (quantidadeTarefasConcluidas / state.quantidade) * 100
}
export function deletar(id) {
  return dispatch => {
    http
      .delete(`/tarefas/${id}`, {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
      })
      .then(response => {
        dispatch([
          {
            type: ACTIONS.REMOVER,
            id: id
          },
          mostrarMensagem('Tarefa excluída com sucesso!')
        ]);
      });
  };
}

export function alterarStatus(id) {
  return dispatch => {
    http
      .patch(`tarefas/${id}`, null, {
        headers: { 'x-tenant-id': localStorage.getItem('email_usuario_logado') }
      })
      .then(response => {
        dispatch([
          {
            type: ACTIONS.UPDATE_STATUS,
            id: id
          },
          mostrarMensagem('Tarefa atualizada com sucesso!')
        ]);
      });
  };
}
