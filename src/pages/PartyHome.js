import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import NavBar from '../components/navBar';
import "./PartyHome.css";

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
      <NavBar/>
      <div className="home-container">
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onKeyDown={handleEnter}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`/party/${roomName}`} className="enter-room-button">
        Join room2
      </Link>
      </div>
    </div>
  );
};

export default PartyHome;
