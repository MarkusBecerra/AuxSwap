import React, { useEffect } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import TokenContext from "./components/TokenContext";
import RefreshTokenContext from "./components/RefreshTokenContext";
import Login from './components/Login';
import Home from './components/Home';
import Callback from './components/Callback';
import Party from './pages/Party';
import Chat from './pages/Chat';



function App() {
  const[currtoken, setCurrToken] = React.useState(null);
  const[refreshcurrtoken, setRefreshCurrToken] = React.useState(null);

    useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    const refresh = window.sessionStorage.getItem('refresh');
    if (token) {
      setCurrToken(token);
    };
    if(refresh){
      setRefreshCurrToken(refresh);
    };
  }, []);

  const updateToken = (token,refresh) => {
    window.sessionStorage.setItem('token', token);
    window.sessionStorage.setItem('refresh', refresh);
    setCurrToken(token);
    setRefreshCurrToken(refresh);
  };
  const JustToken = (token) => {
    window.sessionStorage.setItem('token', token);
    setCurrToken(token);
  };

  //TODO: Move the last four routes into home.js without it breaking.... Why do they all need to be in one place?
    return (
    <TokenContext.Provider value={{currtoken}}>
      <RefreshTokenContext.Provider value={{refreshcurrtoken}}>
        <Router>
          <Switch>
            <Route exact path="/">
              {currtoken ? <Redirect to="/home"/> : <Login/>}
            </Route>
            <Route exact path="/home">
              {currtoken ? <Home/> : <Redirect to="/"/> }
            </Route>
            <Route path="/callback">
              {currtoken ? <Redirect to="/home"/> : <Callback updateToken={updateToken} JustToken={JustToken}/> }
            </Route>
            <Route exact path="/chat">
              <Chat/>
            </Route>
            <Route exact path="/party">
              <Party/>
            </Route>
          </Switch>
        </Router>
        </RefreshTokenContext.Provider>
    </TokenContext.Provider>
    );
}

export default App;
