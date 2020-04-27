const ACTIONS = {
  LISTAR: 'TAREFAS_LISTAR',
  ADD: 'TAREFAS_ADD',
  REMOVER: 'TAREFAS_REMOVE'
};

const ESTADO_INICIAL = {
    tarefas: []
}
export const tarefaReducer = (state = ESTADO_INICIAL, action) => {
  switch (action.type) {
    case ACTIONS.LISTAR:
      return { ...state, tarefas: action.tarefas };

    default:
      return state;
  }
};
