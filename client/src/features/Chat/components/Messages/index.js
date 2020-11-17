import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import ReactEmoji from "react-emoji";
import "./style.scss";

const Messages = ({ messages, email }) => {
  const trimmedName = email.trim().toLowerCase();
  const renderMessage = (message) => {
    const { user, text } = message;
    let isSentByCurrentUser = false;

    if (user === trimmedName) {
      isSentByCurrentUser = true;
    }
    return isSentByCurrentUser ? (
      <div className="message message--justify-end">
        <p className="message__sent-text pr-10">{trimmedName}</p>
        <div className="message__box message--bg-blue">
          <p className="message__text message--color-white">
            {ReactEmoji.emojify(text)}
          </p>
        </div>
      </div>
    ) : (
      <div className="message message--justify-start">
        <div className="message__box message--bg-light">
          <p className="message__text message--color-dark">
            {ReactEmoji.emojify(text)}
          </p>
        </div>
        <p className="message__sent-text pl-10 ">{user}</p>
      </div>
    );
  };

  return (
    <ScrollToBottom className="messages">
      {messages.map((message, index) => (
        <div key={index}>{renderMessage(message)}</div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
