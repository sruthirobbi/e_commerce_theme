
import React,{useReducer} from 'react';

let reducer = (state, action) => {
    const {type,payload} = action;
    console.log("state from authContext",state)
      switch (type) {
        case "login_Success":
            
          localStorage.setItem('token',payload.token);
          return{
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
          }
        case "login_Fail":
              localStorage.removeItem('token');
              return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading: false
                }
        case "user_Loaded":
                return{
                    ...state,
                    isAuthenticated:true,
                    loading:false,
                    user:payload
                }
        case "auth_Error":
            localStorage.removeItem('token');
              return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading: false
                }
        default:
          return state;
      }
    };

const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
}

const AuthContext = React.createContext(null);

function AuthProvider(props){

    const [state, dispatch] = useReducer(reducer, initialState);
    console.log("state from authContext",state)
    return(
        <AuthContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };