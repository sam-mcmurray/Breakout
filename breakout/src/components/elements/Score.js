import React from 'react'

function Score(state) {
  return (
    <text x={state.unit} y={state.unit * 1} fontSize={state.unit} className='level'>Score: {state.score}
    </text>);
}

export default Score;