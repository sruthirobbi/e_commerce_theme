import React,{Fragment} from 'react';
import Title from '../../common/Title/Title';
import { Modal,Grid,Paper,TextField,MenuItem,Button } from '@material-ui/core';
import TeaSvg from '../../common/TeaSvg/TeaSvg';
import './Billing.scss';
import useForm from './useForm';
import validation from './Validation';
import FieldValidation from './FieldValidation';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';


const states = [
    {value: 'AZ',label: 'AZ'},
    {value: 'CA',label: 'CA'},
    {value: 'CO',label: 'CO'},
    {value: 'CT',label: 'CT'},
    {value: 'DC',label: 'DC'},
    {value: 'DE',label: 'DE'},
    {value: 'MD',label: 'MD'},
    {value: 'NJ',label: 'NJ'},
    {value: 'NY',label: 'NY'},
    {value: 'NC',label: 'NC'},
    {value: 'PA',label: 'PA'}
  ];


function Billing(){
   
    //custome hook
    const { handleSubmit,
            handleonChange,
            handleCardSubmit,
            initialstate,
            errors,
            hidden,
            open,
            cardError,
            handleClose,
          }=useForm(submit,validation,FieldValidation)
    

      
      function submit(){
        console.log("Submited")
      }

  const body = (
    <div  className="Billing-Paper">
      <h2 id="simple-modal-title">Thank You For Shopping With Tea Pot <TeaSvg/></h2>
      <p id="simple-modal-description">
      Your Order was places Successfully. 
      We will notify you when your order is ready for shipping.
      </p>
      <Link to={'/tea'} className="Billing-Link">
        <Button color="secondary" variant="contained">Continue Shopping</Button>
      </Link>
     
    </div>
  );

    return(
        <Fragment>
            <Grid container  spacing={2} className="Billing-Container">
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className="Billing-title">
                        <Title title="Billing" fontsize="30px"/>
                        <TeaSvg/>
                    </div>
                    <Paper elevation={3}>
                    <form  onSubmit={handleSubmit} noValidate autoComplete="off" className="Billing-billing">
                        <TextField 
                                  id="outlined-basic" 
                                  label="Full Name" 
                                  type="text"
                                  name="fullname"
                                  variant="outlined" 
                                  fullWidth 
                                  value={initialstate.fullname}
                                  margin="normal"
                                  onChange={handleonChange}
                                  helperText={!errors.fullname ? '':errors.fullname}
                                  error={errors.fullname === ' ' || !(errors.fullname)? false:true}
                                  />
                        <TextField 
                                  id="outlined-basic" 
                                  label="Email" 
                                  type="email" 
                                  variant="outlined" 
                                  fullWidth 
                                  margin="normal"
                                  name="email"
                                  value={initialstate.email}
                                  onChange={handleonChange}
                                  helperText={errors.email}
                                  error={errors.email === ' ' || !(errors.email)? false:true}
                                  />
                        <TextField  id="outlined-basic" 
                                    label="Mobile Number" 
                                    type="number" 
                                    variant="outlined" 
                                    fullWidth 
                                    margin="normal"
                                    name="phone"
                                    value={initialstate.phone}
                                    onChange={handleonChange}
                                    helperText={errors.phone}
                                    error={errors.phone === ' '|| !(errors.phone) ? false:true}
                                    />
                        <TextField  id="outlined-basic" 
                                    label="Address" 
                                    type="text" 
                                    variant="outlined" 
                                    fullWidth 
                                    margin="normal"
                                    name="address"
                                    value={initialstate.address}
                                    onChange={handleonChange}
                                    helperText={errors.address}
                                    error={errors.address === ' '|| !(errors.address) ? false:true}
                                    />
                        <TextField  id="outlined-basic" 
                                    label="City" 
                                    type="text" 
                                    variant="outlined"  
                                    margin="normal"
                                    name="city"
                                    value={initialstate.city}
                                    onChange={handleonChange}
                                    helperText={errors.city}
                                    error={errors.city === ' '|| !(errors.city) ? false:true}
                                    />
                        <TextField
                                    id="outlined-basic"
                                    select
                                    label="State"
                                    value={initialstate.place}
                                    onChange={handleonChange}
                                    variant="outlined"
                                    margin="normal"
                                    className="Billing-state"
                                    name="place"
                                    helperText={errors.place}
                                    error={errors.place === ' '|| !(errors.place) ? false:true}
                                  >
                                  {states.map((option) => (
                                      <MenuItem key={option.value} value={option.value}>
                                      {option.label}
                                      </MenuItem>
                                  ))}
                        </TextField>
                        <TextField  id="outlined-basic" 
                                    label="Zip Code" 
                                    type="number" 
                                    variant="outlined"  
                                    margin="normal"
                                    value={initialstate.zipcode}
                                    onChange={handleonChange}
                                    name="zipcode"
                                    helperText={errors.zipcode}
                                    error={errors.zipcode === ' '|| !(errors.zipcode) ? false:true}
                                    />
                        <Button 
                              variant="contained" 
                              color="secondary" 
                              size="large" 
                              fullWidth 
                              onClick={handleSubmit}
                              > Save Address</Button>
                    </form>
                    </Paper>
                </Grid>
               <Grid item xs={12} sm={12} md={6} lg={6} hidden={hidden}> {/*  hidden={hidden} */}
                    <div className="Billing-title">
                        <Title title="Credit Card Details" fontsize="30px"/>
                        <TeaSvg/>
                    </div>
                    <Paper elevation={3}>
                        <form  noValidate autoComplete="off" className="Billing-billing">
                        
                              <div className="Billing-CardDemo">
                                <CardNumberElement  className="cardNumber"/>
                                <CardExpiryElement className="cardNumber"/>
                                <CardCvcElement className="cardNumber"/>
                                
                              </div>
                              <div className="Billing-error">{cardError?cardError.message:''}</div>
                            <Button onClick={handleCardSubmit}  variant="contained" color="secondary" size="large" fullWidth> Place Order</Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Thank You For Shopping With Tea Pot"
                aria-describedby="Your Order was places Successfully. We will notify you when your order is ready for shipping."
            >
              {body}
            </Modal>
        </Fragment>
    )
}

export default Billing;