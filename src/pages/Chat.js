import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ChatHome from "./ChatHome.js";
import Party from '../pages/Party';
import ChatRoom from "../components/ChatRoom";
import PlayerPage from '../pages/PlayerPage';
import Home from '../components/Home';

function Chat() {
  return (
    <Router>
      <Switch>
        <Route exact path="/chat" component={ChatHome} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/chat/:roomId" component={ChatRoom} />
        <Route exact path="/player" component={PlayerPage}/>
        <Route exact path="/party" component={Party}/>
      </Switch>
    </Router>
  );
}

export default Chat;