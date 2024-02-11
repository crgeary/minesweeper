import { makeMinefield } from ".";
import { DirtyCell, GameMode, GameSettings, GameState, GameStatus } from "./types";

export function revealCell(gameState: GameState, chosenCell: number): GameState {
  const dirtyCells = new Map(gameState.dirtyCells);
  let status = GameStatus.Playing;

  if (dirtyCells.get(chosenCell) !== DirtyCell.Flag) {
    dirtyCells.set(chosenCell, DirtyCell.Reveal);
  }

  if (dirtyCells.get(chosenCell) === DirtyCell.Reveal && gameState.minefield[chosenCell] === -1) {
    status = GameStatus.Lost;
  }

  return {
    ...gameState,
    dirtyCells,
    status,
  };
}

export function flagCell(gameState: GameState, chosenCell: number): GameState {
  const dirtyCells = new Map(gameState.dirtyCells);

  if (dirtyCells.get(chosenCell) === DirtyCell.Flag) {
    dirtyCells.delete(chosenCell);
  } else if (dirtyCells.get(chosenCell) !== DirtyCell.Reveal) {
    dirtyCells.set(chosenCell, DirtyCell.Flag);
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
    dirtyCells: new Map(),
  };
}
