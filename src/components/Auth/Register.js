import React,{useState,useContext} from 'react';
import Title from '../../common/Title/Title';
import {Grid,Paper,Divider,TextField,Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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
        gridTemplateRows: '75px 11px 108px 103px 109px 114px',
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
    button:{
        width: '50%',
        margin: '17px 0px',
        marginLeft: '23%'
    },
    anchor:{
        textDecoration:"none"
    },
    link:{
       marginLeft:'58%',
      
    },
  }));


function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { dispatch } = useContext(AuthContext);
    const [error,setErroMsg] = useState('')


    const submitValue = async() => {
        const frmdetails = {
            'name' : name,
            'email' : email,
            'password' : password,
            'confirmPassword' : confirmPassword
        }

        if(password !== confirmPassword){
            setErroMsg("Password does not match")
        }else{
            const newUser = {
                name,
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
                const res = await axios.post('/api/users',body,config);
                dispatch({
                    type:"login_Success",
                    payload:res.data
                });
            }catch(err){
                dispatch({
                    type:"login_Fail"
                });
            }
        }
        
    }


    const classes = useStyles();

    return(
        <div>
            <Title title="Sign-Up" fontsize="45px" marginTop="0px"/>
            <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6} lg={5}>
                        <Paper elevation={3} className={classes.paper1}>
                            <Title title="Create an Account" fontsize="20px" />
                            <Divider/>

                            <form className={classes.inputFields} noValidate autoComplete="off">
                                <section>Name </section>
                                <TextField 
                                            id="outlined-basic" 
                                            label="Required" 
                                            variant="outlined" 
                                            value={name} 
                                            onChange={e=>setName(e.target.value)}
                                            />
                            </form>
                            
                            <form className={classes.inputFields} noValidate autoComplete="off">
                                <section>Email Address </section>
                                <TextField 
                                            id="outlined-basic" 
                                            label="Required" 
                                            variant="outlined"
                                            value={email} 
                                            onChange={e=>setEmail(e.target.value)}/>
                            </form>
                            
                            <form className={classes.inputFields} noValidate autoComplete="off">
                                <section> Password </section>
                                <TextField 
                                            id="outlined-basic" 
                                            label="Required" 
                                            variant="outlined" 
                                            value={password} 
                                            onChange={e=>setPassword(e.target.value)}
                                            />
                            </form>

                            <form className={classes.inputFields} noValidate autoComplete="off">
                                <section> Confirm Password </section>
                                <TextField 
                                            id="outlined-basic" 
                                            label="Required" 
                                            variant="outlined"
                                            value={confirmPassword}
                                            helperText={error ? error : ' '} 
                                            onChange={e=>setConfirmPassword(e.target.value)}/>
                            </form>
                            <form className={classes.inputFields} >
                            <section >
                                Already have an Account? <Link to="/SignIn" className={classes.anchor} >Sign-In</Link>
                            </section>
                            </form>
                            
                            <Divider/>
                            <Button 
                                    className={classes.button} 
                                    variant="contained" 
                                    color="secondary"
                                    onClick={submitValue}
                                    >Sign-Up</Button>
                        </Paper>
                    </Grid>
                </Grid>
        </div>
    )
}

export default Register