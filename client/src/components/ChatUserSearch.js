import React, { useContext, useEffect, useState } from "react";
import * as $ from "jquery";
import './ChatUserSearch.css';
import TokenContext from './TokenContext'
import { Link } from "react-router-dom";
import axios from 'axios';
import ChatRoom from "./ChatRoom";

const SpotifyUserSearch = (props) => {
    const context = useContext(TokenContext);  
    const [userID, setUserID] = useState('');
    const [userDisplayName, setUserDisplayName] = useState('');
    const [userImage, setUserImage] = useState('');
    const [sessionID, setSessionID] = useState(''); 
    const [curUserID, setcurUserID] = useState('');

    const id = async () => {
      if(!context.currtoken)
      {
        return "";
      }
      await $.ajax({
          url: "https://api.spotify.com/v1/me",
          type: "GET",
          beforeSend: xhr =>{
              xhr.setRequestHeader("Authorization", "Bearer " + context.currtoken);
              
          },
          success: data =>{
              if(!data){
                  console.log("null values");
              }
              setcurUserID(data.id);
          },
          error: error => {
              console.log("IN GET DATA ERROR", context.currtoken);
              console.log(error);  
          }
      });
    }
    React.useEffect(() => {
      id();
    })

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
        setUserID("");
        setUserDisplayName("");
        setUserImage("");
              
      }
    }
    useEffect((props) => {
      getUserSearch();
    },[userID]);
    
    // check the session between two person, if exists, then return session id, else create session
    const getSession = async() => {
      await axios.get(`${process.env.REACT_APP_HOST}/session/${userID}/${curUserID}`, {
        params: {
          user1: userID,
          user2: curUserID
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.data.length == 0)
        {
          console.log("Its empty, need to post add one");
          // create seesion
          const payload = {
            user1: curUserID,
            user2: userID
          }
          axios.post(`${process.env.REACT_APP_HOST}/sessions`, payload).then((res) => {
            setSessionID(res.data[1]);
            console.log(`successful: ${res.data[1]}`);
          }).catch(function (err) {
            setSessionID(err.message);
            console.log(`existed: ${err.message}`);
          })
        }
        else {
          setSessionID(res.data[0].session_id);
          console.log("Not empty")
        }
        
      }).catch(function (err) {
        console.log(`err: ${err.message}`);
      });
    }

    return(
        <div>
        <br></br>
            <input placeholder="Search for a user" type="search" id="user_searchbar" autoComplete="off" className="user-searchbarChatUserSearch" onChange={() => {setUserID(document.getElementById('user_searchbar').value)}} />
                  {userDisplayName!=='' && userImage!=='' ? <div className="result-containerChatUserSearch">
                        <ul className="result-listChatUserSearch" id="result-listChatUserSearch">
                        <li className="user-info-itemChatUserSearch">
                        <div>

                          {/* <button><img onClick={getSession}className="search-imageChatUserSearch" src={userImage}/></button> */}
                          <Link to={`/chat/${sessionID}`}>
                            <img onClick={getSession}className="search-imageChatUserSearch" src={userImage}/>
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