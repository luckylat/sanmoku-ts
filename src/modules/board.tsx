import React from 'react';
import { Square } from "./square";

type Hand = 'X'|'O'|null;

interface Props{
  squares: Hand[],
  onClick: (arg0: number) => void
}

export default class Board extends React.Component<Props> {

  renderSquare(i: number) {
    return (
      <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} key={i}/>
    );
  }

  render() {
    return (
      <div>
        {
          Array(3).fill(null).map((_,i) => {
            return (
              <div className="board-row" key={i}>
                {
                  Array(3).fill(null).map((_,j) => {
                    return this.renderSquare(i*3+j)
                  })
                }
              </div>
            )
          })
        } 
      </div>
    );
  }
}