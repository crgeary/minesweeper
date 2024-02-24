import classNames from "classnames";
import { GameSettings } from "../lib/minesweeper";
import { DirtyCell } from "../lib/minesweeper/types";

import { FaBomb, FaFlag } from "react-icons/fa";

type MinefieldProps = {
  cells: number[];
  dirtyCells: Record<number, DirtyCell>;
  settings: GameSettings;

  onFlag: (cell: number) => void;
  onReveal: (cell: number) => void;
};

export function Minefield({ cells, dirtyCells, settings, onFlag, onReveal }: MinefieldProps) {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${settings.columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${settings.rows}, minmax(0, 1fr))`,
      }}
      className="grid border-t border-r border-black"
    >
      {cells.map((s, i) => (
        <button
          key={i}
          className={classNames(
            "w-8 h-8 flex items-center justify-center flex-col border-l border-b border-black text-sm font-bold",
            {
              "bg-gray-100": dirtyCells[i] !== -1,
              "bg-white": dirtyCells[i] === -1,
              "bg-yellow-100": dirtyCells[i] === -1 && s === 0,
            },
          )}
          onClick={() => onReveal(i)}
          onContextMenu={(e) => {
            e.preventDefault();
            onFlag(i);
          }}
        >
          <span>
            {dirtyCells[i] === 1 && <FaFlag />}
            {dirtyCells[i] === -1 && s === -1 && <FaBomb />}
            {dirtyCells[i] === -1 && s !== 0 && s}
          </span>
        </button>
      ))}
    </div>
  );
}
