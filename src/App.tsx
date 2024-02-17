import classNames from "classnames";

import { useMinesweeper } from "./lib/minesweeper/use-minesweeper.hook";
import { Action, GameMode, GameStatus } from "./lib/minesweeper/types";
import { useState } from "react";

function App() {
  const [rows, setRows] = useState(4);
  const [columns, setColumns] = useState(10);
  const [bombCount, setBombCount] = useState(2);

  const { dispatch, state, flags, minefield, settings, status } = useMinesweeper({
    defaultMode: GameMode.Easy,
  });

  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div>
        <div className="flex justify-between">
          <div>Status: {status}</div>
          <div>{settings.bombCount - flags.length} ⛳️</div>
        </div>
        <div className="flex gap-2">
          <button
            className="inline-block px-1 bg-green-300"
            onClick={() =>
              dispatch({
                type: Action.Init,
                payload: {
                  mode: GameMode.Easy,
                },
              })
            }
          >
            Easy
          </button>
          <button
            className="inline-block px-1 bg-orange-300"
            onClick={() =>
              dispatch({
                type: Action.Init,
                payload: {
                  mode: GameMode.Medium,
                },
              })
            }
          >
            Medium
          </button>
          <button
            className="inline-block px-1 bg-red-300"
            onClick={() =>
              dispatch({
                type: Action.Init,
                payload: {
                  mode: GameMode.Hard,
                },
              })
            }
          >
            Hard
          </button>
        </div>
        <div className="flex gap-2 my-2">
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            className="w-16 border-2 border-blue-300"
          />
          <input
            type="number"
            value={columns}
            onChange={(e) => setColumns(Number(e.target.value))}
            className="w-16 border-2 border-blue-300"
          />
          <input
            type="number"
            value={bombCount}
            onChange={(e) => setBombCount(Number(e.target.value))}
            className="w-16 border-2 border-blue-300"
          />
          <button
            className="inline-block px-1 bg-blue-300"
            onClick={() =>
              dispatch({
                type: Action.Init,
                payload: {
                  mode: GameMode.Custom,
                  settings: {
                    rows,
                    columns,
                    bombCount,
                  },
                },
              })
            }
          >
            Custom
          </button>
        </div>
        <div className="relative">
          <div
            style={{
              gridTemplateColumns: `repeat(${settings.columns}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${settings.rows}, minmax(0, 1fr))`,
            }}
            className="grid gap-0.5"
          >
            {minefield.map((s, i) => (
              <button
                key={i}
                className={classNames(
                  "border border-gray-300 w-9 h-9 flex items-center justify-center flex-col",
                  {
                    "bg-white": state.dirtyCells[i] === -1,
                    "bg-gray-100": state.dirtyCells[i] !== -1,
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
                    "opacity-10": state.dirtyCells[i] !== -1,
                  })}
                >
                  {s === -1 ? "💣" : s === 0 ? null : s}
                </span>

                <span className="text-xs">{state.dirtyCells[i] === 1 ? "⛳️" : null}</span>
              </button>
            ))}
          </div>
          {(status === GameStatus.Lost || status === GameStatus.Won) && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
              <button
                onClick={() =>
                  dispatch({
                    type: Action.Restart,
                  })
                }
              >
                Restart Game
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
