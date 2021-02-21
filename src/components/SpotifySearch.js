import React, { useContext, useEffect, useState } from "react";
import * as $ from "jquery";
import './SpotifySearch.css';
import TokenContext from './TokenContext'
import SpotifyPlayer from 'react-spotify-web-playback';


const SpotifySearch = (props) => {
    const context = useContext(TokenContext);  
    const [topResults, setTopResults] = React.useState([]);
    const [trackName, setTrackName] = React.useState("")
    const getSongSearch = (props) => {
        console.log("INSIDE")
        $.ajax({
        url: `https://api.spotify.com/v1/search?q=${trackName}&type=track`,
        type: "GET",
        beforeSend: xhr => {
            xhr.setRequestHeader("Authorization", "Bearer " + context.currtoken);
        },
        dataType: "json",
       
        success: data => {
            if(!data){

            }
            console.log("SUCCESS SUCCESS SUCCESS")
            console.log(data);
            //   setTopResults({topResults: data.tracks.items[0].album.images[1].url})
            //   setTopResults({topResults: data.tracks.items[0].album.images[2].url})
            // setTopResults(topResults => [...topResults, data.tracks.items[0].album.images[2].url])
            // setTopResults(topResults => [...topResults, data.tracks.items[1].album.images[2].url])
            setTopResults(topResults => [...topResults, data.tracks.items[0]])
            setTopResults(topResults => [...topResults, data.tracks.items[1]])

          
        },
        error: error => {
            console.log("ERROR ERROR ERROR")
          console.log(error);
    
        }
      });
      }
      useEffect(() => {
          // TODO: FIGURE OUT HOW TO CLEAR OUT THE topResults ARRAY
          // WHEN CHANGES ARE MADE IN THE SEARCHBAR
          // so far, this seems to do the trick
        console.log("SpotifySearch useEffect")
        setTopResults([])
        setTrackName(document.getElementById('searchbar').value)
        getSongSearch(props);

    },[]);
    return(
        // <div>
        //     first:
        //     <img src={topResults[0]}></img>
        //     <br></br>
        //     <br></br>
        //     <br></br>
        //     second:
        //     <img src={topResults[1]}></img>

        // </div>
        
        <div>
            <input type="search" id="searchbar"

            />
            <button onClick={() => {console.log(`value should be: ${document.getElementById('searchbar').value}`);setTopResults([]); setTrackName(document.getElementById('searchbar').value);console.log(`trackName is: ${trackName}`); getSongSearch(props)}} className="send-search-button">
            SEARCH
            </button>

            

        <h1>RESULTS </h1>
        <ul>
            {/* <li> */}
                {topResults.map(index => {
                    return <img key={index.album.images[2].url} src={index.album.images[2].url} onClick={() => {navigator.clipboard.writeText(index.external_urls.spotify);document.execCommand("copy");console.log(`YOU PRESSED ME: ${index.external_urls.spotify}`)}}/>
                })}
            {/* </li> */}
        </ul>
        
      </div>
    )
    // let names = ['wood', 'sun', 'moon', 'sea'].map( (name, index) => {
    //     return <img key={index} className="img-responsive" alt="" src={require(`./icons/${name}.png`)} />
    // } );
        
    }
    
    export default SpotifySearch