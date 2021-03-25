import React, { useEffect } from "react";
import './App.css';
import * as $ from "jquery";
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
import NavBar from "./components/navBar";



function App() {
  const[currtoken, setCurrToken] = React.useState(null);
  const[refreshcurrtoken, setRefreshCurrToken] = React.useState(null);
  const [displayname, setDisplayName] = React.useState("");
  const [imageurl,setImageUrl] = React.useState("");

    useEffect(() => {

      const fetchData = async (token) => {
       await $.ajax({
          url: "https://api.spotify.com/v1/me",
          type: "GET",
          beforeSend: xhr =>{
              xhr.setRequestHeader("Authorization", "Bearer " + token);
              
          },
          success: data =>{
              console.log("IN GET DATA",token);
              if(!data){
                  console.log("getem");
              }
              setDisplayName(data.display_name);
              setImageUrl(data.images[0].url);
          },
          error: error => {
              console.log("IN GET DATA ERROR",token);
              console.log(error);
              
          }
      });
      };
    const token = window.sessionStorage.getItem('token');
    const refresh = window.sessionStorage.getItem('refresh');
    if (token) {
      setCurrToken(token);
      const promise = fetchData(token);
      if(refresh){
        setRefreshCurrToken(refresh);
      };
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
              {currtoken ? <div> <NavBar displayname={displayname} imageurl = {imageurl} /><Home/> </div>: <Redirect to="/"/> }
            </Route>
            <Route path="/callback">
              {currtoken ? <Redirect to="/home"/> : <Callback updateToken={updateToken} JustToken={JustToken}/> }
            </Route>
            <Route exact path="/chat">
            <NavBar displayname={displayname} imageurl = {imageurl} /> <Chat/>
            </Route>
            <Route exact path="/party">
            <NavBar displayname={displayname} imageurl = {imageurl} /> <Party/>
            </Route>
          </Switch>
        </Router>
        </RefreshTokenContext.Provider>
    </TokenContext.Provider>
    );
}

export default App;
