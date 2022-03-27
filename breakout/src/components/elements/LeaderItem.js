import React from "react";
import Card from "./Card";

import "./LeaderItem.css"

function LeaderItem(props) {
  return (
    <li>
      <Card className="leader-item__content">
        <h1 className="h1">{props.username}</h1>
        <h2>TOP LEVEL: {props.level}</h2>
        <h3>TOP SCORE: {props.score}</h3>
      </Card>
    </li>

  );
}

export default LeaderItem;
