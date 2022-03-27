import React from "react";
import LeaderItem from "./LeaderItem";

import "./LeaderList.css";
import {getLeaderboard} from "../../game/Util";

function LeaderList(props) {
  let leadersList = getLeaderboard()
  console.log(leadersList)

  return (
    <ul className="leader_list">
      {leadersList.map((hiScore) => (
        <LeaderItem className="leader_list"
          key={hiScore.leaderboardId}
          id={hiScore.leaderboardId}
          rank={hiScore.leaderboardId}
          name={hiScore.username}
          level={hiScore.level}
          score={hiScore.score}
        />
      ))}
    </ul>
  );
}

export default LeaderList;
