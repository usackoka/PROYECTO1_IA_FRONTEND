import { Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { getModalStyle, useStyles } from './styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image='/public/@images/vaca.jpg'
                            //image={"/public/@images/"+info.nombre+".jpg"}
                            title="Imagen"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Nombre: {info.nombre ?? "Vaca"}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <p>
                                    Nombre científico: {info.nombrec ?? "Bos Taurus"}<br />
                                    Peso máximo: {info.pesomax ?? "200"} kg<br />
                                    Longitud máxima: {info.longmax ?? "1.91"} m<br />
                                    Esperanza de vida: {info.edadmax ?? "10"} años<br />
                                    Continentes: {info.continentes ?? "América, Europa, Asia, África"}<br />
                                    Velocidad: {info.velocidad ?? "9"} m/s<br />
                                    Población en libertad: {info.poblacion ?? "4 millones+"}<br />
                                </p>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={()=>{setOpen(false)}}>
                            Close
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </Modal>
    );
}

export default ModalInfo;