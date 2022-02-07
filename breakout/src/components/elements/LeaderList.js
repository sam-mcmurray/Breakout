import React from "react";
import LeaderItem from "./LeaderItem";

import "./LeaderList.css";

function LeaderList(props) {
  if (props.items.length === 0) {
    return (
      <div>

      </div>
    );
  }

  return (
    <ul className="leader_list">
      {props.items.map((hiScore) => (
        <LeaderItem className="leader_list"
          key={hiScore.rank}
          id={hiScore.id}
          rank={hiScore.rank}
          name={hiScore.name}
          level={hiScore.level}
          score={hiScore.score}
        />
      ))}
    </ul>
  );
}

export default LeaderList;
