import React from "react";
import './Login.css';
import logo from '../images/logo_1_transparent.png'



// export const authEndpoint = 'https://accounts.spotify.com/authorize';

// const clientId = "07edde060f0f46bf82f2a7f621354d2a"
// const redirectUri = "http://localhost:3000/callback"
// const scopes = [
//   "user-read-private",
//   "user-read-currently-playing",
//   "user-read-email",
//   "user-library-read",
//   "streaming",
//   "user-read-recently-played",
//   "user-top-read",
//   "user-modify-playback-state",
//   "user-read-playback-state",
//   "user-library-modify",
// ]


  // href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
 //   "%20"
 // )}&response_type=token&show_dialog=true`}

function Login() {

    return (
      <div className="App">
        <h1 className="head">AuxSwap</h1>
        <img src={logo} className="mainLogo" />
          <body className="bod">
            A web application using Spotify. <br></br>
            Listen together and chat with your friends!
          
          </body>
          {/* <header className="App-header"> */}
              <a className="Login-button" href='http://localhost:4000/auth/login' >
                Login to Spotify
              </a>
          {/* </header> */}
      </div>
    );


}

export default Login