import React from "react";

import closeIcon from "assets/icons/closeIcon.png";

const InfoBar = ({ room }) => (
  <div className="header">
    <div className="header__left">
      <h3>{room}</h3>
    </div>
    <div className="header__right">
      <a href="/">
        <img className="header__img" src={closeIcon} alt="close icon" />
      </a>
    </div>
  </div>
);

export default InfoBar;
