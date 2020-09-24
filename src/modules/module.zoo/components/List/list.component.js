import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table';
import { useStyles } from './material.styles'
import { Grid, Paper, Button, TextField } from '@material-ui/core';
import Swal from 'sweetalert2';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import pl from 'tau-prolog'
import ModalInfo from '../ModalInfo';

const ListComponent = props => {

  const PATH_PROLOG_FILE = '@prolog/base.pl'
  const session = pl.create(1000);
  const classes = useStyles();
  const animatedComponents = makeAnimated();
  const [tableVisible, setTableVisible] = useState(true)
  const [nombreBusqueda, setNombreBusqueda] = useState("")
  const [open, setOpen] = useState(false)
  const [infoModal, setInfoModal] = useState({});
  const [seleccionados, setSeleccionados] = useState([])

  const multiSelectValues = [
    { value: 'longevidadBaja', label: 'Longevidad Baja' },
    { value: 'longevidadMedia', label: 'Longevidad Normal' },
    { value: 'longevidadAlta', label: 'Longevidad Alta' },
    { value: 'peces', label: 'Pez' },
    { value: 'reptiles', label: 'Reptil' },
    { value: 'invertebrados', label: 'Invertebrado' },
    { value: 'vertebrados', label: 'Vertebrado' },
  ];

  const [columns, setColumns] = useState([
    { title: 'Nombre', field: 'nombre' },
    { title: 'Nombre cientifico', field: 'nombrec' },
    {
      title: 'Información',
      render: (row) => {
        return <Button
          color="primary"
          onClick={() => { setInfoModal(row); setOpen(true) }}
        >Ver más</Button>;
      }
    }
  ]);

  const [data, setData] = useState([{
    nombre: 'Vaca',
    nombrec: 'Bos Taurus'
  }]);

  const onSelectChange = (list, e) => {
    var query = "";
    if (list) {
      for (const item of list) {
        query += item.value + "(X),";
      }
      query = query.substr(0, query.length - 1);
      query += '.'
    }

    setSeleccionados(list)
    consultProlog(query)
  }

  function getResults(byName) {
    // Return callback function
    return function (answer) {
      // Valid answer
      if (pl.type.is_substitution(answer)) {
        // Get the value of the response
        var X = answer.lookup("X");
        // Show answer
        if (byName) {
          showMessage(true)
        }
        console.log(answer)
        //setData([...data,{nombre:X.id}])
      }
    };
  }

  const handleConsultar = (e) => {
    var query = "";
    const list = [...seleccionados]
    if (list) {
      for (const item of list) {
        query += item.value + "(" + nombreBusqueda + "),";
      }
      query = query.substr(0, query.length - 1);
      query += '.'
    }
    consultProlog(query, true)
    showMessage(false)
  }

  const showMessage = (posee) => {
    Swal.fire({
      icon: posee ? 'success' : 'error',
      title: posee ? 'Sí' : 'No',
      text: 'El animal ' + (posee ? 'si' : 'no') + ' poseé las características',
      timer: 4000
    })
  }

  const consultProlog = async (query, byName = false) => {
    const getPrologBase = async () => {
      const res = await fetch(PATH_PROLOG_FILE);
      return res.text()
    }

    const fileContent = await getPrologBase();

    session.consult(`${fileContent}`);
    session.query(query)
    session.answers(getResults(byName), 1000);
  }

  useEffect(() => {
    //muestro todos los animales al inicio
    consultProlog('sienten(X).')
  }, [])

  return (
    <>
      <ModalInfo
        open={open}
        setOpen={setOpen}
        info={infoModal}
      />
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
              onChange={onSelectChange}
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
              onClick={handleConsultar}
              color="primary">Consultar</Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {
            tableVisible ?
              <Paper className={classes.paper}>
                <MaterialTable
                  title="Resultados"
                  columns={columns}
                  data={data}
                />
              </Paper> : null
          }
        </Grid>
      </Grid>
    </>
  );
}

export default ListComponent;