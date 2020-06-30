import React,{useContext} from 'react';
import './LineItems.scss';
import Avatar from '@material-ui/core/Avatar';
import {CounterContext} from '../../components/Context/Context';


function LineItems(props){
    const { dispatch } = useContext(CounterContext);
    
    return(
        <div className="LineItems">
            <Avatar src={require(`../../image/${props.img}`)} alt={props.itemName}/>
            
            <span>{props.itemName}</span>
            <Avatar className="operButton" onClick={() => dispatch({ type: "onclick_minus",product:props.itemName,id:props.id })}>
                <i className="fa fa-minus fa-xs" aria-hidden="true"></i>
            </Avatar>
            <span>{props.quantity}</span>
            
            <Avatar className="operButton" onClick={() => dispatch({ type: "onclick_plus",product:props.itemName,id:props.id })}>
                <i className="fa fa-plus fa-xs" aria-hidden="true"></i>
            </Avatar>
            <span> ${props.price}</span>
        </div>
    )
}

export default LineItems;