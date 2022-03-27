import React, {Fragment, useEffect,  useState} from "react";
import {
  BLOCK_HEIGHT,
  BLOCK_WIDTH,
  BLOCKS_START_STATE, checkAllBlocks,
  NewBlocks,
  PADDLE_START_STATE,
  PADDLE_WIDTH
} from "../../game/Level"
import {registerListener} from "../../game/Util";

import Ball from "./Ball";
import Block from "./Block";
import Score from "./Score";
import Lives from "./Lives";
import Paddle from "./Paddle";

import "./Scene.css"

const BALL_START_STATE = ( {
  x: 250,
  y: 430,
  radius: 20,
  dx: 6 * (Math.random() * 2 - 1),
  dy: -6,
});

const UPDATE_EVERY = 1000/60

async function handleLeaderboard(username, level, score) {
  let data = {
    username,
    level,
    score
  }
  const response = await fetch('http://127.0.0.1:5600/api/leaderboard', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  console.log(response)
}

function moveBall(ball) {
  return({...ball,
    x: ball.x + ball.dx,
    y: ball.y + ball.dy
})
}

function movePaddleLeft(paddle) {
  if (paddle.x === 0) {
    return (paddle);
  }
  return ({...paddle, x: paddle.x - paddle.dx})
}

function movePaddleRight(paddle) {
  if (paddle.x + PADDLE_WIDTH === 500) {
    return (paddle);
  }
  return ({...paddle, x: paddle.x + paddle.dx})
}

function ballBlockCollision(ball, block) {
  let distX = Math.abs(ball.x - block.x - BLOCK_WIDTH / 2);
  let distY = Math.abs(ball.y - block.y - BLOCK_HEIGHT / 2);

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


function Scene() {
  const [paddleState, setPaddleState] = useState(PADDLE_START_STATE);
  const [ballState, setBallState] = useState(BALL_START_STATE);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [blocksState, setBlocksState] = useState(BLOCKS_START_STATE);
  const [tick, setTick] = useState(1);
  const [movement, setMovement] = useState("none")
  const [newGame, setNewGame] = useState(false);


  function handleBlocks(blockState, ballState) {
    for (let i = 0; i < blockState.length; i++) {
      let block = blockState[i];
      const {hit, axis} = ballBlockCollision(ballState, block);
      if (hit) {
        if (block.density === 1) {
          setScore((prevScore) => prevScore + 4)
        } else if (block.density === 2) {
          setScore((prevScore) => prevScore + 8)
        } else if (block.density === 3) {
          setScore((prevScore) => prevScore + 12)
        }

        let newDensity = block.density - 1;
        return (blockState.map(e => e === block ? {x: block.x, y: block.y, density: newDensity, key: block.key} : e));
      }
    }
    return (blockState);
  }



  function onKeyDown(event) {
    if (event.key === "ArrowRight" || event.key === "d") {
      setMovement("right")
    } else if (event.key === "ArrowLeft" || event.key === "a") {
      setMovement("left")
    }
    console.log(event.key)
  }

  function onKeyUp(event) {
    setMovement("none")
    console.log(event.key)
  }

  useEffect(() => {
    const unregisterKeydown = registerListener('keydown', onKeyDown)
    const unregisterKeyup = registerListener('keyup', onKeyUp)

    if (movement === "right") {
      setPaddleState((prevState) => movePaddleRight(prevState));
    } else if (movement === "left") {
      setPaddleState((prevState) => movePaddleLeft(prevState));
    }
    return () => {
      unregisterKeydown()
      unregisterKeyup()
    }
  }, [onKeyUp, onKeyDown])

  function ballWallCollision(ball) {
    if (((ball.x + ball.radius) > 500) || ((ball.x - ball.radius) < 0)) {
      return ({...ball, dx: -ball.dx});
    }

    if ((ball.y - ball.radius) < 0) {
      return ({...ball, dy: -ball.dy});
    }

    if ((ball.y + ball.radius) > 520) {
      setLives(lives - 1);
      if (lives - 1 < 0) {
        setNewGame(true);
      }
        return ({
          x: 250,
          y: 450 + 20,
          radius: 20,
          dx: 6 * (Math.random() * 2 - 1),
          dy: -6,
        });
    }
    return ({...ball});
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
    return ({...ball})
  }

  useEffect(() => {
    if (checkAllBlocks(blocksState)) {
      let username = window.sessionStorage.getItem("user")
      window.alert("Congratulations, You have won " + username + "!");
      handleLeaderboard(username,1 ,score)
      setNewGame(true);
    }

    setBallState((prevState) => {
      for (let i = 0; i < blocksState.length; i++) {
        let block = blocksState[i];
        if (block.density <= 0) {
          continue;
        }
        const {hit, axis} = ballBlockCollision(ballState, block);
        if (hit) {
          if (axis === "x") {
            let dx = -prevState.dx
            prevState = {
              ...prevState,
              dx: dx,
            };
          } else if (axis === "y") {
            let dy = -prevState.dy
            prevState = {
              ...prevState,
              dy: dy,
            };
          }
        }
      }
      prevState = ballWallCollision(prevState)
      prevState = ballPaddleCollision(prevState)
      return(moveBall(prevState))
    });
    setBlocksState((prevState) =>
      handleBlocks(prevState, ballState)
    );

    setBallState((prevState) => {
      return(ballPaddleCollision(prevState));
    })

    if (newGame) {
      setBlocksState(BLOCKS_START_STATE)
      setBallState(BALL_START_STATE)
      setLives(3)
      setScore(0)
      setNewGame(false)
    }

    const timerId = setInterval(() => {
      setTick(tick + 1)
    }, UPDATE_EVERY)

    return () => {
      clearInterval(timerId)
      // unregisterKeydown()
      // unregisterKeyup()
    }

  }, [tick, newGame])

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
