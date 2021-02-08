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
import logo from '../logo.svg';


function Home(){

return(
    <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
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

            <hr/>
{/*  Why doesn't this work?
            <Switch>
                <Route exact path="/chat">
                    <Chat/>
                </Route>
                <Route exact path="/party">
                    <Party/>
                </Route>
                <Route exact path="/player">
                    <PlayerPage/>
                </Route>
            </Switch> */}
    </div>
);
}
 export default Home
