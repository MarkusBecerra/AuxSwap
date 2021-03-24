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
import logo from '../images/logo_1_transparent.png'
import NavBar from './navBar';


function Home(){

return(
    <div>
            {/* <header className="App-header">
            </header> */}
            <header className="head1">Welcome to AuxSwap!</header>
            <img src={logo} className="logoHome" />
            <div class="row">
                <a href="http://localhost:3000/chat">
                <div class="column">
                    <h2 className="head2">Chat</h2>
                    <ul>
                    <li className="bullets">Chat with friends</li>
                        <li className="bullets">Search and share songs</li> 
                        <li className="bullets">Play songs directly in the chat</li> 
                    </ul>
                </div>
                </a>
                <a href="http://localhost:3000/party">
                <div class="column2">
                    <h2 className="head2">Party Lobbies</h2>
                    <ul>
                    <li className="bullets">Join lobbies to listen together</li>
                        <li className="bullets">Add songs to the queue</li>
                        <li className="bullets">Hear new music and share with your friends</li>
                       
                    </ul>
                </div>
                </a>
            </div>

            {/* <ul>
                <li>
                    <NavLink to="/chat"> Chat </NavLink>
                </li>
                <li>
                    <NavLink to="/party"> Party </NavLink>
                </li>
                <li>
                    <NavLink to="/player"> Player</NavLink>
                </li>
            </ul> */}

    
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
