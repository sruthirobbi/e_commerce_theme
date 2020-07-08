import React,{ useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {Drawer,AppBar,Badge,Toolbar,List,CssBaseline,Typography,Divider,IconButton,ListItem,ListItemIcon,ListItemText} from '@material-ui/core';
import CircleButton from '../../common/CircleButton/CircleButton';
import './Main.scss';
import { Route, Switch } from 'react-router-dom';
import TeaScreen from '../TeaScreen/TeaScreen';
import HomeScreen from '../HomeScreen/HomeScreen';
import Error from '../Error/Error';
import Checkout from '../Checkout/Checkout';
import {CounterContext} from '../Context/Context';
import SignIn from '../SignIn/SignIn';
import Register from '../Auth/Register';
import AboutUs from '../AboutUs/AboutUs';
import { Link } from 'react-router-dom';
import Footer from '../../common/Footer/Footer';
import Billing from '../Billing/Billing';
import ContactUs from '../ContactUs/ContactUs';
import AddItem from '../AddItem/AddItem';


const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    [theme.breakpoints.only('xs')]: {
        width: theme.spacing(0) + 1,
      },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
     flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: "64px",
  },
  listText:{
    marginLeft: "10px"
  },
  rightToolbar: {
    marginLeft: 'auto',
    marginRight: "11px",
  },
  IconButton:{
    marginRight:"15px"
  },
  anchor:{
    color:"white"
  },
  logo:{
    textDecoration:"none",
    color:"white"
  },
  link:{
    textDecoration:"none",
    color:"#ff5c62"
  }
}));

const leftMenuData = [
    {
        id:1,
        textName: "Home",
        iconName: "home",
        link:'/'
    },
    {
        id:2,
        textName: "Tea",
        iconName: "coffee",
        link:"/tea"
    },
    {
        id:3,
        textName: "Add ",
        iconName: "plus",
        link:"/AddItem"
    },
    {
        id:4,
        textName: " About Us ",
        iconName: "users",
        link:"/AboutUs"
    },
    {
        id:5,
        textName: "Contact",
        iconName: "hourglass-half",
        link:"/ContactUs"
    },
]


function Main() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const { state } = useContext(CounterContext);

 
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [sideDrawer, setsideDrawer] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setsideDrawer({ ...sideDrawer, [anchor]: open });
  };

  const closeDrawer = (anchor,open) => ()=>{
    setsideDrawer({ ...sideDrawer, [anchor]: open });
  }


  return (
    <div className={classes.root} >
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
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </IconButton>
                <Link to={'/'} className={classes.logo}>
                <Typography variant="h6" noWrap>
                    Tea Pot
                </Typography>
                </Link>
                <section className={classes.rightToolbar}>
                    <IconButton className={classes.IconButton} aria-label="show 4 new mails" color="inherit" onClick={toggleDrawer('right', true)}>
                        <Badge badgeContent={state.count} color="secondary">
                             <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                        </Badge>
                    </IconButton>
                    
                      <IconButton  color="inherit">
                            <Link to={'/SignIn'} className={classes.anchor}>
                              <i className="fa fa-user" aria-hidden="true"></i>
                            </Link>
                      </IconButton>
                    
                </section>
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
                <i className="fa fa-angle-left" aria-hidden="true"></i>
            </IconButton>
        </div>
        
        <Divider />
        <List>
          {leftMenuData.map((text, index) => (
            <Link to={text.link} key={text.id} underline="none" className={classes.link} >
                <ListItem button  index={index}>
                    <ListItemIcon>
                        <CircleButton iconName={text.iconName}/>
                    </ListItemIcon>
                    <ListItemText primary={text.textName} className={classes.listText}/>
                </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}  >
        
        <Switch>
            <Route path="/" component={HomeScreen} exact/>
            <Route path="/tea" component={TeaScreen} />
            <Route path="/SignIn" component={SignIn}/>
            <Route path="/Register" component={Register}/>
            <Route path="/AboutUs" component={AboutUs}/>
            <Route path="/Billing" component={Billing}/>
            <Route path="/ContactUs" component={ContactUs}/>
            <Route path="/AddItem" component={AddItem}/>
            <Route component={Error}/>
        </Switch>
      </main>

        <Drawer 
                anchor={'right'} 
                open={sideDrawer['right']} 
                onClose={toggleDrawer('right', false)}
                >
            <Checkout onclose={closeDrawer('right',false)}/>
        </Drawer>
        <Footer/>
      
    </div>
  );
}



export default Main