import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

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
        const novaTarefa = response.data
        setTarefas([...tarefas, novaTarefa])
      })
      .catch(erro => {
        console.log('Erro api salvar: ', erro);
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

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={salvar} />
      <div className={classes.content}>
        <TarefasTable tarefas={tarefas} />
      </div>
    </div>
  );
};

export default TarefaList;
