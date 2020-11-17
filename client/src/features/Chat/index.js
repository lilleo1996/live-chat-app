import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import axios from 'axios';

import { URL } from "constant";
import TextContainer from "./components/TextContainer";
import Messages from "./components/Messages";
import InfoBar from "./components/InfoBar";
import Input from "./components/Input";

import "./style.scss";

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
    // axios.post('http://localhost:5000//room/messages', {
    //   email, room 
    // })
    // .then(function (response) {
    //   console.log("response", response)
    //   if(response.data.success === true) {
    //     history.push(`/chat?email=${email}&room=${room}`);
    //   } else {
    //     history.push(`/room-selection?email=${email}`);
    //   }
    // })
    // .catch(function (error) {
    //   console.log("error", error)
    //   history.push(`/room-selection?email=${email}`);
    // });
    socket.emit("join", { email, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [URL, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
    console.log("Chat -> message", message)
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
    }
  };

  return (
    <div className="chat">
      <div className="chat-box">
        <InfoBar room={room} />
        <div className="chat-info">
          <TextContainer users={users} />
          <Messages messages={messages} email={email} />
        </div>
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
