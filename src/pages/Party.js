import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PartyHome from "./ChatHome.js";
import Chat from '../pages/Chat';
import PartyRoom from "../components/ChatRoom";
import PlayerPage from '../pages/PlayerPage';

function Party() {
  return (
    <Router>
      <Switch>
        <Route exact path="/party" component={PartyHome} />
        <Route exact path="/party/:roomId" component={PartyRoom} />
        <Route exact path="/player" component={PlayerPage}/>
        <Route exact path="/chat" component={Chat}/>
      </Switch>
    </Router>
  );
}

export default Party;