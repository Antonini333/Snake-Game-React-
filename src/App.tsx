import React, { ChangeEvent, useRef, useState } from 'react';
import logo from './logo.svg';
import { useInterval } from "usehooks-ts"
import './App.css';

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [ snake, setSnake ] = useState<any>()
	const [ apple, setApple ] = useState<any>()
	const [ direction, setDirection ] = useState<any>()
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
