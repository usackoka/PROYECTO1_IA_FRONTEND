import React, { useState } from 'react'
import { useStyles } from './material.styles'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import {db} from '../../../../firebase'
import Swal from 'sweetalert2';

const CRUDComponent = props => {
  const classes = useStyles();
  const [data,setData] = useState({
    nombre:"",
    cui:"",
    correo:"",
    carnet:"",
    grupo:"",
    semestre:"",
    year:"2020"
  })

  const handleChange = (e) => {
    setData({...data,[e.target.name]: e.target.value})
  }

  const handleSubmit = async () => {

    if(data.carnet==="" && data.nombre==="" && data.cui===""){
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 6000,
      })
      Toast.fire({
        icon: 'error',
        title: "Debe completar la información!"
      })
      return
    }

    await db.collection('Solicitudes').doc().set(data)
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 6000,
    })
    Toast.fire({
      icon: 'success',
      title: "Registro guardado con éxito!"
    })
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1} direction="column" justify="center" alignItems="stretch">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h2>Insertar Estudiante</h2>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h3>Datos Personales</h3>
            <form className={classes.rootTxt} noValidate autoComplete="off">
              <TextField required id="standard-required" name="nombre" value={data.nombre} onChange={handleChange} label="Nombre" helperText="Nombre Completo" />
              <TextField required id="standard-required" name="cui" value={data.cui} onChange={handleChange} label="CUI" helperText="Documento único de identficación" />
              <TextField required id="standard-required" name="correo" value={data.correo} onChange={handleChange} label="Correo" helperText="Información de contacto" />
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h3>Datos Universitarios</h3>
            <form className={classes.rootTxt} noValidate autoComplete="off">
              <TextField required id="standard-required" name="carnet" value={data.carnet} onChange={handleChange} label="Carnet" helperText="Número de carnet" />
              <TextField required id="standard-required" name="semestre" value={data.semestre} onChange={handleChange} label="Semestre" helperText="Semestre actual" />
              <TextField required id="standard-required" name="year" value={data.year} onChange={handleChange} label="Año" helperText="Año que se presenta la solicitud (YYYY)" />
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <h3>Datos del Grupo</h3>
            <form className={classes.rootTxt} noValidate autoComplete="off">
              <TextField required id="standard-required" name="grupo" value={data.grupo} onChange={handleChange} label="Grupo" helperText="Nombre del grupo a asignar" />
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Tooltip title="Guardar" placement="right-end" onClick={handleSubmit}>
        <Fab color="secondary" className={classes.absolute}>
          <SaveIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}

export default CRUDComponent;