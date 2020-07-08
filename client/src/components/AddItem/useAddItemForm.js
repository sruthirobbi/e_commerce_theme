import React from 'react';
import axios from 'axios';


function useAddItemForm(callback,AddItemValidation,validations){


    const [initialstate,setInitialstate] = React.useState({
        name:'',
        price:'',
        quantity:'',
        desc:'',
        img:''
      })

      const[errors,setErrors] = React.useState({
        name:'',
        price:'',
        quantity:'',
        desc:'',
        img:''
      })

     

      const handleonChange=(e)=>{
        const {name,value} = e.target
        console.log("initialstate",name)
            setInitialstate(
                {...initialstate,
                    [name]:value
                })
        setErrors(AddItemValidation(initialstate,name))
      }

      
      
      const handleSubmit = (e)=>{
        e.preventDefault();
        setErrors(validations(initialstate))
        axios.post("http://localhost:5000/product/add",initialstate)
        .then(res=>console.log(res.data))
        .catch((err)=>{
            console.log(err)
        })
        callback()
      };

      return{
          handleonChange,
          handleSubmit,
          initialstate,
          errors,

      }

}

export default useAddItemForm;