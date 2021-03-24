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
  const [tokenflag, setTokenFlag] = React.useState(true);

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
              setCurrToken(false);
              console.log("IN GET DATA ERROR",token);
              console.log(error);
              
          }
      });
      };
    const token = window.localStorage.getItem('token');
    const refresh = window.localStorage.getItem('refresh');
    if (token != null) {
      setCurrToken(token);
      const promise = fetchData(token);
      if(tokenflag == false){
        setCurrToken(null);
      }
      if(refresh && tokenflag == true){
        setRefreshCurrToken(refresh);
      };
    };
  }, []);

//   function getData(){
//     $.ajax({
//         url: "https://api.spotify.com/v1/me",
//         type: "GET",
//         beforeSend: xhr =>{
//             xhr.setRequestHeader("Authorization", "Bearer " + currtoken);
            
//         },
//         success: data =>{
//             console.log("IN GET DATA",currtoken);
//             if(!data){
//                 console.log("getem");
//                 return false ;
//             }
//             setDisplayName(data.display_name);
//             setImageUrl(data.images[0].url);
//             return true;
//         },
//         error: error => {
//             console.log("IN GET DATA ERROR",currtoken);
//             return false;
//             console.log(error);
            
//         }
//     });
// }





  const updateToken = (token,refresh) => {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('refresh', refresh);
    setCurrToken(token);
    setRefreshCurrToken(refresh);
  };


  const updateTokenFlag = (token) => {
    setTokenFlag(token);
  };

  const JustToken = (token) => {
    window.localStorage.setItem('token', token);
    setCurrToken(token);
  };

  //TODO: Move the last four routes into home.js without it breaking.... Why do they all need to be in one place?
    return (
    <TokenContext.Provider value={{currtoken}}>
      <RefreshTokenContext.Provider value={{refreshcurrtoken}}>
      <Router>
          <Switch>
            <Route exact path="/">
              {tokenflag ? <Redirect to="/home"/> : <Login/>}
            </Route>
            <Route exact path="/home">
              {tokenflag ? <div> <NavBar displayname={displayname} imageurl = {imageurl} /><Home/> </div>: <Redirect to="/"/> }
            </Route>
            <Route path="/callback">
              {tokenflag ? <Redirect to="/home"/> : <Callback updateToken={updateToken} JustToken={JustToken} tokenflag = {updateTokenFlag}/> }
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
