import React, { useContext, useEffect, useCallback } from "react";
import * as $ from "jquery";
import Player from "../components/Player";
import './PlayerPage.css';
import TokenContext from "../components/TokenContext";
import NavBar from '../components/navBar';
import SpotifyPlayer from 'react-spotify-web-playback';
import SpotifyWebApi from "spotify-web-api-js";
const sp = new SpotifyWebApi()

function PlayerPage() {

  const context = useContext(TokenContext);

  const [item, setItem] = React.useState({ album: { images: [{ url: "" }] }, name: "", artists: [{ name: "" }], duration_ms: 0 });
  const [is_playing, setIs_playing] = React.useState("Paused");
  const [progress_ms, setProgress_ms] = React.useState(0);
  const [NoData, setNoData] = React.useState(false);
  const [didErrorOccur, setDidErrorOccur] = React.useState(false);
  const [weeklyPlay, setweeklyplay] = React.useState([])

 

  function getInfor() {
    //sp.getMyCurrentPlayingTrack()
    sp.getMyCurrentPlaybackState().then((data) => {
      if (!data) {
        //Frist_time()
        setNoData(true);
      } else {
        //console.log(data)
        setItem(data.item);
        setIs_playing(data.is_playing);
        setProgress_ms(data.progress_ms);
        setNoData(false);
      }
    }, (error) => {
      console.log(error)
      setNoData(true);
      setDidErrorOccur(true);
    });
    // console.log(weeklyPlay)
    //console.log("called")
  }

  function Frist_time() {
    sp.getFeaturedPlaylists().then(
      (data) => {
        console.log(data)
        const index = Math.floor(Math.random()*Math.floor(data.playlists.total -1))
        const res = data.playlists.items[index].uri;
        const arr = [res];
        console.log(weeklyPlay);
        setweeklyplay(arr);
        return 
      }, (error) => {
        console.log(error)
      }
    );
  }
  function handleSkip(){
    sp.skipToNext()
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
  window.onbeforeunload = function () { return false; }
  useEffect(() => {
    sp.setAccessToken(context.currtoken)
    Frist_time()
    const interval = setInterval(() => {
      //getData();
      getInfor();
    }, 1000);
    
    return () => { clearInterval(interval) }
  }, [context.currtoken]);


  return (
    <div className="App" >
      <NavBar />
      <div onClick={()=>{handleSkip()}}>next</div>
      <header className="App-header" >
        {!NoData && (
          <Player
            item={item}
            is_playing={is_playing}
            progress_ms={progress_ms}
          />
        )}
        {NoData && didErrorOccur && (
          <p>
            Uh oh! An error occurred when making contact with the API :(
          </p>
        )}
        {NoData && !didErrorOccur && (
          <p>
            Are you logged into Spotify? Make sure you are logged in AND that something is playing.
          </p>
        )}
      </header>
      <div className="spotify_sdk_player" >
        {
          true ? <SpotifyPlayer
            token={context.currtoken}
            
            uris={weeklyPlay}
            autoPlay="true"
            showSaveIcon="true"
            name="Auxswap"
          /> : null
        }
      </div>
    </div>
  );


}

export default PlayerPage