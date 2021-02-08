import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ChatHome from "./ChatHome.js";
import ChatRoom from "../components/ChatRoom";

function Chat() {
  return (
    <Router>
      <Switch>
        <Route exact path="/chat" component={ChatHome} />
        <Route exact path="/:roomId" component={ChatRoom} />
      </Switch>
    </Router>
  );
}

export default Chat;