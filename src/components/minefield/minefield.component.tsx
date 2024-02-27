import { GameSettings } from "../../lib/minesweeper";
import { DirtyCell } from "../../lib/minesweeper/types";

import { Cell } from "./cell.component";

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
      {cells.map((state, i) => (
        <Cell
          key={i}
          isFlagged={dirtyCells[i] === DirtyCell.Flag}
          isRevealed={dirtyCells[i] === DirtyCell.Reveal}
          state={state}
          onClick={() => onReveal(i)}
          onContextMenu={(e) => {
            e.preventDefault();
            onFlag(i);
          }}
        />
      ))}
    </div>
  );
}
