import React, { ChangeEvent, useRef, useState } from 'react';

import { useInterval } from "usehooks-ts"
import './App.css';

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [ snake, setSnake ] = useState<[number, number][]>([ [ 4, 10 ], [ 4, 10 ] ])
	const [ apple, setApple ] = useState<number[]>([ 14, 10 ])
	const [ direction, setDirection ] = useState<number[]>([ 0, -1 ])
	const [ gameOver, setGameOver ] = useState<boolean>(false)
	const [ score, setScore ] = useState<number>(0)
  
  return (
    <>
      <div className="main-container">
			<canvas className="play-area" ref={canvasRef}  />
			<button onClick={() => {}} className="playButton">
				Play
			</button>
			<div className="scoreBox">
				<h2>Score: </h2>
				<h2>High Score: </h2>
			</div>
		</div>
    </>
  )
}

export default App;
