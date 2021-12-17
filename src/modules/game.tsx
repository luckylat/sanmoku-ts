import React,{ useState } from 'react';
import Board from "./board";

import { calculateWinner } from "./calclatewinner";

const Game = () => {
  const [history, setHistory] = useState([{squares: Array(9).fill(null),col: 0, row: 0}]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);



  const handleClick = (i: number) => {
    const historyData = history.slice(0, stepNumber + 1);
    const current = historyData[historyData.length-1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(historyData.concat([{
      squares: squares,
      col: (i-(i%3))/3+1,
      row: i%3+1
    }]));
    setStepNumber(historyData.length);
    setXIsNext(!xIsNext);

  }

  const jumpTo = (step : number) => {
    setStepNumber(step);
    setXIsNext((step%2) === 0);
  }

  //太字にする
  
  const historyData = history;
  const current = historyData[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = historyData.map((step,move) => {
    const desc = move ? `Go to move #${move} (${step.col},${step.row})` : 'Go to game start';
    return (
      <li key={move}>
        <button className={stepNumber === move ? "button-active":""} onClick={() => {
          jumpTo(move);
          console.log(history);
        }}>
          {desc}
        </button>
      </li>
    )
  });
  const status  = winner ? `Winner is ${winner} !!` : `Next player is ${xIsNext ? 'X' : '0'}`;
  
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
  

}

export default Game