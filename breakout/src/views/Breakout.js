import React from "react";

import Scene from "../components/elements/Scene";
import RegisterName from "../components/elements/RegisterName";

import "./Breakout.css";


function Breakout(props) {


  let user = window.sessionStorage.getItem("user");
  let hasName = false;
  if (user != null) {
    hasName = true
  }

  return (
    <div className="scene__container">
      {hasName ? <Scene/> : <RegisterName/> }
    </div>

  );
}

export default Breakout;
