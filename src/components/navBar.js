import React from 'react';
import PlayerPage from '../pages/PlayerPage';
import Party from '../pages/Party';
import Chat from '../pages/Chat';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import './Home.css';
import logo from '../yessir.jpg';
import './navBar.css';

function NavBar(){
    return(
    <nav class="navClass">
    <div>
       {/* <img src={logo} alt="logo"/>
      <h1> Stick'Me</h1> */}
    </div>
            <ul class="navList">
                <li class ="navListElements">
                    <NavLink to="/chat"> Chat </NavLink>
                </li>
                <li class ="navListElements">
                    <NavLink to="/party"> Party </NavLink>
                </li>
                <li class ="navListElements">
                    <NavLink to="/player"> Player</NavLink>
                </li>
            </ul>
    </nav>
    );

}

export default NavBar