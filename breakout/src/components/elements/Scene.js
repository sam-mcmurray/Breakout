import React, {Fragment, useEffect,  useState} from "react";

import Ball from "./Ball";
import {BLOCK_HEIGHT, BLOCK_WIDTH, BLOCKS_START_STATE, PADDLE_START_STATE} from "../../game/Level"
import Block from "./Block";

import "./Scene.css"
import {registerListener} from "../../game/Util";

import Score from "./Score";
import Lives from "./Lives";
import Paddle from "./Paddle";

const BALL_START_STATE = ( {
  x: 250,
  y: 450,
  radius: 20,
  dx: 6 * (Math.random() * 2 - 1),
  dy: -6,
});

const UPDATE_EVERY = 1000 / 60

function movePaddleLeft(paddle) {
  if (paddle.x === 0) {
    return (paddle);
  }
  return ({...paddle, x: paddle.x - paddle.dx})
}

function movePaddleRight(paddle) {
  if (paddle.x === 500) {
    return (paddle);
  }
  return ({...paddle, x: paddle.x + paddle.dx})
}

function moveBall(ball) {
  console.log("moveball")
  return({...ball,
    x: ball.x + ball.dx,
    y: ball.y + ball.dy
})
}



function Scene() {
  const [paddleState, setPaddleState] = useState(PADDLE_START_STATE);
  const [ballState, setBallState] = useState(BALL_START_STATE);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [blocksState, setBlocksState] = useState(BLOCKS_START_STATE);
  const [tick, setTick] = useState(1);
  const [leftArrow, setLeftArrow] = useState(false);
  const [rightArrow, setRightArrow] = useState(false);

  function onKeyDown(event) {
    if (event.key === "ArrowRight") {
      setRightArrow(true)
      console.log(rightArrow)
    } else if (event.key === "ArrowLeft") {
      setLeftArrow(true)
      console.log(leftArrow)
    }
    console.log(event.key)
  }

  function onKeyUp(event) {
    if (event.key === "arrowRight" || event.key === 'd') {
      setRightArrow(false);
      console.log(rightArrow)
    } else if (event.key === "arrowLeft" || event.key === 'a') {
      setLeftArrow(false)
      console.log(leftArrow)
    }
  }


  function ballWallCollision(ball) {
    if (((ball.x + ball.radius) > 500) || ((ball.x - ball.radius) < 0)) {
      return ({...ball, dx: -ball.dx});
    }

    if ((ball.y - ball.radius) < 0) {
      return ({...ball, dy: -ball.dy});
    }

    if ((ball.y + ball.radius) > 520) {
      setLives(lives - 1);
        return ({
          x: 250,
          y: 450 + 20,
          radius: 20,
          dx: 6 * (Math.random() * 2 - 1),
          dy: -6,
        });
    }
    return ({...ball})
  }

  function ballBlockCollision(ball, block) {
    let distX = Math.abs(ball.x - block.x - BLOCK_WIDTH / 2);
    let distY = Math.abs(ball.y - block.y - BLOCK_HEIGHT / 2);

    console.log(distX)

    if (distX > BLOCK_WIDTH / 2 + ball.radius) {
      // return false;
      return {
        hit: false,
      };
    }
    if (distY > BLOCK_HEIGHT / 2 + ball.radius) {
      // return false;
      return {
        hit: false,
      };
    }

    if (distX <= BLOCK_WIDTH / 2) {
      // return true;
      return {
        hit: true,
        axis: "y",
      };
    }
    if (distY <= BLOCK_HEIGHT / 2) {
      // return true;
      return {
        hit: true,
        axis: "x",
      };
    }

    // also test for corner collisions
    let dx = distX - block.width / 2;
    let dy = distY - block.height / 2;
    // return dx * dx + dy * dy <= circle.rad * circle.rad;
    return {
      hit: dx * dx + dy * dy <= ball.radius * ball.radius,
      axis: "x",
    };
  }

  function ballPaddleCollision(ball) {
    if (ball.y > paddleState.y && ball.y < paddleState.y + paddleState.height
      && ball.x > paddleState.x && ball.x < paddleState.x + paddleState.width) {
      let collidePoint = ball.x - (paddleState.x + paddleState.width / 2);

      collidePoint = collidePoint / (paddleState.width / 2);
      let angle = collidePoint * (Math.PI / 3);
      return ({...ball,
        dx: 6 * Math.sin(angle),
        dy: - 6 * Math.cos(angle)
      })
    }
    return (ball)
  }




  useEffect(() => {
    let newBallState = ballState;
    setBlocksState((blockState) => {
      console.log(blockState)
      let newBlocks = [{x: blockState[0].x, y: blockState[0].y, density: blockState[0].density}];
      for (let i = 0; i < blockState.length; i++) {
        let block = blockState[i];
        const {hit, axis} = ballBlockCollision(ballState, block);
        if (hit) {
          if (i === 0) {
            newBlocks[i].density = block.density - 1;
          }
          let newDensity = block.density - 1;
          console.log(hit)
          newBlocks.push({x: block.x, y: block.y, density: newDensity});
          console.log(block)
          console.log(blockState[i])
          console.log(newBlocks)

          if (axis === "x") {
            newBallState = ({x: ballState.x,
              y: ballState.y,
              radius: ballState.radius,
              dx: -ballState.dx,
              dy: ballState.dy,
            });
          }
          if (axis === "y") {
            newBallState = ({x: ballState.x,
              y: ballState.y,
              radius: ballState.radius,
              dx: ballState.dx,
              dy: -ballState.dy,
            });
          }

          console.log(blockState)
        } else if (i !== 0 ) {
          newBlocks.push(block)
        }
      }
      console.log(newBlocks);
      return (newBlocks);
    })

    setBallState((prevState) => {
      return(newBallState);
    })

    setBallState((prevState) => {
      return(moveBall(prevState));
    });

    console.log(ballState)
    setBallState((prevState) => {
      return(ballPaddleCollision(prevState));
    })
    setBallState((prevState) => {
      return(ballWallCollision(prevState));
    })

    console.log(ballState)
    const timerId = setInterval(() => {
      setTick(tick + 1)
    }, UPDATE_EVERY)
    const unregisterKeydown = registerListener('keydown', onKeyDown)
    const unregisterKeyup = registerListener('keyup', onKeyUp)
    return () => {
      clearInterval(timerId)
      unregisterKeydown()
      unregisterKeyup()
    }

  }, [tick])

  return (
    <Fragment>
      <svg
        className="svg-content"
        version="1.1"
        viewBox="0 0 500 500"
        preserveAspectRatio="xMaxYMax meet"
      >
        <Score unit={20} score={score}/>
        <Lives unit={20} lives={lives}/>
        {blocksState.map(({density, x, y, key}) => (
          <Block
            density={density}
            key={key}
            x={x}
            y={y}
          />))}
        <Ball
          x={ballState.x}
          y={ballState.y}
          radius={ballState.radius}
        />
        <Paddle
          x={paddleState.x}
        />
      </svg>
    </Fragment>
  );
}

export default Scene;
