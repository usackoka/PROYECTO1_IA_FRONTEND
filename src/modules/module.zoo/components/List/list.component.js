import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table';
import { useStyles } from './material.styles'
import { Grid, Paper, Button, TextField } from '@material-ui/core';
import Swal from 'sweetalert2';
import pl from 'tau-prolog'

const ListComponent = props => {

  const PATH_PROLOG_FILE = '@prolog/base.pl'
  const session = pl.create();
  const classes = useStyles();

  const [state, setState] = useState({
    columns: [
      { title: 'Nombre', field: 'nombre' },
    ],
    data: [],
  });

  useEffect(() => {

    const getPrologBase = async () => {
      const data = await fetch(PATH_PROLOG_FILE);
      return data.text()
    }

    const consult = async () => {
      const data = await getPrologBase();
      console.log(data)
      session.consult(`${data}`, {
        success: function () { /* Program loaded correctly */ },
        error: function (err) { /* Error parsing program */ }
      });

      session.query("vertebrado(X).", {
        success: function (goal) { /* Goal loaded correctly */ },
        error: function (err) { /* Error parsing program */ }
      });

      session.answer({
        success: function (answer) {
          console.log(session.format_answer(answer)); // X = salad ;
          session.answer({
            success: function (answer) {
              console.log(session.format_answer(answer)); // X = apples ;
            },
            // ...
          });
        },
        fail: function () { /* No more answers */ },
        error: function (err) { /* Uncaught exception */ },
        limit: function () { /* Limit exceeded */ }
      });
    }

    consult()
  }, [])

  return (
    <>
      <Grid container spacing={3} justify="center" alignItems="stretch">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <MaterialTable
              title="Resultados"
              columns={state.columns}
              data={state.data}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default ListComponent;