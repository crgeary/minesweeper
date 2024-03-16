import { Cell } from "./types";

export function getCell(currentCell: number, columns: number, mines: Set<number>) {
  if (mines.has(currentCell)) {
    return Cell.Mine;
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
