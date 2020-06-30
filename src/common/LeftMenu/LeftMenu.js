import React from 'react';
import './LeftMenu.scss';
import CircleButton from '../CircleButton/CircleButton';
import { Link } from 'react-router-dom';

function LeftMenu(){
    return(
        <div className="leftMenu">
            <ul className="menuList">
                <Link to="/"><CircleButton iconName="home"/></Link>
                <Link to="/tea"><CircleButton iconName="coffee"/></Link>
                <Link to="/user"><CircleButton iconName="user"/></Link>
                <Link to="/comment"><CircleButton iconName="comment"/></Link>
            </ul>   
        </div>
    )
}

export default LeftMenu
