import { useState } from 'react';
import Board from './components/Board';
import HistoryButton from './components/HistoryButton';

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const winner = calculateWinner(currentSquares);

  let status;
  if(winner) {
    status = 'Winner: ' + winner;
  } else if(currentMove === currentSquares.length) {
    status = 'DRAW!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleClick(i) {
    if(currentSquares[i] || winner) {
      return;
    }

    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    handlePlay(nextSquares);
  }

  const moves = history.map((squares, move) => {
    const moveNumber = move > 0 ? 'move #' + move : 'game start';
    const description = move === currentMove ? 'You are @ ' + moveNumber : 'Go to ' + moveNumber;

    return <HistoryButton key={move} value={description} onClick={() => jumpTo(move)} />
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board status={status} squares={currentSquares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const winSituations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(let i = 0; i < winSituations.length; i++) {
    const [a, b, c] = winSituations[i];

    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
