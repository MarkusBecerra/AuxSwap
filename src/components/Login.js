import React from "react";
import './Login.css';
import logo from '../logo.svg';




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
  "user-library-modify",
]


function Login() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
        </header>
      </div>
    );


}

export default Login