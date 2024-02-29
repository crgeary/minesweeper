import { makeMinefield } from ".";
import { DirtyCell, GameSettings, GameState, GameStatus, GameTurn, TurnAction } from "./types";

export function revealCell(gameState: GameState, chosenCell: number): GameState {
  const dirtyCells = { ...gameState.dirtyCells };
  let status = GameStatus.Playing;
  let turn: GameTurn | null = null;

  if (dirtyCells[chosenCell] !== DirtyCell.Flag) {
    if (typeof dirtyCells[chosenCell] === "undefined") {
      turn = { action: TurnAction.RevealCell, cell: chosenCell };
    }

    dirtyCells[chosenCell] = DirtyCell.Reveal;

    if (gameState.minefield[chosenCell] === 0) {
      recursiveRevealCell(gameState, dirtyCells, chosenCell);
    }
  }

  if (dirtyCells[chosenCell] === DirtyCell.Reveal && gameState.minefield[chosenCell] === -1) {
    status = GameStatus.Lost;
  }

  const revealCells = Object.values(dirtyCells).filter((c) => c === DirtyCell.Reveal);
  const reveledCellCount = revealCells.length;
  const nonMineCellCount = gameState.minefield.filter((c) => c !== -1).length;

  if (reveledCellCount === nonMineCellCount) {
    status = GameStatus.Won;
  }

  return {
    ...gameState,
    startTime: gameState.startTime !== 0 ? gameState.startTime : performance.now(),
    dirtyCells,
    status,
    turns: turn ? [...gameState.turns, turn] : gameState.turns,
  };
}

function recursiveRevealCell(
  gameState: GameState,
  dirtyCells: Record<number, DirtyCell>,
  currentCell: number,
) {
  const hasLeft = currentCell % gameState.settings.columns > 0;
  const hasRight = (currentCell + 1) % gameState.settings.columns !== 0;

  const positions = [
    { condition: hasLeft, cell: currentCell - (gameState.settings.columns + 1) },
    { condition: true, cell: currentCell - gameState.settings.columns },
    { condition: hasRight, cell: currentCell - (gameState.settings.columns - 1) },
    { condition: hasLeft, cell: currentCell - 1 },
    { condition: hasRight, cell: currentCell + 1 },
    { condition: hasLeft, cell: currentCell + (gameState.settings.columns - 1) },
    { condition: true, cell: currentCell + gameState.settings.columns },
    { condition: hasRight, cell: currentCell + (gameState.settings.columns + 1) },
  ];

  for (const position of positions) {
    if (
      position.condition &&
      position.cell >= 0 &&
      position.cell < gameState.minefield.length &&
      typeof dirtyCells[position.cell] === "undefined"
    ) {
      dirtyCells[position.cell] = DirtyCell.Reveal;
      if (gameState.minefield[position.cell] === 0) {
        recursiveRevealCell(gameState, dirtyCells, position.cell);
      }
    }
  }

  return dirtyCells;
}

export function flagCell(gameState: GameState, chosenCell: number): GameState {
  const dirtyCells = { ...gameState.dirtyCells };
  let turn: GameTurn | null = null;

  if (dirtyCells[chosenCell] === DirtyCell.Flag) {
    turn = { action: TurnAction.UnflagCell, cell: chosenCell };
    delete dirtyCells[chosenCell];
  } else if (dirtyCells[chosenCell] !== DirtyCell.Reveal) {
    turn = { action: TurnAction.FlagCell, cell: chosenCell };
    dirtyCells[chosenCell] = DirtyCell.Flag;
  }

  return {
    ...gameState,
    startTime: gameState.startTime !== 0 ? gameState.startTime : performance.now(),
    status: GameStatus.Playing,
    dirtyCells,
    turns: turn ? [...gameState.turns, turn] : gameState.turns,
  };
}

export function initGame(gameState: GameState, settings: GameSettings): GameState {
  return {
    ...gameState,
    startTime: 0,
    currentTime: 0,
    settings,
    minefield: makeMinefield(settings.rows, settings.columns, settings.bombCount),
    status: GameStatus.NotStarted,
    dirtyCells: {},
    turns: [],
  };
}
