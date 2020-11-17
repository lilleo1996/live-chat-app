import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

import { LIVE_CHAT, SIGN_UP } from "constant";
import "./style.scss";

const SignUp = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    axios.post('http://localhost:5000/user/sign-up', {
      email, password 
    })
    .then(function (response) {
      if(response.data.success === true) {
        history.push("/");
      } else {
        history.push("/sign-up");
      }
    })
    .catch(function (error) {
      console.log("error", error)
      history.push("/sign-up");
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
          <button className="login__button mt-20 " type="submit" onClick={handleSignUp}>
            {SIGN_UP}
          </button>
      </div>
    </div>
  );
};

export default SignUp;