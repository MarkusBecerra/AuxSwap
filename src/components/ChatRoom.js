import React, { useContext, useEffect } from "react";
import SpotifyPlayer from 'react-spotify-web-playback';
import "./ChatRoom.css";
import useChat from "../hooks/useChat";
import TokenContext from './TokenContext';
import * as $ from "jquery";
import SpotifyTrackMessage from "./SpotifyTrackMessage";
import SpotifySearch from "./SpotifySearch";
import NavBar from './navBar';


//CREDIT: https://github.com/gilbarbara/react-spotify-web-playback


const ChatRoom = (props) => {
  const spotifyRegex = /(spotify:track:|https:\/\/[a-z]+\.spotify\.com\/track\/)([0-9a-z-A-Z]{22})/g;
  const linkRegex = /(http:|https:|ftp:)\/\/[a-zA-Z0-9]+[.][a-z]+\/*[^ \n]*/g;
  const { roomId } = props.match.params;
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");
  const [currSong, setCurrSong] = React.useState([]);
  const context = useContext(TokenContext);
  const [showPlayer, setShowPlayer] = React.useState(false);
  const [hitEnter, setEnter] = React.useState(false);         //this state tracks if the enter key was hit within the text field

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
    }
    sendMessage(newMessage);
    setNewMessage("");
  };


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

  const setSpotifyURIQueue = (message) => {
    const array = message.match(spotifyRegex);
    const songID = array[2];
    const res = "spotify:track:".concat(songID);
    const arr = currSong;
    arr.push(res);
    setCurrSong(arr);
  }

    const setSpotifyURI = (message) => {
    const array = message.match(/(spotify:track:|https:\/\/[a-z]+\.spotify\.com\/track\/)([0-9a-z-A-Z]{22})/);
    const songID = array[2];
    const res = "spotify:track:".concat(songID);
    const arr = [res];
    setCurrSong(arr);
  }

  return (
  <div className="chat-room-page">
    <NavBar/>
   <div className="chat-room-container">
    <h1 className="chat-room-title">Chat Room</h1>
      <h2 className="room-name">Room: {roomId}</h2>
        <div className="messages-container">
          <ol className="messages-list">
          {messages.map((message, i) => {

            if(isMessageSpotifyTrack(message.body)){
              const spotifyLinkSet = new Set((message.body).match(spotifyRegex));
              const spotifyLinks = Array.from(spotifyLinkSet);
              const restofMessage = (message.body).replace(/[ \n]*spotify:track:|https:\/\/[a-z]+\.spotify\.com\/track\/([0-9a-z-A-Z]{22})([?]si=[a-zA-Z0-9]{22})?([ \n]*)/g,''); 
              const isRestOfMessageEmpty = restofMessage === '';
              return (
                  <div>
                      {!isRestOfMessageEmpty ? <li key={i} className={`message-item ${ message.ownedByCurrentUser ? "my-message" : "received-message" }`}>
                            <div>
                                {restofMessage}
                            </div>
                        </li> : null}
                    {spotifyLinks.map((spotifyLink,m_key)=>{
                        return(
                          <li key={m_key} className={`message-item ${ message.ownedByCurrentUser ? "my-message" : "received-message" }`}>
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
                <li key={i} className={`message-item ${ message.ownedByCurrentUser ? "my-message" : "received-message" }`}>
                {words.map((word,j)=>{
                  const isLink = linkRegex.test(word);
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
              return (<li key={i} className={`message-item ${ message.ownedByCurrentUser ? "my-message" : "received-message" }`}>
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
        className="new-message-input-field"
        id="new-message-input-field"
        onKeyPress={e => e.key === 'Enter' ? handleSendMessage() : null}


      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>

      <div>
        <SpotifySearch>SPOTIFY SEARCH</SpotifySearch>
      </div>

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
