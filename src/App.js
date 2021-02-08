import React, { useEffect } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import TokenContext from "./components/TokenContext";
import Login from './components/Login';
import Home from './components/Home';
import Callback from './components/Callback';
import PlayerPage from './pages/PlayerPage';
import Party from './pages/Party';
import Chat from './pages/Chat';



function App() {
  const[currtoken, setCurrToken] = React.useState(null);

    useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      setCurrToken(token);
    };
  }, []);

  const updateToken = (token) => {
    window.sessionStorage.setItem('token', token);
    setCurrToken(token);
  };

  //TODO: Move the last four routes into home.js without it breaking.... Why do they all need to be in one place?
    return (
    <TokenContext.Provider value={{currtoken}}>
        <Router>
          <Switch>
            <Route exact path="/">
              {currtoken ? <Redirect to="/home"/> : <Login/>}
            </Route>
            <Route exact path="/home">
              {currtoken ? <Home/> : <Redirect to="/"/> }
            </Route>
            <Route path="/callback">
              {currtoken ? <Redirect to="/home"/> : <Callback updateToken={updateToken}/> }
            </Route>
            <Route exact path="/chat">
              <Chat/>
            </Route>
            <Route exact path="/party">
              <Party/>
            </Route>
            <Route exact path="/player">
              <PlayerPage/>
            </Route>
          </Switch>
        </Router>
    </TokenContext.Provider>
    );
}

export default App;
