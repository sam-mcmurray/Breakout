import React, {useState} from "react";
import NavLinks from "./NavLinks";

import "./Header.css";

function Header(props) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  function openDrawerHandler() {
    setDrawerIsOpen(true);
  }

  return (
    <header className="header">
      <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
      <span/>
      <span/>
      <span/>
    </button>
      <h1 className="logo">Breakout</h1>
      <nav className="main-navigation__header-nav">
        <NavLinks/>
      </nav>
    </header>
  );
}

export default Header;