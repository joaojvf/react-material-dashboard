import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button
} from '@material-ui/core';

import { TarefasToolbar, TarefasTable } from './components';

import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TarefaList = () => {
  const classes = useStyles();
  const [tarefas, setTarefas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagemDialog, setmensagemDialog] = useState('Deu certo');

  const TAREFA_URL = 'https://minhastarefas-api.herokuapp.com/tarefas';
  const headers = { 'x-tenant-id': 'jvf@teste.com' };

  useEffect(() => {
    listarTarefas();
  }, []);

  const salvar = tarefa => {
    axios
      .post(TAREFA_URL, tarefa, {
        headers: headers
      })
      .then(response => {
        const novaTarefa = response.data;
        setTarefas([...tarefas, novaTarefa]);
        setmensagemDialog('Item adicionado com sucesso!');
        setOpenDialog(true);
      })
      .catch(erro => {
        setmensagemDialog('Ocorreu um erro ao adicionar um item.');
        setOpenDialog(true);
      });
  };

  const listarTarefas = () => {
    axios
      .get(TAREFA_URL, { headers: headers })
      .then(response => {
        const listaDeTarefas = response.data;
        console.log('Lista de tarefas: ', listaDeTarefas);
        setTarefas(listaDeTarefas);
      })
      .catch(erro => {
        console.log('Erro no get da API:', erro);
      });
  };

  const alterarStatus = id => {
    axios
      .patch(`${TAREFA_URL}/${id}`, null, {
        headers: headers
      })
      .then(response => {
        const lista = [...tarefas];
        lista.forEach(tarefa => {
          if (tarefa.id === id) {
            tarefa.done = true;
          }
        });
        setTarefas(lista);
        console.log('Item alterado com sucesso: ', response.data);
      })
      .catch(erro => {
        console.log('Erro alterar status: ', erro);
      });
  };

  const deletar = id => {
    axios
      .delete(`${TAREFA_URL}/${id}`, {
        headers: headers
      })
      .then(response => {
        setmensagemDialog('Item removido com sucesso!');
        setOpenDialog(true);
        const lista = tarefas.filter(tarefa => tarefa.id != id);
        setTarefas(lista);
      })
      .catch(erro => {
        setmensagemDialog('Ocorreu um erro ao adicionar um item.');
        setOpenDialog(true);
      });
  };
  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar} />
      <div className={classes.content}>
        <TarefasTable
          deleteAction={deletar}
          alterarStatus={alterarStatus}
          tarefas={tarefas}
        />
      </div>
      <Dialog open={openDialog} onClose={e => setOpenDialog(false)}>
        <DialogTitle>Atenção </DialogTitle>
        <DialogContent>{mensagemDialog}</DialogContent>
        <DialogActions>
          <Button onClick={e => setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TarefaList;
