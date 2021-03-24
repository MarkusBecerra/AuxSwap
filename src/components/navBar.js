import React, {useContext, useEffect, useState} from 'react';
import TokenContext from "./TokenContext";
import Party from '../pages/Party';
import Chat from '../pages/Chat';
import {
  BrowserRouter as Router,
  NavLink,
  Route
} from "react-router-dom";
import './Home.css';
// import logo from '../yessir.jpg';
import './navBar.css';

function NavBar(props){
    const [displayname, setDisplayName] = React.useState("");
    const [imageurl,setImageUrl] = React.useState("");

    useEffect(() => {
        setDisplayName(props.displayname);
        setImageUrl(props.imageurl);
  }, [props.imageurl,props.displayname]);

    return(
    <nav className="navClass">
    <div>
    </div>
            <ul className="navList">
                <li className ="navListElements">
                    <NavLink to="/chat"> Chat </NavLink>
                </li>
                <li className ="navListElements">
                    <NavLink to="/party"> Party </NavLink>
                </li>
                <div className="userNav">
                    <li><img className="navImage" src={imageurl}/></li>
                    <li className="displayName"> {displayname} </li>
                   
                </div>
            </ul>
    </nav>
    );

}

export default NavBar