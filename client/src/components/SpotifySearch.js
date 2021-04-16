import React, { useContext, useEffect, useState } from "react";
import * as $ from "jquery";
import './SpotifySearch.css';
import TokenContext from './TokenContext'
import SpotifyPlayer from 'react-spotify-web-playback';
import {v4 as uuidv4} from 'uuid';

const SpotifySearch = (props) => {
    const context = useContext(TokenContext);  
    const [topResults, setTopResults] = React.useState([]);
    const [trackName, setTrackName] = React.useState("")
    const numSearchResults = 10; //number of results we want to return

    // a workaround to programatically trigger the onChange event of the
    // new-message-input-field, so that it sets the new message
    function setNativeValue(element, value) {
        const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
        const prototype = Object.getPrototypeOf(element);
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
        
        if (valueSetter && valueSetter !== prototypeValueSetter) {
            prototypeValueSetter.call(element, value);
        } else {
          valueSetter.call(element, value);
        }
      }
    
    const appendSongToMessage = (song) => {
        let textarea = document.getElementById("new-message-input-field")
        setNativeValue(textarea, song + " " + textarea.value );
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const getSongSearch = (props) => {
        setTopResults([])
        topResults.length = 0

        if(trackName != "")
        {
        $.ajax({
        url: `https://api.spotify.com/v1/search?q=${trackName}&type=track&limit=${numSearchResults}&offset=0`,
        type: "GET",
        beforeSend: xhr => {
            xhr.setRequestHeader("Authorization", "Bearer " + context.currtoken);
        },
        dataType: "json",
       
        success: data => {
            if(!data){
              
            }
            // console.log(data);
            data.tracks.items.forEach(element => {
                setTopResults(topResults => [...topResults, element])
            });   
        },
        error: error => {
          console.log(error);
        }
      });
        }
      }
      useEffect(() => {
        // if someone types fast enough, this can get up to length 10, due to asynchronous issues
        topResults.length = 0
        setTopResults([])
        // setTrackName(document.getElementById('searchbar').value)
        getSongSearch(props);


    },[trackName]);
    return(
        <div>
        <br></br>
            <input placeholder="Search for a song" type="search" id="searchbar" autoComplete="off" className="song-searchbar" onChange={() => {setTopResults([]);topResults.length=0; setTrackName(document.getElementById('searchbar').value);}} />
        <div className="result-container">
          <ul className="result-list">
              
                  {topResults.slice(0, numSearchResults).map(index => {

                      return <li className="song-info-list-item">
                      <div>
                        <img className="search-images" key={uuidv4()} src={index.album.images[0].url} onClick={() => {appendSongToMessage(index.external_urls.spotify);setTopResults([]);topResults.length=0;document.getElementById('searchbar').value=""}}/>
                        {/* <div className="song-name">{index.name}<br></br>{index.artists[0].name}</div> */}
                        <div className="song-name">{index.name}</div>
                        <div className="song-artist">{index.artists[0].name}</div>

                      </div>
                      </li>


                  })}
                  
              
          </ul>
        </div>
      </div>
    )
        
    }
    
    export default SpotifySearch