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
  const session = pl.create(1000);
  const classes = useStyles();
  const animatedComponents = makeAnimated();
  const [tableVisible, setTableVisible] = useState(true)
  const [nombreBusqueda, setNombreBusqueda] = useState("")

  const multiSelectValues = [
    { value: 'longevidadBaja', label: 'Longevidad Baja' },
    { value: 'longevidadMedia', label: 'Longevidad Normal' },
    { value: 'longevidadAlta', label: 'Longevidad Alta' },
    { value: 'peces', label: 'Pez' },
    { value: 'anfibio', label: 'Anfibio' },
    { value: 'reptiles', label: 'Reptil' },
    { value: 'invertebrados', label: 'Invertebrado' },
    { value: 'vertebrados', label: 'Vertebrado' },
  ];

  const [columns, setColumns] = useState([
    { title: 'Nombre', field: 'nombre' },
    { title: 'Nombre cientifico', field: 'nombrec' },
  ]);
  const [data, setData] = useState([]);

  const onSelectChange = (data,e) => {
    var query = "";
    for(const item of data){
      query += item.value+"(X),";
    }
    query = query.substr(0,query.length-1);
    query+='.'
    
    consultProlog(query)
  }

  function getResults() {
    // Return callback function
    return function(answer) {
      // Valid answer
      if(pl.type.is_substitution(answer)) {
        // Get the value of the response
        var X = answer.lookup("X");
        // Show answer
        setData([...data,{nombre:X.id}])
      }
    };
  }

  const consultProlog = async (query) => {
    const getPrologBase = async () => {
      const res = await fetch(PATH_PROLOG_FILE);
      return res.text()
    }

    const fileContent = await getPrologBase();

    session.consult(`${fileContent}`);
    session.query(query)
    session.answers(getResults(), 1000);
  }

  useEffect(() => {
    //muestro todos los animales al inicio
    consultProlog('sienten(X).')
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