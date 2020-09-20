import React, { useState } from 'react'
import MaterialTable from 'material-table';
import { db } from '../../../../firebase'
import { useStyles } from '../Search/material.styles'
import { Grid, Paper, Button, TextField } from '@material-ui/core';
import Swal from 'sweetalert2';

const ListComponent = props => {
  const classes = useStyles();
  const [busqueda1, setBusqueda1] = useState({
    grupo: ""
  })
  const [busqueda2, setBusqueda2] = useState({
    carnet: "",
    year: "",
    semestre: ""
  })
  const [state, setState] = useState({
    columns: [
      { title: 'Nombre', field: 'nombre' },
      { title: 'Carnet', field: 'carnet' },
      { title: 'CUI', field: 'cui' },
      { title: 'Semestre', field: 'semestre' },
      { title: 'Año', field: 'year' },
      { title: 'Grupo', field: 'grupo' },
      { title: 'Correo', field: 'correo' },
    ],
    data: [],
  });

  const msg = async () => {
    Swal.fire({
      icon: 'success',
      title:"Busqueda finalizada!",
      text:"Continuar..."
    })
  }

  const getPrivados = async () => {
    db.collection('Solicitudes').onSnapshot((querySnapshot) => {
      let list = []
      querySnapshot.forEach((doc) => {
        list.push({
          ...doc.data(), id: doc.id
        })
      });
      setState({ ...state, data: list })
    });
  }

  const handleChange1 = e => {
    setBusqueda1({ ...busqueda1, [e.target.name]: e.target.value })
  }

  const handleChange2 = e => {
    setBusqueda2({ ...busqueda2, [e.target.name]: e.target.value })
  }

  const handleClick = async e => {
    msg();
    getPrivados()
  }

  const handleClickB1 = async e => {
    msg();
    db.collection('Solicitudes')
    .where("grupo", "==", busqueda1.grupo)
    .get()
      .then(function (querySnapshot) {
        let list = []
        querySnapshot.forEach(function (doc) {
          list.push({
            ...doc.data(), id: doc.id
          })
        });
        setState({ ...state, data: list })
      })
  }

  const handleClickB2 = async e => {
    msg();
    let carnet = 0;
    try {
      carnet = parseInt(busqueda2.carnet)
    } catch (error) {
      console.log("error al parsear int: "+error)
    }
    db.collection('Solicitudes')
    .where("carnet", "==", busqueda2.carnet)
    .where("semestre", "==", busqueda2.semestre)
    .where("year", "==", busqueda2.year)
    .get()
      .then(function (querySnapshot) {
        let list = []
        querySnapshot.forEach(function (doc) {
          list.push({
            ...doc.data(), id: doc.id
          })
        });
        setState({ ...state, data: list })
      })
  }

  return (
    <>
      <Grid container spacing={3} justify="center" alignItems="stretch">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Button onClick={handleClick} color="primary">Mostrar Todos</Button>
            <MaterialTable
              title="Listado de Privados"
              columns={state.columns}
              data={state.data}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h2>Búsqueda por Grupo</h2>
            <TextField required id="standard-required" name="grupo" value={busqueda1.grupo} onChange={handleChange1} label="Grupo" helperText="Nombre del grupo" />
            <br /><br />
            <Button onClick={handleClickB1} color="primary">Buscar</Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <h2>Búsqueda por Datos</h2>
            <TextField required id="standard-required" name="carnet" value={busqueda2.carnet} onChange={handleChange2} label="Carnet" helperText="Número de carnet" />
            <TextField required id="standard-required" name="year" value={busqueda2.year} onChange={handleChange2} label="Año" helperText="Año a buscar" />
            <TextField required id="standard-required" name="semestre" value={busqueda2.semestre} onChange={handleChange2} label="Semestre" helperText="Semestre" />
            <br /><br />
            <Button onClick={handleClickB2} color="primary">Buscar</Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default ListComponent;