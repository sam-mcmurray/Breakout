import React, {useEffect, useRef, useState} from "react";

import getLevel from "../game/Level";
import Scene from "../components/elements/Scene";

import {registerListener} from "../game/Util";

import "./Breakout.css";

function Breakout(props) {
  const sceneContainer = useRef();
  const [size, setSize] = useState();
  const [canvas, setCanvas] = useState();

  useEffect(() => {
    const onResize = () => {
      const {width, height} = sceneContainer.current.getBoundingClientRect();
      setSize({width, height});
      setCanvas(document.querySelector("canvas"));
    }
    const unregisterResizeListener = registerListener('resize', onResize);
    onResize();
    return unregisterResizeListener;
  }, []);

  const level = getLevel(1, 3);
  console.log(level);
  return (
    <div className="scene__container" ref={sceneContainer}>
      {size && <Scene {...size} {...canvas}/>}
    </div>

  );
}

export default Breakout;
