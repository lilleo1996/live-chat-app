import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import { LIVE_CHAT, SIGN_IN, SIGN_UP } from "constant";
import "./style.scss";

const SingIn = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    axios.post('http://localhost:5000/user/sign-in', {
      email, password 
    })
    .then(function (response) {
      console.log("response", response);
      if(response.data.success === true) {
        history.push(`/room-selection?email=${email}`);
      } else {
        history.push("/");
      }
    })
    .catch(function (error) {
      console.log("error", error)
      history.push("/");
    });
  };

  return (
    <div className="login">
      <h1 className="login__header">{LIVE_CHAT}</h1>
      <div className="login__box">
        <div>
          <input
            placeholder="Email"
            className="login__input"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            className="login__input mt-20"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div> 
        <button className="login__button mt-20 " type="submit" onClick={handleSignIn}>
          {SIGN_IN}
        </button>
        <Link to={`/sign-up`}>
          <button
            className={
              "login__button login__button--green login__button--small mt-40"
            }
            type="submit"
          >
            {SIGN_UP}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingIn;