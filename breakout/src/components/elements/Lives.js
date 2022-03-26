import React from 'react'

function Lives(state) {
  return (
    <text x={state.unit * 6} y={state.unit} fontSize={state.unit} className='lives'>Lives: {state.lives}
    </text>);
}

export default Lives;