import React, { useState } from 'react'
import MaterialTable from 'material-table';
import { useStyles } from './material.styles'
import { Grid, Paper, Button, TextField } from '@material-ui/core';
import Swal from 'sweetalert2';
import pl from 'tau-prolog'

const ListComponent = props => {

  const prologSession = pl.create();

  const classes = useStyles();

  const [state, setState] = useState({
    columns: [
      { title: 'Nombre', field: 'nombre' },
    ],
    data: [],
  });

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