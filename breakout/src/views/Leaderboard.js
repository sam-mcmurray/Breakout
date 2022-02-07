import React, { Fragment } from "react";
import LeaderList from "../components/elements/LeaderList";

function Leaderboard() {
  const leadersList = [
    {
      id: 'p1',
      rank: 1,
      name: 'Sam',
      level: 3,
      score: 400,

    },
    {
      id: 'p4',
      rank: 2,
      name: 'John',
      level: 1,
      score: 400,

    },
    {
      id: 'p2',
      rank: 3,
      name: 'Tim',
      level: 2,
      score: 400,

    },
  ];

  return (
    <Fragment>
      <h1>High Scores</h1>
      <LeaderList items={leadersList} />
    </Fragment>

  );
}

export default Leaderboard;
