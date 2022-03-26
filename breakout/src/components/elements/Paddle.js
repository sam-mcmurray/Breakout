import React from "react";
import {BLOCK_HEIGHT, SCENE_SIZE} from "../../game/Level";

export const PADDLE_WIDTH = SCENE_SIZE / 4
export const PADDLE_Y = 470;

function Paddle(state) {
  return (
    <rect className='paddle'
          fill="#a50a76"
          x={state.x}
          y={PADDLE_Y}
          width={PADDLE_WIDTH}
          height={BLOCK_HEIGHT} />
  )

}
export default Paddle;
