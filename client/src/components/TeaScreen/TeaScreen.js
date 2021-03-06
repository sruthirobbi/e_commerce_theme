import React,{useContext,useEffect,useState} from 'react';
import {Grid,Button,Paper} from '@material-ui/core';
import './TeaScreen.scss'
import {CounterContext} from '../Context/Context';
import axios from 'axios';
import ProductView from '../ProductView/ProductView';
import defaultImage from '../../image/default.jpg'

function TeaScreen() {
  const { dispatch } = useContext(CounterContext);
  const [productData, setProductData] = useState([]);
  const [current,setCurrent] = useState('');
  const [open, setOpen] = React.useState(false);
 


  const handleOpen = (e) => {
    setCurrent(e)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(()=>{
    async function fetchData(){
      await axios.get('http://localhost:5000/product/')
      .then(res=>{
        setProductData(res.data)
      })
    }
    fetchData()

  },[]);


  return (
      <Grid container className="TeaScreen" spacing={2} justify="center">
          {productData.map((list,index)=>
            <Grid item className="item" key={list._id} index={index}  xs={12} sm={3} md={3} >
            <Paper elevation={3} >
            <div className="container">
              <img alt={list.name} src={require(`../../image/${list.img}`)} className="image"  />
              <div className="overlay">
                <Button variant="contained" className="text" onClick={()=>handleOpen(list)}>Quick View</Button>
              </div>
            </div>

            <div className="productPrice" >${list.price}</div>
            <div className="productName">{list.name}</div>
            <div>
              <Button 
                      variant="contained" 
                      color="secondary"
                      className="productButton"
                      onClick={() => dispatch({ type: "onclick_cart",product:list,id:list.id })}
                      >Add To Cart</Button>
            </div>
            
            </Paper>
        </Grid>
          )}
          <ProductView handleClose={handleClose} open={open} data={current}/>
      </Grid>
  );
}

export default TeaScreen