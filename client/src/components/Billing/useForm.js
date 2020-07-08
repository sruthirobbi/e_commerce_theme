import React from 'react';
import {
  CardNumberElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';


function useForm(callback,Validation,FieldValidation){
    const [hidden, setHidden] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const [cardError,setCarderror] = React.useState('');
    const [payment,setPayment] = React.useState('');

    const [initialstate,setInitialstate] = React.useState({
        fullname:'',
        email:'',
        phone:'',
        address:'',
        city:'',
        place:'',
        zipcode:''
      })

      const[errors,setErrors] = React.useState({
        fullname:'',
        email:'',
        phone:'',
        address:'',
        city:'',
        place:'',
        zipcode:''
      })

     

      const handleonChange=(e)=>{
        const {name,value} = e.target
            setInitialstate(
                {...initialstate,
                    [name]:value
                })
        setErrors(FieldValidation(initialstate,name))
      }

      const handleCardSubmit =  (event) => {
        event.preventDefault();
        stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardNumberElement),
        }).then(({paymentMethod,error}) => {
          
         if(paymentMethod){
            setPayment(paymentMethod)
            setOpen(true);
          }
          setCarderror(error)
        });;
      };
      
      const handleSubmit = (e)=>{
        e.preventDefault();
        setErrors(Validation(initialstate))
        //To show the Credit Card Form
        let errorCheck = Validation(initialstate);
        if(Object.keys(errorCheck).length === 0){
          setHidden(false)
        }
        callback()
      };

      const handleClose = () => {
        setOpen(false);
      };


      return{
          handleonChange,
          handleSubmit,
          handleCardSubmit,
          handleClose,
          initialstate,
          errors,
          hidden,
          open,
          cardError,
          payment
      }

}

export default useForm;