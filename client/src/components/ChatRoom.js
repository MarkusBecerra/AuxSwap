import React, { useContext, useEffect} from "react";
import SpotifyPlayer from 'react-spotify-web-playback';
import "./ChatRoom.css";
import useChat from "../hooks/useChat";
import TokenContext from './TokenContext';
import SpotifyTrackMessage from "./SpotifyTrackMessage";
import SpotifySearch from "./SpotifySearch";
import axios from 'axios';
import * as $ from "jquery";


//CREDIT: https://github.com/gilbarbara/react-spotify-web-playback

const ChatRoom = (props) => {

  const context = useContext(TokenContext);
  const spotifyRegex = /(spotify:track:|https:\/\/[a-z]+\.spotify\.com\/track\/)([0-9a-z-A-Z]{22})/g;
  const linkRegex = /(http:|https:|ftp:)\/\/[a-zA-Z0-9]+[.][a-z]+\/*[^ \n]*/g;
  const { roomId } = props.match.params;
  // const [curUserID, setCurUserID] = React.useState("")
  const [currUserID, setCurrUserID] = React.useState("");
  const { messages, sendMessage, setMessages } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");
  const [currSong, setCurrSong] = React.useState([]);
  const [showPlayer, setShowPlayer] = React.useState(false);
  const [hitEnter, setEnter] = React.useState(false);         //this state tracks if the enter key was hit within the text field
  const [check, setCheck] = React.useState(true);
  const toggle = React.useCallback(() => setCheck(!check));
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [displayUserID, setDisplayUserID] = React.useState("");




  const getSession = async () => {

    axios.get(`${process.env.REACT_APP_HOST}/session/${roomId}`, {
      params: {
        session_id: roomId
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }, { responseType: 'json' }).then((res) => {


      for (let i = 0; i < res.data.length; i++) {
        if(res.data[i].user_id != currUserID)
        {
          setDisplayUserID(res.data[i].user_id);
        }
      }
    }).catch(function (err) {
      console.log(err.type);
    });
  }





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
            setCurrUserID(data.id);
            console.log(`right after set: ${currUserID}`);
        },
        error: error => {
            console.log("IN GET DATA ERROR", context.currtoken);
            console.log(error);  
        }
    });
  }
  React.useEffect(() => {
    id();
    getSession();
  })

  React.useEffect(() => {
    retrieveDetailsFromServer(roomId); //get chat history
  }, [currUserID]);

  // React.useLayoutEffect(() => {
  //   retrieveDetailsFromServer("xG7Y7IoU2"); //get chat history
  // }, [messages]);

  const handleNewMessageChange = (event) => {
    event.preventDefault()
    if(hitEnter !== true){                 //if the enter key hasn't been pressed
      setNewMessage(event.target.value);
    }
    setEnter(false);      //set the enter key to false
  };

  const handleSendMessage = () => {
    if(newMessage === ""){
          setNewMessage("");
      return;
    };
    sendMessage(newMessage);
    sendDetailsToServer(newMessage, roomId);
    // This will scroll to the bottom of the messages after a message is sent
    // we want to timeout so that it occurs only after a song is rendered, otherwise
    // it scrolls to the bottom, then renders the song, and now it's no longer at the bottom
    var chats = document.getElementById("messages-container");
   
    setTimeout(() => {
      chats.scrollTop = 1000000000;
    },100);
    setNewMessage("");
    
  };

  // add message to db
  const sendDetailsToServer = (message, roomId) => {
    const payload = {
        session: roomId,
        userID: currUserID,
        content: message
    }
    axios.post(`${process.env.REACT_APP_HOST}/messages`, payload).catch(function (err) {
        alert(err.message);
    })
  }

  // pull message from db
  const retrieveDetailsFromServer = (roomId) => {
    console.log("here");
    if (currUserID) {
      if (check){
        axios.get(`${process.env.REACT_APP_HOST}/messages/${roomId}`, {
          params: {
            id: roomId
          },
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }, { responseType: 'json' }).then((res) => {
          // setMessages((messages) => []);
          console.log("retrive from db here");
          for (let i = 0; i < res.data.length; i++) {
            if(res.data[i].sender_id == currUserID)
            {
              // sendMessage(res.data[i].content, true);
              const incomingMessage = {
                body: res.data[i].content,
                senderId: res.data[i].sender_id,
                isCurrentUser: true,
              };
              setMessages((messages) => [...messages, incomingMessage]);
            }
            else{
              const incomingMessage = {
                body: res.data[i].content,
                senderId: res.data[i].sender_id,
                isCurrentUser: false,
              };
              setMessages((messages) => [...messages, incomingMessage]);
              // sendMessage(res.data[i].content, false);
            }
          }
        }).catch(function (err) {
          console.log(err.type);
        });
        toggle();
      }
    }
  }

  const handleEnter = e => {    //handle enter function
    if (e.keyCode === 13) {      //if the user hits enter
      setEnter(true)            //set enter to true, the key has been hit
      handleSendMessage()       //call the send message function (basically hit send button)
    }
  };


  //Checking if message contains spotify track using JS regex.
  const isMessageSpotifyTrack = (body) =>{
    if(spotifyRegex.test(body)){
      return true;
    }
      return false
  }

  //Checking if message contains a url using JS regex
  const isMessageLink = (body) => {
    if(linkRegex.test(body)){
      return true
    }
    return false;
  }

  // const setSpotifyURIQueue = (message) => {
  //   const array = message.match(spotifyRegex);
  //   const songID = array[2];
  //   const res = "spotify:track:".concat(songID);
  //   const arr = currSong;
  //   arr.push(res);
  //   setCurrSong(arr);
  // }

  const setSpotifyURI = (message) => {
  const array = message.match(/(spotify:track:|https:\/\/[a-z]+\.spotify\.com\/track\/)([0-9a-z-A-Z]{22})/);
  const songID = array[2];
  const res = "spotify:track:".concat(songID);
  const arr = [res];
  setCurrSong(arr);
  }

  return (
  <div className="chat-room-page">
   <div className="chat-room-container">
    <h1 className="chat-room-title">Chat Room</h1>
      <h2 className="room-name">{displayUserID}</h2>
      <div>
        <SpotifySearch>SPOTIFY SEARCH</SpotifySearch>
      </div>
        <div className="messages-container" id="messages-container">
          <ol className="messages-list">
          {
            // console.log(`${messages}`),
           console.log(messages.length),
           messages.map((message, i) => {
             if(isMessageSpotifyTrack(message.body)){
              const spotifyLinkSet = new Set((message.body).match(spotifyRegex));
              const spotifyLinks = Array.from(spotifyLinkSet);
              const restofMessage = (message.body).replace(/[ \n]*spotify:track:|https:\/\/[a-z]+\.spotify\.com\/track\/([0-9a-z-A-Z]{22})([?]si=[a-zA-Z0-9]{22})?([ \n]*)/g,'');
              const isRestOfMessageEmpty = restofMessage === '';
              return (
                  <div>
                      {!isRestOfMessageEmpty ? <li key={i} className={`message-item ${ message.isCurrentUser ? "my-message" : "received-message" }`}>
                            <div>
                                {restofMessage}
                            </div>
                        </li> : null}
                    {spotifyLinks.map((spotifyLink,m_key)=>{
                        return(
                          <li key={m_key} className={`message-item ${ message.isCurrentUser ? "my-message" : "received-message" }`}>
                              <div  onClick={()=> {
                                  setSpotifyURI(spotifyLink);
                                  setShowPlayer(true);
                                }}>
                                  <SpotifyTrackMessage message={spotifyLink}  />
                            </div>
                          </li>
                        )
                      })
                    }

              </div>
              )
            }
            else if(isMessageLink(message.body)){

              const words = message.body.split(' ');
              return(
                <li key={i} className={`message-item ${ message.isCurrentUser ? "my-message" : "received-message" }`}>
                {words.map((word,j)=>{
                  const tempRegex = /(http:|https:|ftp:)\/\/[a-zA-Z0-9]+[.][a-z]+\/*[^ \n]*/g;
                  const isLink = tempRegex.test(word);
                    return(
                      //TODO: THOMAS ADD CSS HERE PLZ TO CUT OUT NEW LINES BETWEEN THE TAGS
                      <div key={j}>
                        {isLink ? <a href={word} target="_blank" rel="noreferrer">{word} </a> : <div>{word}</div>}
                      </div>
                    )
                })}
                  </li>
              )
            }
            else{
              return (<li key={i} className={`message-item ${ message.isCurrentUser ? "my-message" : "received-message" }`}>
                          {message.body}
                     </li>)
            }
          })}
        </ol>
      </div>

      <textarea
        className="new-message-input-field"
        value={newMessage}
        onKeyDown={handleEnter}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        id="new-message-input-field"
        onKeyPress={e => e.key === 'Enter' ? handleSendMessage() : null}


      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>

      {/* <div>
        <SpotifySearch>SPOTIFY SEARCH</SpotifySearch>
      </div> */}

        <div>
          {showPlayer ? <button onClick={() => setShowPlayer(false)}>
            <img src="https://1001freedownloads.s3.amazonaws.com/vector/thumb/70571/close-button.png" className="x-button"/>
          </button> : null}
        </div>

      <div>
        {showPlayer ? <SpotifyPlayer
          token={context.currtoken}
          uris={currSong}
          autoPlay="true"
          showSaveIcon="true"
          name="Auxswap"
          /> : null}
      </div>
      </div>
    </div>

  );
};

export default ChatRoom;
