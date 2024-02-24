import Tile from "./Tile";
import Strike from "./Strike";

function Board({ tiles, onTileClick, playerTurn, strikeClass }) {
  return (
    <div className="board">
      <Tile
        className="right-border bottom-border"
        value={tiles[0]}
        onClick={() => onTileClick(0)}
        playerTurn={playerTurn}
      />
      <Tile
        className="right-border bottom-border"
        value={tiles[1]}
        onClick={() => onTileClick(1)}
        playerTurn={playerTurn}
      />
      <Tile
        className="bottom-border"
        value={tiles[2]}
        onClick={() => onTileClick(2)}
        playerTurn={playerTurn}
      />
      <Tile
        className="right-border bottom-border"
        value={tiles[3]}
        onClick={() => onTileClick(3)}
        playerTurn={playerTurn}
      />
      <Tile
        className="right-border bottom-border"
        value={tiles[4]}
        onClick={() => onTileClick(4)}
        playerTurn={playerTurn}
      />
      <Tile
        className="bottom-border"
        value={tiles[5]}
        onClick={() => onTileClick(5)}
        playerTurn={playerTurn}
      />
      <Tile
        className="right-border"
        value={tiles[6]}
        onClick={() => onTileClick(6)}
        playerTurn={playerTurn}
      />
      <Tile
        className="right-border"
        value={tiles[7]}
        onClick={() => onTileClick(7)}
        playerTurn={playerTurn}
      />
      <Tile
        onClick={() => onTileClick(8)}
        value={tiles[8]}
        playerTurn={playerTurn}
      />
      <Strike strikeClass={strikeClass} />
    </div>
  );
}

export default Board;
