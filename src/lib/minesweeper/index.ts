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
    grid[currentCell] = getCell(currentCell, columns, bombs);
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
