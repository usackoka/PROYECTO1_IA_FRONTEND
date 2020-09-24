import { Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { getModalStyle, useStyles } from './styles';

const ModalInfo = props => {

    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
    const { open, setOpen, info } = props;

    useEffect(() => {
        if (info) {
            setOpen(true);
        }
    }, [info])

    return (
        <Modal
            open={open}
            onClose={() => { setOpen(false) }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <h1 id="simple-modal-title">Nombre: {info.nombre??"Vaca"}</h1>
                <h3>Nombre científico: {info.nombrec??"Bos Taurus"}</h3>
                <h3>Peso máximo: {info.pesomax??"200"} kg</h3>
                <h3>Longitud máxima: {info.longmax??"1.91"} m</h3>
                <h3>Esperanza de vida: {info.edadmax??"10"} años</h3>
                <h3>Continentes: {info.continentes??"América, Europa, Asia, África"}</h3>
                <h3>Velocidad: {info.velocidad??"9"} m/s</h3>
                <h3>Población en libertad: {info.poblacion??"4 millones+"}</h3>
            </div>
        </Modal>
    );
}

export default ModalInfo;