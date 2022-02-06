import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

function Header(props) {
  return (
    <header className="header">
      <ul className="ul">
        <li>
          <h1 className="logo">Breakout</h1>
        </li>
        <li className="link">
          <NavLink to="/">Welcome</NavLink>
        </li>
        <li className="link">
          <NavLink to="/breakout">Breakout</NavLink>
        </li>
        <li className="link">
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;