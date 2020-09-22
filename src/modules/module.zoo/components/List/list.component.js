import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table';
import { useStyles } from './material.styles'
import { Grid, Paper, Button, TextField, FormControlLabel, Form } from '@material-ui/core';
import Swal from 'sweetalert2';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import pl from 'tau-prolog'

const ListComponent = props => {

  const PATH_PROLOG_FILE = '@prolog/base.pl'
  const session = pl.create();
  const classes = useStyles();
  const animatedComponents = makeAnimated();
  const [tableVisible, setTableVisible] = useState(true)
  const [nombreBusqueda, setNombreBusqueda] = useState("")

  const multiSelectValues = [
    { value: 'lbaja', label: 'Longevidad Baja' },
    { value: 'lnormal', label: 'Longevidad Normal' },
    { value: 'lalta', label: 'Longevidad Alta' },
    { value: 'pez', label: 'Pez' },
    { value: 'anfibio', label: 'Anfibio' },
    { value: 'reptil', label: 'Reptil' },
    { value: 'invertebrado', label: 'Invertebrado' },
    { value: 'vertebrado', label: 'Vertebrado' },
  ];

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

    const catchAnswer = (answer) => {
      console.log(answer)
      if (answer) {
        session.answer({
          success: catchAnswer,
          error: function (err) { /* Uncaught error */ },
          fail: function () { /* Fail */ },
          limit: function () { /* Limit exceeded */ }
        })
      }
    }

    const consult = async () => {
      const data = await getPrologBase();
      const query = 'vertebrado(X).'

      session.consult(`${data}`, {
        success: function () {
          // Query
          session.query(query, {
            success: function (goal) {
              // Answers
              session.answer({
                success: catchAnswer,
                error: function (err) { /* Uncaught error */ },
                fail: function () { /* Fail */ },
                limit: function () { /* Limit exceeded */ }
              })
            },
            error: function (err) { /* Error parsing goal */ }
          });
        },
        error: function (err) { /* Error parsing program */ }
      });
    }

    consult()
  }, [])

  return (
    <>
      <Grid container spacing={3} justify="center" alignItems="stretch">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={multiSelectValues}
              onMenuOpen={() => { setTableVisible(false) }}
              onMenuClose={() => { setTableVisible(true) }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h3>Posee esas características?</h3>
            <TextField
              required id="standard-required"
              name="nombre"
              value={nombreBusqueda}
              onChange={(e) => { setNombreBusqueda(e.target.value) }}
              label="Nombre del animal"
              helperText="Nombre del animal a buscar"
            />
            <Button 
              variant="contained" 
              color="primary">Consultar</Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {
            tableVisible ?
              <Paper className={classes.paper}>
                <MaterialTable
                  title="Resultados"
                  columns={state.columns}
                  data={state.data}
                />
              </Paper> : null
          }
        </Grid>
      </Grid>
    </>
  );
}

export default ListComponent;