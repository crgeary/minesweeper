import classNames from "classnames";

import { Action, GameStatus } from "../../lib/minesweeper/types";
import { useMinesweeper } from "../../lib/minesweeper/use-minesweeper.hook";

type Props = {
  columns: number;
  rows: number;
  bombCount: number;
};

export function Game({ rows, columns, bombCount }: Props) {
  const { minefield, dispatch, state } = useMinesweeper({ rows, columns, bombCount });

  return (
    <div>
      <div>Status: {state.status}</div>
      {state.status === GameStatus.NotStarted || state.status === GameStatus.Playing ? (
        <div
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
          className="grid gap-0.5"
        >
          {minefield.map((s, i) => (
            <button
              key={i}
              className={classNames(
                "border border-gray-300 w-10 h-10 flex items-center justify-center flex-col",
                {
                  "bg-white": state.dirtyCells.get(i) === -1,
                  "bg-gray-100": state.dirtyCells.get(i) !== -1,
                },
              )}
              onClick={() => {
                dispatch({
                  type: Action.RevealCell,
                  payload: i,
                });
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                dispatch({
                  type: Action.FlagCell,
                  payload: i,
                });
              }}
            >
              <span
                className={classNames("text-xs", {
                  "opacity-10": state.dirtyCells.get(i) !== -1,
                })}
              >
                {s === -1 ? "💣" : s === 0 ? null : s}
              </span>

              <span className="text-xs">{state.dirtyCells.get(i) === 1 ? "⛳️" : null}</span>
            </button>
          ))}
        </div>
      ) : (
        <div>Refresh to play again</div>
      )}
    </div>
  );
}
