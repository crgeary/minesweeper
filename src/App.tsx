import classNames from "classnames";

import { useMinesweeper } from "./lib/minesweeper/use-minesweeper.hook";
import { Action, GameMode, GameStatus } from "./lib/minesweeper/types";

function App() {
  const { minefield, dispatch, state, settings } = useMinesweeper({
    defaultMode: GameMode.Easy,
  });

  return (
    <div className="h-full flex items-center justify-center bg-gray-50">
      <div>
        <div>Status: {state.status}</div>
        <div className="flex gap-2 mb-2">
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
          <button
            className="inline-block px-1 bg-blue-300"
            onClick={() =>
              dispatch({
                type: Action.Init,
                payload: {
                  mode: GameMode.Custom,
                  settings: {
                    rows: 4,
                    columns: 10,
                    bombCount: 2,
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
          {(state.status === GameStatus.Lost || state.status === GameStatus.Won) && (
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
