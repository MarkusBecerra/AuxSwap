import logo from './logo.svg';
import React, { useEffect } from "react";
import * as $ from "jquery";
import Player from "./Player";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



export const authEndpoint = 'https://accounts.spotify.com/authorize';

const clientId = "07edde060f0f46bf82f2a7f621354d2a"
const redirectUri = "http://localhost:3000/callback"
const scopes = [
  "user-read-private",
  "user-read-currently-playing",
  "user-read-email",
  "user-library-read",
  "streaming",
  "user-read-recently-played",
  "user-top-read",
  "user-modify-playback-state",
  "user-read-playback-state",
]


//extracting hash of the url....


//window.location.hash="";



function App() {

const[currtoken, setCurrToken] = React.useState(null);
const[item, setItem] = React.useState({album: {images: [{url: ""}]}, name: "", artists: [{name: ""}], duration_ms: 0});
const[is_playing, setIs_playing] = React.useState("Paused");
const[progress_ms, setProgress_ms] = React.useState(0);
const[NoData, setNoData] = React.useState(false);


const hash = window.location.hash.substring(1).split("&").reduce(function(initial,item) {
  if(item) {
    let parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});

//This uses fetch... 
// const getDatav2 = async (token) => {
//   const settings = {
// headers: {'Authorization': 'Bearer ' + token}
// }
//   const response = await fetch('https://api.spotify.com/v1/me/player',settings);
//   const data = await response.json();
//         if(!data){
//         setNoData(true);
//         return;
//       }
//       console.log(data);
//       setItem(data.item);
//       setIs_playing(data.is_playing);
//       setProgress_ms(data.progress_ms);
//       setNoData(false);
// }

//Original API call function... this uses ajax(a jQuery function) to preform it...
function getData(token) {

  $.ajax({
    url: "https://api.spotify.com/v1/me/player",
    type: "GET",
    beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: data => {
      if(!data){
        setNoData(true);
        return;
      }
      console.log(data);
      setItem(data.item);
      setIs_playing(data.is_playing);
      setProgress_ms(data.progress_ms);
      setNoData(false)
    }
  });
}



//TODO: DO NOT DELETE THE COMMENTED CODE DOWN BELOW. WE SHOULD PROBABLY CHOOSE THE BEST WAY TO USE THE "useEffect" CALLS. SO SHOULD WE 
// USE STATE VARIABLES OR THE VARIABLES WE DELCARE IN THE "useEffect" FUNCTIONS....


// A useEffect is triggered after a component FIRST renders. The useEffect will be called, and then the component will be updated accordingly.
// See here: https://reactjs.org/docs/hooks-effect.html#:~:text=What%20does%20useEffect%20do%3F,after%20performing%20the%20DOM%20updates.
//A useEffect within a component will only be called again if a value in its dependency list ( the '[]' at the end of the line) is modifed.

//For example, the first useEffect here has no dependencies, so it will only be called once to retrieve the value of the token in the hash
//if it exists.

  // useEffect(() => {
  // const localToken = window.sessionStorage.getItem('token');
  //   if(localToken) {
  //   setCurrToken(localToken);
  // }
  // else {
  // let token = hash.access_token
  // if(token) {
  //     setCurrToken(token);
  //     window.sessionStorage.setItem('token',token);
  // }
  //  }
  // }, []);

  
  //This useEffect will trigger after the component first renders, and then it will trigger whenever 'currtoken' is modified, because 'currtoken' is in its dependencies list.
  //   useEffect(() => {
  //     async function fetchData() {
  //       if(currtoken != null){
  //         getDatav2(currtoken);
  //       }
  //     }
  //     fetchData();
  // }, [currtoken]);

  useEffect(() => {
  console.log("poop")
  const localToken = window.sessionStorage.getItem('token')
  console.log(localToken);
  if(localToken) {
    setCurrToken(localToken);
    getData(localToken);
  }
  else {
    let token = hash.access_token;
    console.log(token);
    if (token) {
    window.sessionStorage.setItem('token',token);
    setCurrToken(token);
    getData(token);
  }
  }
}, []);


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {!currtoken && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {currtoken && !NoData && (
            <Player
              item={item}
              is_playing={is_playing}
              progress_ms={progress_ms}
            />
          )}
          {NoData && (
            <p>
              Are you logged into Spotify? Make sure you are logged in AND that something is playing.
            </p>
          )}
        </header>
      </div>
    );
}

export default App;
