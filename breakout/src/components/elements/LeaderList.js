import React, {useEffect, useState} from "react";
import LeaderItem from "./LeaderItem";

import "./LeaderList.css";

function LeaderList(props) {
  const [listState, setListState] = useState([]);

    useEffect(() => {
      const fetchLeaderboard = async () => {
        let rawData = await fetch('http://localhost:5600/api/leaderboard')
        const leaderList = await (rawData.json());
        setListState(leaderList);
      };
      fetchLeaderboard();
    }, []);



  if (listState === []) {
    return (
      <div>
        <h1>NO SCORES YET</h1>
      </div>
    )
  }

  return (
    <ul className="leader_list">
      {listState.map((hiScore) => (
        <LeaderItem className="leader_list"
          key={hiScore.leaderboardId}
          id={hiScore.leaderboardId}
          name={hiScore.username}
          level={hiScore.level}
          score={hiScore.score}
        />
      ))}
    </ul>
  );
}

export default LeaderList;
