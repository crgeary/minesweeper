import { randomBetween } from "../../utils/random-between";
import { DirtyCell } from "./types";

export function makeMinefield(rows: number, columns: number, bombCount: number) {
  const cellCount = rows * columns;
  const board: number[] = [];

  if (bombCount >= cellCount) {
    throw new Error("Too many bombs!");
  }

  const bombs = chooseBombPositions(cellCount - 1, bombCount);

  let currentCell = 0;

  while (currentCell < cellCount) {
    board[currentCell] = getCell(currentCell, columns, bombs);
    currentCell++;
  }

  return board;
}

function chooseBombPositions(cellCount: number, bombCount: number) {
  const bombs = new Set<number>();

  while (bombs.size < bombCount) {
    bombs.add(randomBetween(0, cellCount));
  }

  return bombs;
}

function getCell(currentCell: number, columns: number, bombs: Set<number>) {
  if (bombs.has(currentCell)) {
    return -1;
  }

  const hasLeft = currentCell % columns > 0;
  const hasRight = (currentCell + 1) % columns !== 0;

  const positions = [
    { condition: hasLeft, cell: currentCell - (columns + 1) },
    { condition: true, cell: currentCell - columns },
    { condition: hasRight, cell: currentCell - (columns - 1) },
    { condition: hasLeft, cell: currentCell - 1 },
    { condition: hasRight, cell: currentCell + 1 },
    { condition: hasLeft, cell: currentCell + (columns - 1) },
    { condition: true, cell: currentCell + columns },
    { condition: hasRight, cell: currentCell + (columns + 1) },
  ];

  let count = 0;

  for (const position of positions) {
    count += position.condition && bombs.has(position.cell) ? 1 : 0;
  }

  return count;
}

export function flagCell(cells: Map<number, number>, cell: number) {
  const newMap = new Map(cells);

  if (newMap.get(cell) === DirtyCell.Flag) {
    newMap.delete(cell);
  } else {
    newMap.set(cell, DirtyCell.Flag);
  }

  return newMap;
}
