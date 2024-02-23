import classNames from "classnames";

import { useMinesweeper } from "./lib/minesweeper/use-minesweeper.hook";
import { Action, GameMode, GameStatus } from "./lib/minesweeper/types";
import { useState } from "react";
import { Button } from "./components/button.component";
import { ModeSelector } from "./components/mode-selector.component";

import { Modal } from "./components/modal.component";
import { Input } from "./components/input.component";
import { Paper } from "./components/paper.component";

function App() {
  const [rows, setRows] = useState(4);
  const [columns, setColumns] = useState(10);
  const [bombCount, setBombCount] = useState(2);

  const [isGameModeSelectorOpen, setIsGameModeSelectorOpen] = useState(false);

  const { dispatch, state, flags, minefield, settings, status } = useMinesweeper({
    defaultMode: GameMode.Easy,
  });

  return (
    <>
      <Modal isOpen={isGameModeSelectorOpen} setIsOpen={setIsGameModeSelectorOpen}>
        <ModeSelector
          defaultMode="medium"
          onSelectMode={(mode) => {
            dispatch({
              type: Action.Init,
              payload: {
                mode: mode as Exclude<GameMode, GameMode.Custom>,
              },
            });
            setIsGameModeSelectorOpen(false);
          }}
        />
      </Modal>

      <div
        className={classNames("h-full flex items-center justify-center", {
          "bg-green-300": state.mode === GameMode.Easy,
          "bg-orange-300": state.mode === GameMode.Medium,
          "bg-red-300": state.mode === GameMode.Hard,
          "bg-blue-300": state.mode === GameMode.Custom,
        })}
      >
        <div>
          <Button variant="default" onClick={() => setIsGameModeSelectorOpen(true)}>
            Settings
          </Button>
          <div className="flex justify-between">
            <div>Status: {status}</div>
            <div>{settings.bombCount - flags.length} ⛳️</div>
          </div>

          <div className="flex gap-1 my-2">
            <Input type="number" value={rows} onChange={(e) => setRows(Number(e.target.value))} />
            <Input
              type="number"
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
            />
            <Input
              type="number"
              value={bombCount}
              onChange={(e) => setBombCount(Number(e.target.value))}
            />
            <Button
              variant="default"
              className=" bg-blue-300"
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
            </Button>
          </div>
          <Paper className="relative p-4">
            <div
              style={{
                gridTemplateColumns: `repeat(${settings.columns}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${settings.rows}, minmax(0, 1fr))`,
              }}
              className="grid border border-gray-300"
            >
              {minefield.map((s, i) => (
                <Button
                  variant="default"
                  key={i}
                  className={classNames(
                    "border-1 border-gray-300 w-9 h-9 flex items-center justify-center flex-col",
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
                </Button>
              ))}
            </div>
            {(status === GameStatus.Lost || status === GameStatus.Won) && (
              <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
                <Button
                  variant="default"
                  className="border-2 border-black bg-white px-4 py-2"
                  onClick={() =>
                    dispatch({
                      type: Action.Restart,
                    })
                  }
                >
                  Restart Game
                </Button>
              </div>
            )}
          </Paper>
        </div>
      </div>
    </>
  );
}

export default App;
