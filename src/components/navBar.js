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

function NavBar(){
    return(
    <nav>
    <div>
       <img src={logo} alt="logo"/>
      <h1> Stick'Me</h1>
    </div>
            <ul>
                <li>
                    <NavLink to="/chat"> Chat </NavLink>
                </li>
                <li>
                    <NavLink to="/party"> Party </NavLink>
                </li>
                <li>
                    <NavLink to="/player"> Player</NavLink>
                </li>
            </ul>
    </nav>
    );

}

export default NavBar