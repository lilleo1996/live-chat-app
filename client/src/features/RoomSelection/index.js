import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import queryString from "query-string";
import axios from 'axios';

import { LIVE_CHAT, JOIN_ROOM } from "constant";
import "./style.scss";

const RoomSelection = ({ location }) => {
  let history = useHistory();
  const [room, setRoom] = useState("");
  const [email, setEmail] = useState("");

  const handleSelectRoom = () => {
    axios.post('http://localhost:5000/room/user', {
      email, room 
    })
    .then(function (response) {
      console.log("response", response)
      if(response.data.success === true) {
        history.push(`/chat?email=${email}&room=${room}`);
      } else {
        history.push(`/room-selection?email=${email}`);
      }
    })
    .catch(function (error) {
      console.log("error", error)
      history.push(`/room-selection?email=${email}`);
    });
  };

  useEffect(() => {
    const { email } = queryString.parse(location.search);
    setEmail(email);
  }, [location.search]);

  return (
    <div className="login">
      <h1 className="login__header">{LIVE_CHAT}</h1>
      <div className="login__box">
        <div>
          <input
            placeholder="Room"
            className="login__input"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <button
          className={
            "login__button login__button--green login__button--small mt-20"
          }
          onClick={handleSelectRoom}
          type="submit"
        >
          {JOIN_ROOM}
        </button>
      </div>
    </div>
  );
};

export default RoomSelection;
