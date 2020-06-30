import React from 'react';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';


export const loadUser = ()=>async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try{
        const res = await axios.get('/api/auth');

        dispatch({
            type:"user_Loaded",
            payload:res.data
        });
    }catch(err){
        dispatch({
            type:'auth_Error'
        })
    }
}