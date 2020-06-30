import React from 'react';
import './CircleButton.scss';
// import '@fortawesome/fontawesome-free/css/all.min.css';


function CircleButton(props){
    return(
        
        <div className="circleButton" color="primary">
            <i className={`fa fa-${props.iconName}`}></i>
        </div>
        
    )
}

export default CircleButton;