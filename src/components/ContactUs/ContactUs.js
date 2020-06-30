import React,{Fragment} from 'react';
import { Map, GoogleApiWrapper,Marker } from 'google-maps-react';
import {Grid,Paper,List,ListItem,ListItemText} from '@material-ui/core';
import Title from '../../common/Title/Title';
import TeaSvg from '../../common/TeaSvg/TeaSvg';
import './ContactUs.scss';


const hoursData = [
    {
        id:1,
        data: "Monday: 9:00 am - 6:00 pm"
    },
    {
        id:2,
        data: "Tuesday: 9:00 am - 6:00 pm"
    },
    {
        id:3,
        data: "Wednesday: 9:00 am - 6:00 pm"
    },
    {
        id:4,
        data: "Thursday: 9:00 am - 6:00 pm"
    },
    {
        id:5,
        data: "Friday: 9:00 am - 6:00 pm"
    },
    {
        id:6,
        data: "Saturday: 9:00 am - 4:00 pm"
    },
    {
        id:7,
        data: "Sunday: Closed"
    },

]

function ContactUs(props){
    return(
        <Fragment>
            <div className="ContactUs-title">
                <Title title="Contact Us" fontsize="30px"/>
                <TeaSvg/>
            </div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                    <Title title="Hours Of Operation" fontsize="20px"/>
                    <Paper elevation={3}>
                    <List component="nav" aria-label="secondary mailbox folders">
                        {hoursData.map((text,index)=>(
                            <ListItem button key={index}>
                                <ListItemText primary={text.data} />
                            </ListItem>
                        ))
                        }
                        
                    </List>
                    </Paper>
                </Grid>
            
                <Grid item xs={12} sm={12} md={6} lg={6} className="ContactUs-maps">
                    <Title title="Store Location" fontsize="20px"/>
                    <Map
                    google={props.google}
                    zoom={8}
                    initialCenter={{ lat:  39.267326, lng: -76.798309}}
                    >
                        <Marker position={{ lat:  39.267326, lng: -76.798309}} />
                    </Map>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_MAP_API_KEY
  })(ContactUs);