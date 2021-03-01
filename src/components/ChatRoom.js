import React, { useContext, useEffect } from "react";
import SpotifyPlayer from 'react-spotify-web-playback';
import "./ChatRoom.css";
import useChat from "../hooks/useChat";
import TokenContext from './TokenContext';
import * as $ from "jquery";
import SpotifyTrackMessage from "./SpotifyTrackMessage";
import SpotifySearch from "./SpotifySearch";


//CREDIT: https://github.com/gilbarbara/react-spotify-web-playback


const ChatRoom = (props) => {
  const regex = /^(spotify:track:|https:\/\/[a-z]+\.spotify\.com\/track\/)([0-9a-z-A-Z]{22})/;
  const { roomId } = props.match.params;
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");
  const [currSong, setCurrSong] = React.useState("spotify:track:0jBE7Fn78EAvmIs3dCd6GO");
  const context = useContext(TokenContext);


  // const trackSearch = document.getElementById('searchBar');
  // const trackSearch = "blinding lights";


  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };


  //Checking if message is spotify track using JS regex.
  const isMessageSpotifyTrack = (body) =>{
    if(regex.test(body)){
      return true;
    }
      return false;
  }

  const setSpotifyURI = (message) => {
    const array = message.match(regex);
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
                    <div onClick={()=> setSpotifyURI(message.body)}>                    
                        <SpotifyTrackMessage message={message.body}  />
                    </div>

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
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
        id="new-message-input-field"

      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>

      <div>
        <SpotifySearch>SPOTIFY SEARCH</SpotifySearch>
      </div>
      
      <SpotifyPlayer
      token={context.currtoken}
      uris={currSong}
      />
    </div>

  );
};

export default ChatRoom;