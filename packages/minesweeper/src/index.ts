import { randomBetween } from "./utils/random-between";

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

  let currentCell = 0;

  while (currentCell < cellCount) {
    board[currentCell] = getCell(currentCell, columns, mines);
    currentCell++;
  }

  return board;
}

function chooseMinePositions(cellCount: number, mineCount: number, excludeCell: number) {
  const mines = new Set<number>();

  while (mines.size < mineCount) {
    const cell = randomBetween(0, cellCount);
    if (cell !== excludeCell) {
      mines.add(cell);
    }
  }

  return mines;
}

function getCell(currentCell: number, columns: number, mines: Set<number>) {
  if (mines.has(currentCell)) {
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
    count += position.condition && mines.has(position.cell) ? 1 : 0;
  }

  return count;
}
