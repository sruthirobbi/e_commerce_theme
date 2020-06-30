import React,{useRef} from 'react';
import TeaSvg from '../../common/TeaSvg/TeaSvg';
import Title from '../../common/Title/Title';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import './AddItem.scss';
import backrgoundImage from '../../image/default.jpg'


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
        gridTemplateRows: '75px 0px 372px 0px 70px',
    },
    inputFields:{
        '& > *': {
            margin: '6px 24px',
             width: '400px',
          },
    },
    inputFieldsSide:{
        '& > *': {
            margin: '6px 24px',
             width: '177px',
          },
    },
    button:{
        width: '50%',
        margin: '17px 0px',
        marginLeft: '25%'
    },
  }));

function AddItem(){
    const classes = useStyles();
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
        const reader = new FileReader();
        const {current} = uploadedImage;
        current.file = file;
        reader.onload = (e) => {
            current.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
      console.log("e",e.target.value)
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
                            <form className={classes.inputFields} noValidate autoComplete="off">
                                <section>Name </section>
                                <TextField id="outlined-basic" label="Name Required" variant="outlined" />
                            </form>
                            <div className="displayField">
                            <form className={classes.inputFieldsSide} noValidate autoComplete="off">
                                <section>Price ($)</section>
                                <TextField id="outlined-basic" label="Price Required" variant="outlined" />
                            </form>
                            <form className={classes.inputFieldsSide} noValidate autoComplete="off">
                                <section>Weight (OZ)</section>
                                <TextField id="outlined-basic" label="Weight Required" variant="outlined" />
                            </form>
                            </div>
                            <form className={classes.inputFields} noValidate autoComplete="off">
                                <section>Description </section>
                                <TextField
                                    id="outlined-textarea"
                                    label="Description Required"
                                    placeholder="Placeholder"
                                    multiline
                                    variant="outlined"
                                    rows={4}
                                    />
                                </form>
                            </div>
                            <Divider/>
                            <Button className={classes.button} variant="contained" color="secondary" onClick={handleSubmit}> Save</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <Paper elevation={3} className={classes.paper1}>
                                <Title title="Image Upload" fontsize="20px" />
                            <Divider/>
                            <form className={classes.inputFields} noValidate autoComplete="off">
                                <input className="fileInput" 
                                        onChange={handleImageUpload} 
                                        style={{display: "none" }} 
                                        ref={imageUploader} type="file" multiple = "false"/>
                            </form>
                            <form className="imageForm" noValidate autoComplete="off">
                                <div className="imageUploadContainer">
                                    <img className="imageUpload" ref={uploadedImage} src={backrgoundImage}/>
                                </div>
                            </form>
                           
                            <Divider/>
                            <Button className={classes.button}  onClick={() => imageUploader.current.click()} variant="contained" color="secondary" >Upload</Button>
                        </Paper>
                    </Grid>
                </Grid>
                </div>
        </div>
    )
}

export default AddItem;