import GameState from "./GameState";

function Reset({ gameState, onReset }) {
  if (gameState == GameState.inProgress) {
    return;
  }

  return (
    <div className="reset-button" onClick={onReset}>
      Reset
    </div>
  );
}

export default Reset;
