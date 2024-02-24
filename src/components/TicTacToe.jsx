import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import Sounds from "../sounds";

const PLAYER_X = "X";
const PLAYER_O = "O";

const resetSound = new Audio(Sounds["reset"]);
const xClickSound = new Audio(Sounds["x-click"]);
const oClickSound = new Audio(Sounds["o-click"]);
const xWinSound = new Audio(Sounds["x-wins"]);
const oWinSound = new Audio(Sounds["o-wins"]);
const gameOverSound = new Audio(Sounds["gameover"]);

const winCombinations = [
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function checkWinner(tiles, setStrikeClass, setGameState) {
  for (const { combo, strikeClass } of winCombinations) {
    const [a, b, c] = combo;
    const [tileA, tileB, tileC] = [tiles[a], tiles[b], tiles[c]];

    if (tileA && tileA === tileB && tileA === tileC) {
      setStrikeClass(strikeClass);

      if (tileA === PLAYER_X) {
        setGameState(GameState.playerXWins);
      } else if (tileA === PLAYER_O) {
        setGameState(GameState.playerOWins);
      }

      return;
    }
  }

  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if (areAllTilesFilledIn) {
    setGameState(GameState.draw);
  }
}

function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState(null);
  const [gameState, setGameState] = useState(GameState.inProgress);

  const handleTileClick = (index) => {
    if (gameState !== GameState.inProgress) {
      return;
    }

    if (tiles[index]) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    if (playerTurn === PLAYER_X) {
      xClickSound.play();
      setPlayerTurn(PLAYER_O);
    } else {
      oClickSound.play();
      setPlayerTurn(PLAYER_X);
    }
  };

  const handleReset = () => {
    setTiles(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass(null);
    setGameState(GameState.inProgress);
    resetSound.play();
  };

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  useEffect(() => {
    switch (gameState) {
      case GameState.playerXWins:
        xWinSound.play();
        break;
      case GameState.playerOWins:
        oWinSound.play();
        break;
      case GameState.draw:
        gameOverSound.play();
        break;
      default:
    }
  }, [gameState]);

  return (
    <>
      <div>
        <h1>Tic Tac Toe</h1>
        <Board
          tiles={tiles}
          onTileClick={handleTileClick}
          playerTurn={playerTurn}
          strikeClass={strikeClass}
        />
        <GameOver gameState={gameState} />
        <Reset gameState={gameState} onReset={handleReset} />
      </div>
    </>
  );
}

export default TicTacToe;
