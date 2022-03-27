import {
  BLUE_BLOCK_DENSITY,
  RED_BLOCK_DENSITY,
  YELLOW_BLOCK_DENSITY
} from "../components/elements/Block";


export const SCENE_SIZE = 500;
export const ROWS = 6;
export const COLUMNS = 10;
export const BLOCK_HEIGHT = (SCENE_SIZE / 3) / ROWS;
export const BLOCK_WIDTH = SCENE_SIZE / COLUMNS;

export const PADDLE_WIDTH = SCENE_SIZE / 4
export const PADDLE_Y = 450;

export const PADDLE_START_STATE = {
  x: 250, dx:0.25, y:PADDLE_Y, width: PADDLE_WIDTH, height: BLOCK_HEIGHT
};


export const BLOCKS_START_STATE = () => {
  let redCount = 19;
  let blueCount = 20;
  let yellowCount = 20;
  let key = 0;
  let blocks = [{
    density: 3,
    x: 0,
    y: 50,
    key: 0,
  },]
  let y = 50;
  for (let i = 0; i < ROWS; i++) {
    let x = 0;
    for (let j = 0; j < COLUMNS; j++) {
      let density = 0;
      if (i === 0 && j === 0) {
        x += BLOCK_WIDTH;
        continue;
      } else if (redCount > 0) {
        density = RED_BLOCK_DENSITY;
        redCount--;
      } else if (blueCount > 0) {
        density = BLUE_BLOCK_DENSITY
        blueCount--;
      } else if (yellowCount > 0) {
        density = YELLOW_BLOCK_DENSITY
      }
      key++;
      blocks.push({
        density,
        x,
        y,
        key,
      });
      console.log(blocks)

      x += BLOCK_WIDTH;
    }
    y += BLOCK_HEIGHT;
  }
  console.log(blocks);
  return blocks;
}

export function checkAllBlocks(blocks) {
  for (let block in blocks) {
    if (block.density > 0) {
      return false;
    }
  }
  return false
}
