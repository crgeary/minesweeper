import { randomBetween } from "../../utils/random-between";

export function makeGrid(rows: number, columns: number, bombCount: number) {
  const cellCount = rows * columns;
  const grid: number[] = [];

  if (bombCount >= cellCount) {
    throw new Error("Too many bombs!");
  }

  const bombs = chooseBombPositions(cellCount - 1, bombCount);

  let currentCell = 0;

  while (currentCell < cellCount) {
    grid[currentCell] = getCell(currentCell, rows, bombs);
    currentCell++;
  }

  return grid;
}

function chooseBombPositions(cellCount: number, bombCount: number) {
  const bombs = new Set<number>();

  while (bombs.size < bombCount) {
    bombs.add(randomBetween(0, cellCount));
  }

  return bombs;
}

function getCell(currentCell: number, rows: number, bombs: Set<number>) {
  if (bombs.has(currentCell)) {
    return -1;
  }

  let count = 0;

  const hasLeft = currentCell % rows > 0;
  const hasRight = (currentCell + 1) % rows !== 0;

  if (
    (hasLeft && bombs.has(currentCell - 5)) ||
    bombs.has(currentCell - rows) ||
    (hasRight && bombs.has(currentCell - 3)) ||
    (hasLeft && bombs.has(currentCell - 1)) ||
    (hasRight && bombs.has(currentCell + 1)) ||
    (hasLeft && bombs.has(currentCell + 3)) ||
    bombs.has(currentCell + rows) ||
    (hasRight && bombs.has(currentCell + 5))
  ) {
    count++;
  }

  return count;
}
