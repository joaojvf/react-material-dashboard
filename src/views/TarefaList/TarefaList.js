import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  listar,
  salvar,
  deletar,
  alterarStatus
} from '../../store/tarefasReducer';

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

const TarefaList = props => {
  const classes = useStyles();
  const [tarefas, setTarefas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [mensagemDialog, setmensagemDialog] = useState('Deu certo');

  const TAREFA_URL = 'https://minhastarefas-api.herokuapp.com/tarefas';

  useEffect(() => {
    props.listar();
  }, []);

  return (
    <div className={classes.root}>
      <TarefasToolbar salvar={props.salvar} />
      <div className={classes.content}>
        <TarefasTable
          deleteAction={props.deletar}
          alterarStatus={props.alterarStatus}
          tarefas={props.tarefas}
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

const mapStateToProps = state => ({
  tarefas: state.tarefas.tarefas
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ listar, salvar, deletar, alterarStatus }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TarefaList);
