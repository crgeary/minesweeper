import { randomBetween } from "../../utils/random-between";
import { Grid } from "./types";

export function makeGrid(rows: number, columns: number, bombCount: number) {
  const cellCount = rows * columns - 1;
  const grid: Grid = [];

  if (bombCount >= cellCount) {
    throw new Error("Too many bombs!");
  }

  const bombs = chooseBombPositions(cellCount, bombCount);

  let currentCell = 0;

  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < columns; j++) {
      grid[i][j] = bombs.has(currentCell) ? -1 : 0;
      currentCell++;
    }
  }

  return addHints(grid);
}

function chooseBombPositions(cellCount: number, bombCount: number) {
  const bombs = new Set();

  do {
    bombs.add(randomBetween(0, cellCount));
  } while (bombs.size < bombCount);

  return bombs;
}

function addHint(grid: Grid, rowIndex: number, columnIndex: number): number {
  // prettier-ignore
  const positions: [number, number][] = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
  let cell = grid[rowIndex][columnIndex];

  if (cell === -1) {
    return cell;
  }

  for (const p of positions) {
    cell += (grid[rowIndex + p[0]]?.[columnIndex + p[1]] ?? 0) === -1 ? 1 : 0;
  }

  return cell;
}

function addHints(grid: Grid) {
  for (let i = 0; i < grid[0].length; i++) {
    for (let j = 0; j < grid.length; j++) {
      grid[i][j] = addHint(grid, i, j);
    }
  }

  return grid;
}
