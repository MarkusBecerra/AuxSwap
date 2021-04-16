import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import * as $ from "jquery";
import './ChatUserSearch.css';
import TokenContext from './TokenContext'
import { Link } from "react-router-dom";
import axios from 'axios';
import ChatRoom from "./ChatRoom";
import { useHistory } from "react-router-dom";

import {useRef} from 'react';
import e from "cors";



const SpotifyUserSearch = (props) => {

    let btnRef = useRef();


    const onBtnClick = e => {
      if(btnRef.current){
        btnRef.current.setAttribute("disabled", "disabled");
      }
      getSession();
    }
    
    const useForceUpdate = () => useState()[1];
    
    const history = useHistory();
    const context = useContext(TokenContext);  

    // this is the user id being typed in
    const [userID, setUserID] = useState('');
    const [userDisplayName, setUserDisplayName] = useState('');
    const [userImage, setUserImage] = useState('');
    const [sessionID, setSessionID] = useState(''); 

    // this is YOUR user ID
    const [curUserID, setcurUserID] = useState('');
    const [existingChats, setExistingChats] = useState([]);


    const [existingChatsDisplay, setExistingChatsDisplay] = useState([]);


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
              if(userID != "" && (data.id == userID))
              {
                document.getElementById('user_searchbar').value = "";
                setUserID("");
                setUserDisplayName("You cannot chat with yourself");
                setUserImage("");

                return;
              }

              setcurUserID(data.id);
          },
          error: error => {
              // console.log("IN GET DATA ERROR", context.currtoken);
              console.log(error);  
          }
      });
    }

    
    React.useEffect(() => {
      console.log("INSIDE ID USE EFFECT")
      id();
    }, )

    

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
            // console.log(`userData: ${data}`);
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
        setUserID("");
        setUserDisplayName("");
        setUserImage("");
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
      console.log("INSIDE GET USER SEARCH USE EFFECT")

      getUserSearch();
    },[userID]);

   


    const getExistingChats = async() => {
      await axios.get(`${process.env.REACT_APP_HOST}/sessions/${curUserID}`, {
        params: {
          user_id: curUserID
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
       
      console.log("DATA")
      console.log(res.data);
      setExistingChats(res.data);
        
      }).catch(function (err) {
        console.log(`err: ${err.message}`);
      });
    }



    useEffect((props) => {
      console.log("INSIDE GET EXISTING CHATS EFFECT")

      if(curUserID != '')
      {
        getExistingChats();
      }

    },[curUserID]);

    


    


  

    
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
          // console.log("Its empty, need to post add one");
          // create seesion
          const payload = {
            user1: curUserID,
            user2: userID
          }
          axios.post(`${process.env.REACT_APP_HOST}/sessions`, payload).then((res) => {
            setSessionID(res.data[1]);
            // console.log(`successful: ${res.data[1]}`);
          }).catch(function (err) {
            console.log(`err: ${err.message}`);
          })
        }
        else {
          setSessionID(res.data[0].session_id);
          // console.log("Already exist");
        }
        
      }).catch(function (err) {
        console.log(`err: ${err.message}`);
      });
    }







    useEffect((props) => {
      console.log("INSIDE SET EXISTING CHATS DISPLAY EFFECT")

      if(existingChats == [])
      {
        return;
      }
      if(existingChats.length == 0)
      {
        return;
      }
     
      console.log("LOL")
      console.log(`length: ${existingChats.length}`)

      for(let i=0;i<existingChats.length;i++) {
          if(curUserID !== '')
          {
            console.log("IT'S HAPPENING")
            $.ajax({
            url: `https://api.spotify.com/v1/users/${existingChats[i].user_id}`,
            type: "GET",
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + context.currtoken);
            },
            dataType: "json",
            
            success: data => {
                if(!data){
                }
                else
                {
                  setExistingChatsDisplay(existingChatsDisplay => [...existingChatsDisplay, [existingChats[i].session_id, data.display_name, data.images[0].url]]);
                } 
            },
            error: error => {
              console.log(error);
              
            }
          
     });
    }
  }

    },[existingChats]);
    





    useEffect((props) => {
    console.log(`CHANGED EXISTINGCHATSDISPLAY: ${existingChatsDisplay.length}`)
    

    },[existingChatsDisplay]);


    useEffect((props) => {
      // LINK TO
      console.log("INSIDE LINK TO USE EFFECT")
     
      history.push(`/chat/${sessionID}`);

    },[sessionID]);



    return(

      <div className="chat-user-search-container">

        <div className="existing-chats-container">

              <ul className="existing-chats-list" id="existing-chats-list">

              {existingChatsDisplay.map(index => {

                    return <li className="existing-chat-item">
                    <div>
                      <img className="existing-chat-image" key={index[0]} src={index[2]} onClick={() => {history.push(`/chat/${index[0]}`)}}/>
                      <div className="existing-chat-displayname">{index[1]}</div>

                    </div>
                    </li>


              })}

                          
              </ul>

          </div>


        <div className="ChatUserSearch-container">

       

        <br></br>
            <input placeholder="Search for a user" type="search" id="user_searchbar" autoComplete="off" className="user-searchbarChatUserSearch" onChange={() => {setUserID(document.getElementById('user_searchbar').value.toLowerCase())}} />
                  {userDisplayName!=='' && userImage!=='' && (curUserID.toLowerCase() != userID.toLowerCase()) ? <div className="result-containerChatUserSearch">
                        <ul className="result-listChatUserSearch" id="result-listChatUserSearch">
                        <li className="user-info-itemChatUserSearch">
                        <div>


                            <input type="image" ref={btnRef} className="search-imageChatUserSearch" src={userImage} onClick={onBtnClick} />
      

                        <div className="user-display-nameChatUserSearch">{userDisplayName}</div>
                      </div>
                      </li>
          </ul>
        </div>
 : null}

{userDisplayName!=='' && userDisplayName != "You cannot chat with yourself" && userImage=='' ? <div className="result-containerChatUserSearch">
                        <ul className="result-listChatUserSearch" id="result-listChatUserSearch">
                        <li className="user-info-itemChatUserSearch">
                        <div>

                        <div className="user-display-nameChatUserSearch_2">{userDisplayName}</div>
                      </div>
                      </li>
          </ul>
        </div>
 : null}


{userDisplayName == "You cannot chat with yourself" ? <div className="result-containerChatUserSearch">
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


      </div>

    )
    
  }



  
    
  export default SpotifyUserSearch