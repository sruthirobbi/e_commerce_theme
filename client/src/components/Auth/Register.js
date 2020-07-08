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
        gridTemplateRows: '75px 0px 366px 0px 76px 0px',
    },
    container:{
        textAlign:'center'
    },
    inputFields:{
        '& > *': {
            margin: '3px 0px 6px',
          },
          margin:'12px 24px'
    },
    inputFieldsText:{
        '& > *': {
            margin: '3px 0px 6px',
          },
          margin:'12px 24px',
    },
    errorMsg:{
        color:'red',
        fontSize:'12px'
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

    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { dispatch } = useContext(AuthContext);
    const [error,setErroMsg] = useState([])


    const handleSubmit = async() => {
        const frmdetails = {
            'username' : username,
            'password' : password,
            'confirmPassword' : confirmPassword
        }


        if(password !== confirmPassword){
            setErroMsg("Password does not match")
        }else{
            const newUser = {
                username,
                password
            }

            try{
                const config = {
                    headers : {
                        'content-Type':'application/json'
                    }
                }
                const body = JSON.stringify(newUser);
                const res = await axios.post('http://localhost:5000/users/register',body,config);
                dispatch({
                    type:"Register_Success",
                    payload:res.data
                });
            }catch(err){
                // setErroMsg(err.response.data)
                dispatch({
                    type:"auth_Error"
                });
            }
        }
        
    }


    const classes = useStyles();

    return(
        <div>
            <Title title="Sign-Up" fontsize="45px" marginTop="0px"/>
            <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Paper elevation={3} className={classes.paper1}>
                            <Title title="Create an Account" fontsize="20px" />
                            <Divider/>

                            <form className={classes.inputFields} onSubmit={handleSubmit} noValidate autoComplete="off">
                                <section>Name </section>
                                <TextField 
                                            id="outlined-basic" 
                                            label="Required" 
                                            name="username"
                                            variant="outlined"
                                            className={classes.inputFields} 
                                            value={username} 
                                            fullWidth
                                            onChange={e=>setName(e.target.value)}
                                            />
                            
                                <section> Password </section>
                                <TextField 
                                            id="outlined-basic" 
                                            label="Required" 
                                            name="password"
                                            fullWidth
                                            className={classes.inputFields}
                                            variant="outlined" 
                                            value={password} 
                                            onChange={e=>setPassword(e.target.value)}
                                            />
                            
                                <section> Confirm Password </section>
                                <TextField 
                                            id="outlined-basic" 
                                            label="Required" 
                                            variant="outlined"
                                            fullWidth
                                            name="confirmPassword"
                                            className={classes.inputFields}
                                            value={confirmPassword} 
                                            onChange={e=>setConfirmPassword(e.target.value)}/>
                                <span className={classes.errorMsg}>{error ? error : ' '}</span>
                            <section >
                                Already have an Account? <Link to="/SignIn" className={classes.anchor} >Sign-In</Link>
                            </section>
                            </form>
                            
                            <Divider/>
                            <Button 
                                    className={classes.button} 
                                    variant="contained" 
                                    color="secondary"
                                    onClick={handleSubmit}
                                    >Sign-Up</Button>
                        </Paper>
                    </Grid>
                </Grid>
        </div>
    )
}

export default Register