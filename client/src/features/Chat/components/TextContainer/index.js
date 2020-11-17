import React from "react";

import onlineIcon from "assets/icons/onlineIcon.png";

import "./style.scss";

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {users ? (
      <div>
        <h3>People currently chatting:</h3>
        <div className="activeContainer">
          <h4>
            {users.map(({ email }) => (
              <div key={email} className="activeItem">
                {email}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h4>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
