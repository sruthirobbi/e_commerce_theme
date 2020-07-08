

import axios from 'axios';
import usersModel from '../../../../models/users.model';


export const loadUser = ()=>(dispatch,getState) => {
    
    dispatch({type: "user_Loaded"})
    
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-type":"application/json"
        }
    }

    if(token){
        config.headers['x-auth-token'] = token
    }

    axios.get('/user',config)
    .then(res=>dispatch({
        type:"user_loaded",
        payload:res.data
    }))
    .catch(err=>{
        dispatch({
            type:"auth_Error"
        })
    })
}