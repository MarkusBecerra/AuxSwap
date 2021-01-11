import logo from './logo.svg';
import React, { useEffect } from "react";
import * as $ from "jquery";
import Player from "./Player";
import './App.css';

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
const hash = window.location.hash.substring(1).split("&").reduce(function(initial,item) {
  if(item) {
    let parts = item.split("=");
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});

window.location.hash="";



function App() {

const[currtoken, setCurrToken] = React.useState(null);
const[item, setItem] = React.useState({album: {images: [{url: ""}]}, name: "", artists: [{name: ""}], duration_ms: 0});
const[is_playing, setIs_playing] = React.useState("Paused");
const[progress_ms, setProgress_ms] = React.useState(0);
const[NoData, setNoData] = React.useState(false);

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
      setItem(data.item);
      setIs_playing(data.is_playing);
      setProgress_ms(data.progress_ms);
      setNoData(false)
    }
  });
}


  useEffect(() => {
  console.log("poop")
  let token = hash.access_token;
  if (token) {
    setCurrToken(token);
  }
  getData(token);
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
              Are you logged into Spotfiy?
            </p>
          )}
        </header>
      </div>
    );
}

export default App;
