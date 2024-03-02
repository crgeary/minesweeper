import { GameSettings } from "../../lib/minesweeper";
import { DirtyCell, GameStatus, GameTurn } from "../../lib/minesweeper/types";

import { Cell } from "./cell.component";
import classNames from "classnames";

type MinefieldProps = {
  cells: number[];
  dirtyCells: Record<number, DirtyCell>;
  settings: GameSettings;
  status: GameStatus;
  turns: GameTurn[];

  onFlag: (cell: number) => void;
  onReveal: (cell: number) => void;
};

export function Minefield({
  cells,
  dirtyCells,
  settings,
  status,
  turns,
  onFlag,
  onReveal,
}: MinefieldProps) {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${settings.columns}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${settings.rows}, minmax(0, 1fr))`,
      }}
      className="grid border-t border-r border-black"
    >
      {cells.map((state, i) => {
        return (
          <Cell
            className={classNames({
              "text-red-700":
                state === -1 &&
                dirtyCells[i] === DirtyCell.Reveal &&
                turns[turns.length - 1]?.cell === i,
            })}
            key={i}
            isFlagged={dirtyCells[i] === DirtyCell.Flag}
            isRevealed={status === GameStatus.Lost ? true : dirtyCells[i] === DirtyCell.Reveal}
            state={state}
            onClick={() => onReveal(i)}
            onContextMenu={(e) => {
              e.preventDefault();
              onFlag(i);
            }}
          />
        );
      })}
    </div>
  );
}