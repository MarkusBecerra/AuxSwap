import React, {useContext, useEffect, useState} from 'react';
import * as $ from "jquery";
import TokenContext from "./TokenContext";
import {
  BrowserRouter as Router,
  NavLink,
} from "react-router-dom";
import './Home.css';
// import logo from '../yessir.jpg';
import './navBar.css';

function NavBar(){
    const token = useContext(TokenContext);
    const [displayname, setDisplayName] = React.useState("");
    const [imageurl,setImageUrl] = React.useState("");

    function getData(){
        $.ajax({
            url: "https://api.spotify.com/v1/me",
            type: "GET",
            beforeSend: xhr =>{
                xhr.setRequestHeader("Authorization", "Bearer " + token.currtoken);
                
            },
            success: data =>{
                if(!data){
                    console.log("getem");
                    return;
                }
                setDisplayName(data.display_name);
                setImageUrl(data.images[0].url);
            },
            error: error => {
                console.log(error);
            }
        });
    }

    useEffect(() => {
        getData();
        console.log(token.currtoken);
  }, [token.currtoken]);

    return(
    <nav className="navClass">
    <div>
       {/* <img src={logo} alt="logo"/>
      <h1> Stick'Me</h1> */}
    </div>
            <ul className="navList">
                <li className ="navListElements">
                    <NavLink to="/chat"> Chat </NavLink>
                </li>
                <li className ="navListElements">
                    <NavLink to="/party"> Party </NavLink>
                </li>

                <li className="navListElements"> {displayname} </li>
                <li><img src={imageurl}/></li>
            </ul>
    </nav>
    );

}

export default NavBar