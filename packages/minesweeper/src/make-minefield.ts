import { chooseMinePositions } from "./choose-mine-positions";
import { getCell } from "./get-cell";

export function makeEmptyMinefield(rows: number, columns: number): number[] {
  return Array.from<number>({ length: rows * columns }).fill(0);
}

export function makeMinefield(
  rows: number,
  columns: number,
  mineCount: number,
  initialCell: number,
): number[] {
  const cellCount = rows * columns;
  const board: number[] = [];

  if (mineCount >= cellCount) {
    throw new Error("Too many mines!");
  }

  const mines = chooseMinePositions(cellCount - 1, mineCount, initialCell);

  for (let i = 0; i < cellCount; i++) {
    board[i] = getCell(i, columns, mines);
  }

  return board;
}
