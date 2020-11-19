import React from "react";

const Input = ({ setMessage, sendMessage, message }) => (
  <div className="message-entry">
    <input
      className="message-entry__input"
      type="text"
      placeholder="Nhập tin nhắn ..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <button className="message-entry__button" onClick={(e) => sendMessage(e)}>
      Gửi
    </button>
  </div>
);

export default Input;
