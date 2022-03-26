import React from "react";

function Ball(state) {
  return (
    <circle className='ball' cx={state.x} cy={state.y} r={state.radius}/>
    );
}

export default Ball;