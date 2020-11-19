import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import axios from 'axios';

import { LIVE_CHAT, JOIN_ROOM } from "constants/variables";

const RoomSelection = ({ location }) => {
  let history = useHistory();
  const [room, setRoom] = useState("");
  const [email, setEmail] = useState("");

  const handleSelectRoom = () => {
    axios.post('http://localhost:5000/rooms/user', {
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
    <div className="room">
      <h1 className="room__header">{LIVE_CHAT}</h1>
      <div className="room__box">
        <div>
          <input
            placeholder="Nhập phòng ..."
            className="room__input"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <button
          className={
            "room__button mt-20"
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
