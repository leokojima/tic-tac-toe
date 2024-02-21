import { useState } from 'react';
import Board from './components/Board';
import HistoryButton from './components/HistoryButton';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const moveNumber = move > 0 ? 'move #' + move : 'game start';
    const description = move === currentMove ? 'You are @ ' + moveNumber : 'Go to ' + moveNumber;

    return <HistoryButton number={move} value={description} onClickMoveTo={() => jumpTo(move)} />
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board currentMove={currentMove} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
