import React, { useContext, useEffect, useState } from "react";
import * as $ from "jquery";
import './ChatUserSearch.css';
import TokenContext from './TokenContext'
import { Link } from "react-router-dom";

const SpotifyUserSearch = (props) => {
    const context = useContext(TokenContext);  
    const [userID, setUserID] = useState('');
    const [userDisplayName, setUserDisplayName] = useState('');
    const [userImage, setUserImage] = useState('');

  
    const getUserSearch = (props) => {

        if(userID !== '')
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
        else
        {
          console.log("else")
          setUserID("");
          setUserDisplayName("");
          setUserImage("");
                
        }
      }
      useEffect((props) => {
        getUserSearch();
    },[userID]);
    return(
        <div>
        <br></br>
            <input placeholder="Search for a user" type="search" id="user_searchbar" autoComplete="off" className="user-searchbarChatUserSearch" onChange={() => {setUserID(document.getElementById('user_searchbar').value)}} />
                  {userDisplayName!=='' && userImage!=='' ? <div className="result-containerChatUserSearch">
                        <ul className="result-listChatUserSearch" id="result-listChatUserSearch">
                        <li className="user-info-itemChatUserSearch">
                        <div>
                          
                          <Link to={`/chat/1`}>
                              <img className="search-imageChatUserSearch" src={userImage} />
                          </Link>
                         
                        <div className="user-display-nameChatUserSearch">{userDisplayName}</div>
                      </div>
                      </li>
          </ul>
        </div>
 : null}

{userDisplayName!=='' && userImage=='' ? <div className="result-containerChatUserSearch">
                        <ul className="result-listChatUserSearch" id="result-listChatUserSearch">
                        <li className="user-info-itemChatUserSearch">
                        <div>

                        <div className="user-display-nameChatUserSearch_2">{userDisplayName}</div>
                      </div>
                      </li>
          </ul>
        </div>
 : null}

      </div>
    )
        
    }
    
    export default SpotifyUserSearch