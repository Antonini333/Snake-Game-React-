import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import AppleLogo from "./assets/appleLogo.png"
import { useInterval } from "usehooks-ts"
import './App.css';

const initialSnake = [[4, 10], [4, 10]];
const scale = 50
const canvasX = 1000
const canvasY = 1000

function App() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [snake, setSnake] = useState(initialSnake)
	const [apple, setApple] = useState<number[]>([14, 10])
	const [direction, setDirection] = useState<number[]>([0, -1])
	const [gameOver, setGameOver] = useState<boolean>(false)
	const [score, setScore] = useState<number>(0)



	return (
		<>
			<div onKeyDown={() => { }}>
				<img id="fruit" src={AppleLogo} alt="fruit" width="30" />
				<canvas className="playArea" ref={canvasRef} width={`${canvasX}px`} height={`${canvasY}px`} />
				{gameOver && <div className="gameOver">Game Over</div>}
				<button className="playButton">
					Play
			</button>
				<div className="scoreBox">
					<h2>Score: {score}</h2>
					<h2>High Score: </h2>
				</div>
			</div>
		</>
	)
}

export default App;
