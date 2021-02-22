import React, { useContext, useEffect } from "react";
import SpotifyPlayer from 'react-spotify-web-playback';
import "./ChatRoom.css";
import useChat from "../hooks/useChat";
import TokenContext from './TokenContext';
import * as $ from "jquery";
import SpotifyTrackMessage from "./SpotifyTrackMessage";

//CREDIT: https://github.com/gilbarbara/react-spotify-web-playback


const ChatRoom = (props) => {
  const spotifyRegex = /^(spotify:track:|https:\/\/[a-z]+\.spotify\.com\/track\/)([0-9a-z-A-Z]{22})/;
  const linkRegex = /^((http:|https:)\/\/[a-z.]*\.(com|io|to|dev|edu)\/)/;
  const { roomId } = props.match.params;
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");
  const [currSong, setCurrSong] = React.useState("");
  const context = useContext(TokenContext);
  const [showPlayer, setShowPlayer] = React.useState(false);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    console.log(newMessage);
    if(newMessage === ""){
          setNewMessage("");
      return;
    }
    sendMessage(newMessage);
    setNewMessage("");
  };


  //Checking if message is spotify track using JS regex.
  const isMessageSpotifyTrack = (body) =>{
    if(spotifyRegex.test(body)){
      return true;
    }
      return false;
  }

  const isMessageLink = (body) => {
    if(linkRegex.test(body)){
      return true
    }
    return false;
  }

  const setSpotifyURI = (message) => {
    const array = message.match(spotifyRegex);
    const songID = array[2];
    const res = "spotify:track:".concat(songID);
    setCurrSong(res);
  }


  return (
    <div className="chat-room-container">
      <h1 className="room-name">Room: {roomId}</h1>
        <div className="messages-container">
          <ol className="messages-list">
          {messages.map((message, i) => {
            
            if(isMessageSpotifyTrack(message.body)){
              return (<li key={i} className={`message-item ${ message.ownedByCurrentUser ? "my-message" : "received-message" }`}>
                    <div onClick={()=> {
                      setSpotifyURI(message.body);
                      setShowPlayer(true);
                    }}>                    
                        <SpotifyTrackMessage message={message.body}  />
                    </div>

              </li>)
            }
            else if(isMessageLink(message.body)){
              return(<li key={i} className={`message-item ${ message.ownedByCurrentUser ? "my-message" : "received-message" }`}>
                          <a href={message.body} target="_blank" rel="noreferrer">{message.body}</a>
                     </li>)
            }
            else{
              return (<li key={i} className={`message-item ${ message.ownedByCurrentUser ? "my-message" : "received-message" }`}>
                          {message.body}
                     </li>)
            }
          })}
        </ol>
      </div>



      {/* CONSIDER USING FORM AND INPUT FOR THIS!!!
      CHECKOUT: https://github.com/mrshawnhum/chat-app/blob/master/client/src/components/Chat/Chat.js
      FOR AN EXAMPLE. THANKS SHAWN */}
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
        onKeyPress={e => e.key === 'Enter' ? handleSendMessage() : null}
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
      {/* we want this component to only appear after a song has been */}


        <div>
          {showPlayer ? <button onClick={() => setShowPlayer(false)}> 
            <img src="https://1001freedownloads.s3.amazonaws.com/vector/thumb/70571/close-button.png" className="x-button"/>
          </button> : null}
        </div>


      <div> {showPlayer ? <SpotifyPlayer
          token={context.currtoken}
          uris={currSong}
          autoPlay="true"
          showSaveIcon="true"
          name="Auxswap"
          /> : null} 
      </div>
      

    </div>

  );
};

export default ChatRoom;