import React, {useEffect, useRef} from "react";


import {BallMovement} from "../../game/Ball";
import Data from "../../game/Data";

import "./Scene.css";
import WallCollision from "../../game/Util";

function Scene(props) {
  const canvasRef = useRef(null);
  useEffect(() =>{

    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#3b3939";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      let {ballObj, player} = Data;

      BallMovement(ctx, ballObj);
      WallCollision(ballObj, canvas, player);

      requestAnimationFrame(render);
    }
    render();
  }, [])


  return(<canvas className="scene" height={props.height} width={props.width} ref={canvasRef}/>);
}

export default Scene;
