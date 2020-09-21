import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Search as SearchIcon, GroupAdd as GroupAddIcon, Help as HelpIcon } from '@material-ui/icons';
import { useStyles } from './material.styles'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'

const MenuBar = props => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory()
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const goTo = path => {
    history.push(path)
  }

  const showInfo = () => {
    Swal.fire({
      title: "Acerca de",
      html:
        "Proyecto 1 del curso Inteligencia Artificial 1<br/><br/>Oscar René Cuéllar Mancilla - 201503712"+
        "<br/>David Andrés Alcázar Escobar - 201504480",
      icon: "info",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok!",
    })
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Proyecto 1 Inteligencia Artificial - 201503712 / 201504480
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key={0} onClick={()=>{goTo('/')}}>
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText primary={"Consultas"} />
          </ListItem>
          <ListItem button key={1} onClick={()=>{goTo('/search')}}>
            <ListItemIcon><GroupAddIcon /></ListItemIcon>
            <ListItemText primary={"Buscar en el Zoo"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={2} onClick={showInfo}>
            <ListItemIcon><HelpIcon /></ListItemIcon>
            <ListItemText primary={"Acerca de"} />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default MenuBar;