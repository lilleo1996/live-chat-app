import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import axios from 'axios';

import { URL, ADD_MESSAGE_API, GET_ROOM_API } from "constants/variables";
import Messages from "./components/Messages.js";
import Header from "./components/Header.js";
import MessageEntry from "./components/MessageEntry.js";

let socket;

const Chat = ({ location }) => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { email, room } = queryString.parse(location.search);
    socket = io(URL);
    setRoom(room);
    setEmail(email);
   
    socket.emit("join", { email, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [URL, location.search]);

  useEffect(() => {
    const { room } = queryString.parse(location.search);
    axios.get(`${GET_ROOM_API}${room}`)
    .then(function (response) {
      setMessages((messages) => [...messages, ...response.data.data.messages]);  
    })
    .catch(function (error) {
      console.log("error", error)
    });

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
      axios.post(ADD_MESSAGE_API, {
        room, email, text: message
      })
      .then(function (response) {
        console.log("response", response)   
      })
      .catch(function (error) {
        console.log("error", error)
      });
    }
  };

  return (
    <div className="chat">
      <div className="chat__box">
        <Header room={room} />
        <Messages messages={messages} email={email} />
        <MessageEntry
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
