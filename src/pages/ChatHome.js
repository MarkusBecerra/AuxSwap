import React from "react";
import { Link } from "react-router-dom";
import NavBar from '../components/navBar';
import "./ChatHome.css";

const ChatHome = () => {
  const [roomName, setRoomName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <div className="home-container">
      <NavBar/>
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      />
      <Link to={`/chat/${roomName}`} className="enter-room-button">
        Join room
      </Link>
    </div>
  );
};

export default ChatHome;