import React, { useContext, useEffect, useState } from "react";
import * as $ from "jquery";
import './SpotifyTrackMessage.css';
import TokenContext from './TokenContext';



const SpotifyTrackMessage = (props) => {
const context = useContext(TokenContext);  
 const regex = /^(spotify:track:|https:\/\/[a-z]+\.spotify\.com\/track\/)([0-9a-z-A-Z]{22})/;
 const [image, setImage] = React.useState("");
 const [songName, setSongName] = React.useState("");
 const [artistName, setArtistName] = React.useState("");

 
 const getSongImage = (message) => {
    const array = message.match(regex);
    const songID = array[2];
    $.ajax({
    url: `https://api.spotify.com/v1/tracks/${songID}`,
    type: "GET",
    beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + context.currtoken);
    },
    success: data => {
      if(!data){
        setImage("https://i.pinimg.com/originals/d4/e3/60/d4e3604d2811dbe178801f48e6a2ae69.jpg");
      }
        setImage(data.album.images[0].url);
        setSongName(data.name);
        setArtistName(data.artists[0].name);
    },
    error: error => {
      console.log(error);
        setImage("https://i.pinimg.com/originals/d4/e3/60/d4e3604d2811dbe178801f48e6a2ae69.jpg");
    }
  });
  }
  useEffect(() => {
      getSongImage(props.message);
},[]);
    return(
      <div className="song-message-container">
        <img className="search-images" src={image} />
        <div className="song-name">{songName}</div>
        <div className="song-artist">{artistName}</div>

      </div>
    )
}

export default SpotifyTrackMessage