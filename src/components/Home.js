import React from 'react';
import PlayerPage from '../pages/PlayerPage';
import Party from '../pages/Party';
import Chat from '../pages/Chat';
import Battle from '../pages/Battle';
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
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
        </div>

        <div>
            <ul>
                <li>
                    <NavLink to="/chat"> Chat </NavLink>
                </li>
                <li>
                    <NavLink to="/battle"> Battle </NavLink>
                </li>
                <li>
                    <NavLink to="/party"> Party </NavLink>
                </li>
                <li>
                    <NavLink to="/player"> Player</NavLink>
                </li>
            </ul>

            <hr/>
{/* 
            <Switch>
                <Route exact path="/chat">
                    <Chat/>
                </Route>
                <Route exact path="/battle">
                    <Battle/>
                </Route>
                <Route exact path="/party">
                    <Party/>
                </Route>
                <Route exact path="/player">
                    <PlayerPage/>
                </Route>
            </Switch> */}
        </div>
    </div>
);
}
 export default Home
