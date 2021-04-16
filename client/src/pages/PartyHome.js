import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "./PartyHome.css";
import Player from '../components/Party_components/Player'
const PartyHome = () => {
  const [roomName, setRoomName] = React.useState("");
  const history = useHistory();

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

const handleClick = () => {
  history.push(`/party/${roomName}`);
}

const handleEnter = e => {    //handle enter function
  if (e.keyCode == 13) {      //if the user hits enter
    handleClick()       //call the send message function (basically hit send button)
  }
};

  return (
    <div>
      <Player />
      <div className="home-container-party">
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onKeyDown={handleEnter}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`/party/${roomName}`} className="enter-room-button">
        Join Party
      </Link>
      </div>
    </div>
  );
};

export default PartyHome;
