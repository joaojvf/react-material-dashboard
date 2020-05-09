import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { listar } from '../../store/tarefasReducer';
import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.listar();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Budget quantidadeTarefas = {props.notificacoes}/>
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalUsers />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TasksProgress percentualConcluido={props.percentualConcluido} />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalProfit tarefaParaConcluir = {props.tarefaParaConcluir}/>
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <LatestSales />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <UsersByDevice tarefasConcluidas = {props.tarefasConcluidas} tarefaParaConcluir = {props.tarefaParaConcluir}/>
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          {/* <LatestProducts /> */}
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          {/* <LatestOrders /> */}
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  percentualConcluido: state.tarefas.percentualConcluido,
  notificacoes: state.tarefas.quantidade,
  tarefaParaConcluir: 100 - state.tarefas.percentualConcluido,
  tarefasConcluidas: state.tarefas.percentualConcluido
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      listar,
      
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
