import {NavLink} from "react-router-dom";
import React from "react";

import "./NavLinks.css"

function NavLinks() {
  return (
    <ul className="ul">
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
  );
}

export default NavLinks;