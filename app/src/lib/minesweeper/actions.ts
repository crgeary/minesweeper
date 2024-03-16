import {
  Cell,
  DirtyCell,
  DirtyCells,
  GameSettings,
  GameStatus,
  makeEmptyMinefield,
  makeMinefield,
} from "@crgeary/minesweeper";

import { GameState, GameTurn, TurnAction } from "./types";

export function revealCell(gameState: GameState, chosenCell: number): GameState {
  const dirtyCells = { ...gameState.dirtyCells };
  let status = GameStatus.Playing;
  let turn: GameTurn | null = null;
  let minefield = gameState.minefield;

  const reveals = Object.values(dirtyCells).filter((c) => c === DirtyCell.Reveal);
  if (reveals.length === 0) {
    minefield = makeMinefield(
      gameState.settings.rows,
      gameState.settings.columns,
      gameState.settings.mineCount,
      chosenCell,
    );
  }

  if (dirtyCells[chosenCell] !== DirtyCell.Flag) {
    if (typeof dirtyCells[chosenCell] === "undefined") {
      turn = { action: TurnAction.RevealCell, cell: chosenCell };
    }

    dirtyCells[chosenCell] = DirtyCell.Reveal;

    if (minefield[chosenCell] === Cell.Empty) {
      recursiveRevealCell(minefield, gameState.settings, dirtyCells, chosenCell);
    }
  }

  if (dirtyCells[chosenCell] === DirtyCell.Reveal && minefield[chosenCell] === Cell.Mine) {
    status = GameStatus.Lost;
  }

  const revealCells = Object.values(dirtyCells).filter((c) => c === DirtyCell.Reveal);
  const reveledCellCount = revealCells.length;
  const nonMineCellCount = minefield.filter((c) => c !== Cell.Mine).length;

  if (reveledCellCount === nonMineCellCount) {
    status = GameStatus.Won;
  }

  return {
    ...gameState,
    minefield,
    startTime: gameState.startTime !== 0 ? gameState.startTime : performance.now(),
    currentTime: performance.now(),
    dirtyCells,
    status,
    turns: turn ? [...gameState.turns, turn] : gameState.turns,
  };
}

function recursiveRevealCell(
  minefield: number[],
  settings: GameSettings,
  dirtyCells: DirtyCells,
  currentCell: number,
) {
  const hasLeft = currentCell % settings.columns > 0;
  const hasRight = (currentCell + 1) % settings.columns !== 0;

  const positions = [
    { condition: hasLeft, cell: currentCell - (settings.columns + 1) },
    { condition: true, cell: currentCell - settings.columns },
    { condition: hasRight, cell: currentCell - (settings.columns - 1) },
    { condition: hasLeft, cell: currentCell - 1 },
    { condition: hasRight, cell: currentCell + 1 },
    { condition: hasLeft, cell: currentCell + (settings.columns - 1) },
    { condition: true, cell: currentCell + settings.columns },
    { condition: hasRight, cell: currentCell + (settings.columns + 1) },
  ];

  for (const position of positions) {
    if (
      position.condition &&
      position.cell >= 0 &&
      position.cell < minefield.length &&
      typeof dirtyCells[position.cell] === "undefined"
    ) {
      dirtyCells[position.cell] = DirtyCell.Reveal;
      if (minefield[position.cell] === Cell.Empty) {
        recursiveRevealCell(minefield, settings, dirtyCells, position.cell);
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
    currentTime: performance.now(),
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
    minefield: makeEmptyMinefield(settings.rows, settings.columns),
    status: GameStatus.NotStarted,
    dirtyCells: {},
    turns: [],
  };
}
