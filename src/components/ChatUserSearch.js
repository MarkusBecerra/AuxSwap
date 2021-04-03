import React, { useContext, useEffect, useState } from "react";
import * as $ from "jquery";
import './ChatUserSearch.css';
import TokenContext from './TokenContext'
import SpotifyPlayer from 'react-spotify-web-playback';

const SpotifyUserSearch = (props) => {
    const context = useContext(TokenContext);  
    const [userID, setUserID] = React.useState('');
    const [userDisplayName, setUserDisplayName] = React.useState('');
    const [userImage, setUserImage] = React.useState('');

  
    const getUserSearch = (props) => {

        if(userID != "")
        {
        $.ajax({
        url: `https://api.spotify.com/v1/users/${userID}`,
        type: "GET",
        beforeSend: xhr => {
            xhr.setRequestHeader("Authorization", "Bearer " + context.currtoken);
        },
        dataType: "json",
       
        success: data => {
            if(!data){
            }
            else if(typeof(data) == undefined)
            {

            }
            else
            {

                console.log(`userData: ${data}`);
                setUserDisplayName(data.display_name);
                if(data.images.length > 0)
                {
                    setUserImage(data.images[0].url);
                }
                else
                {
                    setUserDisplayName("User does not exist");
                    setUserImage("");
                }
            } 
        },
        error: error => {
          console.log(error);
        }
      });
        }
      }
      useEffect((props) => {
        getUserSearch();
    },[userID]);
    return(
        <div>
        <br></br>
            <input placeholder="Search for a user" type="search" id="searchbar" autoComplete="off" className="user-searchbar" onChange={() => {setUserID(document.getElementById('searchbar').value)}} />
        <div className="result-container">
          <ul className="result-list">
              
                      <li className="user-info-item">
                      <div>
                        <img className="search-image" src={userImage}/>
                        <div className="user-display-name">{userDisplayName}</div>

                      </div>
                      </li>
          </ul>
        </div>
      </div>
    )
        
    }
    
    export default SpotifyUserSearch