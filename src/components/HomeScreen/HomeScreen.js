import React from 'react';
import './HomeScreen.scss';
import backrgoundImage from '../../image/img8.jpg'

function HomeScreen(){
    return(
            <div styles={{ backgroundImage:`url(${backrgoundImage})` }}>
                <div className="quote">Boost your Immuni<span color="primary">TEA</span></div>
                <img src={backrgoundImage} alt="background Tea" className="mainScreen"/>
            </div>
    )
}

export default HomeScreen