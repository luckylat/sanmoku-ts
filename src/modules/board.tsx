import React from 'react';
import { Square } from "./square";

type Hand = 'X'|'O'|null;

interface BoardProps{
  squares: Hand[],
  onClick: (arg0: number) => void
}

const Board = (props: BoardProps) => {


  const renderSquare = (i: number) => {
    return (
      <Square value={props.squares[i]} onClick={() => props.onClick(i)} key={i}/>
    );
  }

  return (
    <div>
      {
        Array(3).fill(null).map((_,i) => {
          return (
            <div className="board-row" key={i}>
              {
                Array(3).fill(null).map((_,j) => {
                  return renderSquare(i*3+j)
                })
              }
            </div>
          )
        })
      } 
    </div>
  );
}

export default Board;