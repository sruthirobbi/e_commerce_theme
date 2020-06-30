import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

 function Product(props) {
    console.log(props)
    const classes = useStyles();

    return (
        <Card className={classes.root}>
        <CardHeader
            title={props.name}
        />
        <CardMedia
            className={classes.media}
            image="/src/image/img6.jpg"
            title="Lemon Tea"
        />
        <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
            <Typography>Price: $20.00</Typography>
        </CardContent>
        <CardActions >
            <Button variant="contained" >Add To Cart</Button>
        </CardActions>
        
        </Card>
    );
}

export default Product