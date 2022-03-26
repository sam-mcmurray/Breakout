import {BLOCK_HEIGHT, BLOCK_WIDTH} from "../../game/Level"
export const RED_BLOCK_DENSITY = 3;
export const RED_BLOCK_COLOR = "#a50a76";
export const BLUE_BLOCK_DENSITY = 2;
export const BLUE_BLOCK_COLOR = "#007171";
export const YELLOW_BLOCK_DENSITY = 1;
export const YELLOW_BLOCK_COLOR = "#D56202FF";

function Block(state) {
  let color = RED_BLOCK_COLOR;
  if (state.density === YELLOW_BLOCK_DENSITY) {
    color = YELLOW_BLOCK_COLOR;
  } else if (state.density === BLUE_BLOCK_DENSITY) {
    color = BLUE_BLOCK_COLOR;
  } else if (state.density === RED_BLOCK_DENSITY){
    color = RED_BLOCK_COLOR
  } else {
    return null;
  }

  return (
    <rect
      className='block'
      fill={color}
      x={state.x}
      y={state.y}
      stroke="#333333"
      width={BLOCK_WIDTH}
      height={BLOCK_HEIGHT}/>
  );
}

export default Block;
