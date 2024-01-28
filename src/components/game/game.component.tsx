import { makeGrid } from "../../lib/minesweeper";

type Props = {
  columns: number;
  rows: number;
  bombCount: number;
};

export function Game({ rows, columns, bombCount }: Props) {
  const grid = makeGrid(rows, columns, bombCount);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
      className="grid gap-0.5"
    >
      {grid.map((cell, i) => (
        <button key={i} className="border bg-white w-10 h-10 flex items-center justify-center">
          {cell === -1 ? "💣" : cell === 0 ? null : cell}
        </button>
      ))}
    </div>
  );
}
