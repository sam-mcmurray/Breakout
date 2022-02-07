import React from "react";
import Card from "./Card";

import "./LeaderItem.css"

function LeaderItem(props) {
  return (
    <Card className="list-item__content">
      <h1>{props.id}</h1>
      <h1>{props.name}</h1>
      <h1>{props.level}</h1>
      <h1>{props.score}</h1>
    </Card>
  );
}

export default LeaderItem;
