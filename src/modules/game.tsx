import React from 'react';
import Board from "./board";

import { calculateWinner } from "./calclatewinner";

type Hand = 'X'|'O'|null;
interface Props{
  history?: {
    squares: Hand[]
    col: number
    row: number
  }[]
  stepNumber?: number
  xIsNext?: boolean
}

interface State{
  history: {
    squares: Hand[]
    col: number
    row: number
  }[]
  stepNumber: number
  xIsNext: boolean
}


export default class Game extends React.Component<Props,State>{
  constructor(props: Props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        col: 0,
        row: 0,
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        col: (i-(i%3))/3+1,
        row: i%3+1,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step : number){

    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })

    //太字にする

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step,move) => {
      const desc = move ? `Go to move #${move} (${step.col},${step.row})` : 'Go to game start';
      return (
        <li key={move}>
          <button className={this.state.stepNumber === move?"button-active":""} onClick={() => {
            this.jumpTo(move);
            console.log(history);
          }}>
            {desc}
          </button>
        </li>
      )
    })
    let status;
    if(winner){
      status = 'Winner is : ' + winner + '!!';
    }else{
      status = 'Next player is : ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}