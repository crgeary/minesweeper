import { DirtyCell, DirtyCells, GameSettings, GameStatus } from "@crgeary/minesweeper";
import { GameTurn } from "../../lib/minesweeper/types";

import { Cell } from "./cell.component";
import classNames from "classnames";

type MinefieldProps = {
  cells: number[];
  dirtyCells: DirtyCells;
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
        gridTemplateColumns: `repeat(${settings.columns}, 1fr)`,
        gridTemplateRows: `repeat(${settings.rows}, 1fr)`,
      }}
      className="grid border-t border-r border-black overflow-scroll"
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
            isRevealed={
              status === GameStatus.Lost && state === -1 ? true : dirtyCells[i] === DirtyCell.Reveal
            }
            state={state}
            onClick={() => onReveal(i)}
            onContextMenu={(e) => {
              e.preventDefault();
              window.navigator.vibrate(75);
              onFlag(i);
            }}
          />
        );
      })}
    </div>
  );
}
