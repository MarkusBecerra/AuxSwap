import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import NavBar from '../components/navBar';
import "./ChatHome.css";
import ChatUserSearch from '../components/ChatUserSearch'


const ChatHome = () => {
  const [roomName, setRoomName] = React.useState("");
  const history = useHistory();

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

const handleClick = () => {
  history.push(`/chat/${roomName}`);
}

const handleEnter = e => {    //handle enter function
  if (e.keyCode === 13) {      //if the user hits enter
    handleClick()       //call the send message function (basically hit send button)
  }
};

  return (
    <div>
      <div className="home-container">
        <ChatUserSearch></ChatUserSearch>
      </div>

    </div>
  );
};

export default ChatHome;
