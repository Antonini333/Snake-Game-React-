import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import AppleLogo from "./assets/appleLogo.png"
import { useInterval } from "usehooks-ts"
import './App.css';

const initialSnake = [[4, 10], [4, 10]];
const scale = 50
const canvasX = 800
const canvasY = 800

function App() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const [snake, setSnake] = useState(initialSnake)
	const [apple, setApple] = useState<number[]>([14, 10])
	const [direction, setDirection] = useState<number[]>([0, -1])
	const [gameOver, setGameOver] = useState<boolean>(false)
	const [ delay, setDelay ] = useState<number | null>(1500)
	const [score, setScore] = useState<number>(0)

	useEffect(() => {
		let fruit = document.getElementById("fruit") as HTMLCanvasElement
		if (canvasRef.current) {
			const canvas = canvasRef.current
			const ctx = canvas.getContext("2d")
			if (ctx) {
				ctx.setTransform(scale, 0, 0, scale, 0, 0)
				ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
				ctx.fillStyle = "#a3d001"
				snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1))
				ctx.drawImage(fruit, apple[0], apple[1], 1, 1)
			}
		}
	}, [snake]);

	useInterval(() => !gameOver? runGame() : null, delay)

	const runGame = () => {
		const newSnake = [...snake]
		const newSnakeHead = [newSnake[0][0] + direction[0], newSnake[0][1] + direction[1]]
		newSnake.unshift(newSnakeHead)
		if (checkCollision(newSnakeHead)) {
			handleSetScore()
			setGameOver(true)
		}
		if (!appleAte(newSnake)) {
			newSnake.pop()
		}
		setSnake(newSnake)
	}

	const changeDirection = (e: React.KeyboardEvent<HTMLDivElement>) => {
		switch (e.key) {
			case "ArrowLeft":
				setDirection([-1, 0])
				break
			case "ArrowUp":
				setDirection([0, -1])
				break
			case "ArrowRight":
				setDirection([1, 0])
				break
			case "ArrowDown":
				setDirection([0, 1])
				break
		}
	}

	const checkCollision = (head: number[]) => {
		for (let i = 0; i < head.length; i++) {
			if (head[i] < 0 || head[i] * scale >= canvasX) return true
		}
		for (const s of snake) {
			if (head[0] === s[0] && head[1] === s[1]) return true
		}
		return false
	}

	const appleAte = (newSnake: number[][]) => {
		let coord = apple.map(() => Math.floor(Math.random() * canvasX / scale))
		if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
			let newApple = coord
			setScore(score + 1)
			setApple(newApple)
			return true
		}
		return false
	}

	function handleSetScore() {
		if (score > Number(localStorage.getItem("snakeScore"))) {
			localStorage.setItem("snakeScore", JSON.stringify(score))
		}
	}

	const play = () => {
		setSnake(initialSnake)
		setApple([14, 10])
		setDirection([ 1, 0 ])
		setDelay(1500)
		setScore(0)
		setGameOver(false)
	}

	return (
	
			<div tabIndex={0} style={{height: "100vh", width:"100vw"}} onKeyDown={(e) => { changeDirection(e)}}>
				<canvas className="playArea" ref={canvasRef} width={`${canvasX}px`} height={`${canvasY}px`}>
				<img id="fruit" src={AppleLogo} alt="fruit" width="30" />
				
				</canvas>
				{gameOver && <div className="gameOver">Game Over</div>}
				<button className="playButton" onClick={play}>
					Play
			</button>
				<div className="scoreBox">
					<h2>Score: {score}</h2>
					<h2>High Score: {localStorage.getItem("snakeScore")}</h2>
				</div>
			</div>

	)
}

export default App;
