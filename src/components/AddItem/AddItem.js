import React,{useRef,useState} from 'react';
import TeaSvg from '../../common/TeaSvg/TeaSvg';
import Title from '../../common/Title/Title';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import './AddItem.scss';
import useAddItemForm from './useAddItemForm';
import AddItemValidation from './AddItemValidation';
import validations from './validations';
import ImageUploader from "react-images-upload";
import Resizer from 'react-image-file-resizer';


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
        gridTemplateRows: '75px 0px 0px 280px 7px',
    },
    paper2:{
        display:'grid',
        gridTemplateRows: '75px 0px 330px 0px 70px',
    },
    inputFields:{
        '& > *': {
            margin: '22px 24px',
             width: '400px',
          },
    },
    inputFieldsSide:{
        '& > *': {
            margin: '6px 23px',
             width: '177px',
          },
    },
    button:{
        width: '50%',
        margin: '17px 0px',
        marginLeft: '25%'
    }
  }));

function AddItem(){
    const classes = useStyles();
    const [pictures, setPictures] = useState([]);

        //custome hook
        const { handleSubmit,
            handleonChange,
            initialstate,
            errors,
            }=useAddItemForm(submit,AddItemValidation,validations)
  
  function submit(){
    console.log("Submited")
  }




    return(
        <div>
            <div className="Additem-title">
                <Title title="Add Item" fontsize="30px"/>
                <TeaSvg/>
            </div>
            <div className={classes.root}>
            <Grid container spacing={3}>
                
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Paper elevation={3} className={classes.paper2}>
                            <Title title="Product Details" fontsize="20px"/>
                            <Divider/>
                            <div className={classes.container}>
                            <form  onSubmit={handleSubmit} noValidate autoComplete="off">
                                <TextField 
                                            className={classes.inputFields} 
                                            id="outlined-basic" 
                                            label="Name"
                                            name="name" 
                                            variant="outlined" 
                                            value={initialstate.name}
                                            onChange={handleonChange}
                                            helperText={!errors.name ? '':errors.name}
                                            error={errors.name === ' ' || !(errors.name)? false:true}
                                            />
                                <div className="displayField">
                                    <TextField  id="outlined-basic" 
                                                label="Price in USD" 
                                                variant="outlined" 
                                                className={classes.inputFieldsSide}
                                                name="price"
                                                value={initialstate.price}
                                                onChange={handleonChange}
                                                helperText={!errors.price ? '':errors.price}
                                                error={errors.price === ' ' || !(errors.price)? false:true}
                                                />
                                    <TextField  id="outlined-basic" 
                                                label="Weight in oz" 
                                                variant="outlined" 
                                                className={classes.inputFieldsSide}
                                                name="quantity"
                                                value={initialstate.quantity}
                                                onChange={handleonChange}
                                                helperText={!errors.quantity ? '':errors.quantity}
                                                error={errors.quantity === ' ' || !(errors.quantity)? false:true}
                                                />
                                </div>
                            
                                <TextField
                                    id="outlined-textarea"
                                    label="Description"
                                    placeholder="Placeholder"
                                    multiline
                                    variant="outlined"
                                    rows={4}
                                    name="desc"
                                    className={classes.inputFields}
                                    value={initialstate.desc}
                                    onChange={handleonChange}
                                    helperText={!errors.desc ? '':errors.desc}
                                    error={errors.desc === ' ' || !(errors.desc)? false:true}
                                    /> 
                                   
                                   <input type="file" 
                                            name="img"
                                            value={initialstate.img} 
                                            onChange={handleonChange}                                 
                                   />
                            </form>
                            </div>
                            <Divider/>
                            <Button className={classes.button} 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={handleSubmit}> Save</Button>
                        </Paper>
                    </Grid>
                  
                </Grid>
                </div>
        </div>
    )
}

export default AddItem;