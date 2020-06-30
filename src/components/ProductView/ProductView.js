import React,{useContext}  from 'react';
import {Grid,Button,Modal} from '@material-ui/core';
import Title from '../../common/Title/Title';
import TeaSvg from '../../common/TeaSvg/TeaSvg';
import './ProductView.scss';
import {CounterContext} from '../Context/Context';
import {
    SideBySideMagnifier,
  } from "react-image-magnifiers";




function ProductView(props){
    const { dispatch } = useContext(CounterContext);
 
    return(
        <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                <Grid   className="productPaper" >
                    <Grid item xs={12} sm={12} md={6} lg={6} >
                        <div className="container">
                        <SideBySideMagnifier
                        imageSrc={process.env.PUBLIC_URL + `/image/${props.data.img}`}
                        imageAlt="Example"
                        className="productImage"
                        alwaysInPlace="false"
                        />
                        <div className="overlay"> Hover on Image</div>
                        </div>
                    
                        
                       {/* <img  src={process.env.PUBLIC_URL + `/image/${props.data.img}`} alt="types of Tea" className="productImage"/> */}
                        
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} className="productDetails">
                        <div className="product-title">
                            <Title title={props.data.name} fontsize="30px" marginTop="0"/> 
                            <TeaSvg/>
                        </div>
                        <div className="productText">
                            <p>Price: $ {props.data.price}</p>
                            <p>Weight: {props.data.quantity*16} oz</p>
                            <p>{props.data.desc}</p>
                            
                        
                        <Button color="secondary" variant="contained" className="productButton"
                        onClick={() => dispatch({ type: "onclick_cart",product:props.data,id:props.data.id })}
                        >Add to Cart</Button> 
                        <Button color="secondary" className="productButton" variant="contained" onClick={props.handleClose}>Continue Shopping</Button>
                        </div>
                    </Grid>
                </Grid>
        </Modal>
    )
}

export default ProductView;
