import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';

import Body from "./components/Body";
import Welcome from "./view/Welcome";
import Leaderboard from "./view/Leaderboard";
import Breakout from "./view/Breakout";

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
