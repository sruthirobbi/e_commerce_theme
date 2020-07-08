import React,{useState,useContext} from 'react';
import Title from '../../common/Title/Title';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import TeaSvg from '../../common/TeaSvg/TeaSvg';
import './SignIn.scss';
import axios from 'axios';
import {AuthContext} from '../Context/AuthContext';
import setAuthToken from '../../utils/setAuthToken';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
         height: '400px',
      },
    },
    paper1:{
        display:'grid',
        gridTemplateRows: '75px 0px 219px 29px 4px',
    },
    paper2:{
        display:'grid',
        gridTemplateRows: '75px 62px 189px 0px 70px',
    },
    container:{
        textAlign:'center'
    },
    inputFields:{
        '& > *': {
            margin: '6px 24px',
             width: '300px',
          },
    },
    link:{
       marginLeft:'58%',
    },
    button:{
        width: '50%',
        margin: '17px 0px',
        marginLeft: '25%'
    },
    button2:{
        margin:'3px 30px',
        height:'40px'
    },
    anchor:{
        textDecoration:"none"
    }
  }));


function SignIn(){

    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { dispatch } = useContext(AuthContext);
    const [error,setErroMsg] = useState([])

    const hanldeLogin = async() =>{

        let token = localStorage.getItem('token')
        console.log(token)
        const frmdetails = {
            'email' : email,
            'password' : password
        }

        if(!email || !password){
            setErroMsg("Please provide both the fields")
        }else{
            const newUser = {
                email,
                password
            }

            try{
                const config = {
                    headers : {
                        'content-Type':'application/json'
                    }
                }

                const body = JSON.stringify(newUser);
                const res = await axios.get('http://localhost:5000/users/user',body,config);
                dispatch({
                    type:"user_Loaded",
                    payload:res.data
                });
            }catch(err){
                setErroMsg(err.response.data)
                dispatch({
                    type:"auth_Error"
                });
            }
        }
    }

    return(
        <div>
            <div className="SignIn-title">
                <Title title="Sign-In" fontsize="30px"/>
                <TeaSvg/>
            </div>
            <div className={classes.root}>
            <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Paper elevation={3} className={classes.paper1}>
                                <Title title="Sign-In" fontsize="20px" />
                            <Divider/>
                            
                            <form className={classes.inputFields} onSubmit={hanldeLogin} noValidate autoComplete="off">
                                <section>Email Address </section>
                                <TextField 
                                            id="outlined-basic" 
                                            className={classes.inputFields} 
                                            label="Required" 
                                            variant="outlined"
                                            name="email"
                                            value={email}
                                            onChange={e=>setEmail(e.target.value)}
                                             />

                                <section> Password </section>
                                <TextField 
                                            id="outlined-basic" 
                                            label="Required" 
                                            variant="outlined"
                                            name="password"
                                            className={classes.inputFields}
                                            onChange={e=>setPassword(e.target.value)}
                                            value={password} />
                            </form>
                            <div>
                                <Link className={classes.link} to="#"  color="secondary">
                                    Forget Password ?
                                </Link>
                            </div>
                            <Divider/>
                            <Button     className={classes.button} 
                                        variant="contained" 
                                        color="secondary"
                                        onClick={hanldeLogin}
                                        >Login</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Paper elevation={3} className={classes.paper2}>
                            <Title title="No Account? No Problem!" fontsize="20px"/>
                            <Divider/>
                            <div className={classes.container}>
                                <Title title="Continue to checkout without an account" fontsize="20px"/>
                                <Link to="/Billing" style={{textDecoration:"none"}}>
                                <Button className={classes.button2} variant="contained" color="secondary">
                                    Continue as a Guest
                                </Button>
                                </Link>
                            </div>
                            <Divider/>
                            <Link to="/Register" className={classes.anchor}>
                                <Button  className={classes.button} variant="contained" color="secondary">  
                                Create an Account</Button>
                            </Link>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default SignIn