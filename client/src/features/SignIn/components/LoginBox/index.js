import React from "react";

import { SIGN_IN, SIGN_UP } from "constant";
import "./style.scss";

const LoginBox = () => {
  return (
    <div className="login-box">
      <div>
        <input
          placeholder="Name"
          className="login-box__input"
          type="text"
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Room"
          className="login-box_input mt-20"
          type="text"
          onChange={(event) => setRoom(event.target.value)}
        />
      </div>
      <Link
        onClick={(e) => (!email || !room ? e.preventDefault() : null)}
        to={`/chat?email=${email}&room=${room}`}
      >
        <button className="login-box__button mt-20 " type="submit">
          {SIGN_IN}
        </button>
      </Link>
      <Link
        onClick={(e) => (!email || !room ? e.preventDefault() : null)}
        to={`/chat?email=${email}&room=${room}`}
      >
        <button
          className={
            "login-box__button login-box__button--green login-box__button--small mt-40"
          }
          type="submit"
        >
          {SIGN_UP}
        </button>
      </Link>
    </div>
  );
};

export default LoginBox;
