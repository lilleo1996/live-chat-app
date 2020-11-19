import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

import { LIVE_CHAT, SIGN_UP, SIGN_UP_API } from "constants/variables";

const SignUp = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFailure, setIsFailure] = useState(false);

  const handleSignUp = () => {
    axios.post(SIGN_UP_API, {
      email, password 
    })
    .then(function (response) {
      if(response.data.success === true) {
        history.push(`/sign-in?email=${email}&password=${password}`);
      } else {
        history.push("/sign-up");
        setIsFailure(true);
      }
    })
    .catch(function (error) {
      console.log("error", error)
      history.push("/sign-up");
      setIsFailure(true);
    });
  };

  return (
    <div className="sign-up">
      <h1 className="sign-up__header">{LIVE_CHAT}</h1>
      <div className="sign-up__box">
        <div>
          <input
            placeholder="Email"
            className="sign-up__input"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Mật khẩu"
            className="sign-up__input mt-20"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="sign-up__button mt-20 " type="submit" onClick={handleSignUp}>
          {SIGN_UP}
        </button>
        <div className="sign-in__fail-text">{isFailure ? 'Email đã tồn tại' : ''}</div>
      </div>
    </div>
  );
};

export default SignUp;
