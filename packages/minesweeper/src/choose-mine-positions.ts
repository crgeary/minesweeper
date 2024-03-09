import { randomBetween } from "./utils/random-between";

export function chooseMinePositions(cellCount: number, mineCount: number, excludeCell: number) {
  const mines = new Set<number>();

  while (mines.size < mineCount) {
    const cell = randomBetween(0, cellCount);
    if (cell !== excludeCell) {
      mines.add(cell);
    }
  }

  return mines;
}
