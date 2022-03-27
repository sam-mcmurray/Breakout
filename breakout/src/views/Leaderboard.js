import React from "react";
import LeaderList from "../components/elements/LeaderList";

import "./Leaderboard.css";


function Leaderboard() {

  return (
    <div className="content">
      <h1 className="title">Leaderboard</h1>
      <br></br>
      <LeaderList/>
    </div>
  );
}

export default Leaderboard;
