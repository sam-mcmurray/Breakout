import React from "react";
import LeaderList from "../components/elements/LeaderList";

import "./Leaderboard.css";
import {getLeaderboard} from "../game/Util";

function Leaderboard() {
  let leaderList = getLeaderboard()

  console.log(leaderList)
  return (
    <div className="content">
      <h1 className="title">High Scores</h1>
      <br></br>
      <LeaderList/>
    </div>

  );
}

export default Leaderboard;
