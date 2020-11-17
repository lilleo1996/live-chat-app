import React from "react";

import Chat from "features/Chat";
import SignIn from "features/SignIn";
import SignUp from "features/SignUp";
import RoomSelection from "features/RoomSelection";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={SignIn} />
      <Route path="/sign-up" exact component={SignUp} />
      <Route path="/room-selection" exact component={RoomSelection} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
};

export default App;
