import { makeMinefield } from ".";
import { DirtyCell, GameMode, GameSettings, GameState, GameStatus } from "./types";

export function revealCell(gameState: GameState, chosenCell: number): GameState {
  const dirtyCells = { ...gameState.dirtyCells };
  let status = GameStatus.Playing;

  if (dirtyCells[chosenCell] !== DirtyCell.Flag) {
    dirtyCells[chosenCell] = DirtyCell.Reveal;
  }

  if (dirtyCells[chosenCell] === DirtyCell.Reveal && gameState.minefield[chosenCell] === -1) {
    status = GameStatus.Lost;
  }

  return {
    ...gameState,
    dirtyCells,
    status,
  };
}

export function flagCell(gameState: GameState, chosenCell: number): GameState {
  const dirtyCells = { ...gameState.dirtyCells };

  if (dirtyCells[chosenCell] === DirtyCell.Flag) {
    delete dirtyCells[chosenCell];
  } else if (dirtyCells[chosenCell] !== DirtyCell.Reveal) {
    dirtyCells[chosenCell] = DirtyCell.Flag;
  }

  return {
    ...gameState,
    status: GameStatus.Playing,
    dirtyCells,
  };
}

export function initGame(gameState: GameState, mode: GameMode, settings: GameSettings): GameState {
  return {
    ...gameState,
    mode,
    settings,
    minefield: makeMinefield(settings.rows, settings.columns, settings.bombCount),
    status: GameStatus.NotStarted,
    dirtyCells: {},
  };
}
