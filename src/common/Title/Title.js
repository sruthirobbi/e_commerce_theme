import React from 'react';
import './Title.scss'

function Title(props){
    return(
        <div className="subTitles" style={{ fontSize:props.fontsize,marginTop:props.marginTop }}>
            {props.title}
        </div>
    )
}

export default Title;