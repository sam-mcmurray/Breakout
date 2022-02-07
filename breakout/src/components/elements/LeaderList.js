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
    <ul>
      {props.items.map((hiScore) => (
        <LeaderItem
          key={hiScore.rank}
          id={hiScore.id}
          name={hiScore.name}
          level={hiScore.level}
          score={hiScore.score}
        />
      ))}
    </ul>
  );
}

export default LeaderList;
