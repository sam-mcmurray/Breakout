import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';

import Body from "./components/layout/Body";
import Welcome from "./views/Welcome";
import Leaderboard from "./views/Leaderboard";
import Breakout from "./views/Leaderboard";

function App() {
  return (
    <Routes>
      <Route element={<Body />}>
        <Route path="/" exact element={<Welcome />} />
        <Route path="/breakout" element={<Breakout />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
    </Routes>
  );
}

export default App;
