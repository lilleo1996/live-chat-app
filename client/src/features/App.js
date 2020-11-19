import React from "react";

import Chat from "./Chat";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Room from "./Room";

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/sign-in" />

      <Route path="/sign-in" exact component={SignIn} />
      <Route path="/sign-up" exact component={SignUp} />
      <Route path="/room-selection" exact component={Room} />
      <Route path="/chat" component={Chat} />
    </Switch>
  </BrowserRouter>
  );
};

export default App;
