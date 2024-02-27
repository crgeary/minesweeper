import { useMinesweeper } from "./lib/minesweeper/use-minesweeper.hook";
import { Action, GameStatus } from "./lib/minesweeper/types";
import { useState } from "react";
import { Button } from "./components/button.component";
import { ModeSelector } from "./components/mode-selector.component";

import { Modal } from "./components/modal.component";
import { Paper } from "./components/paper.component";
import { GAME_MODES } from "./constants";
import { GameMode } from "./types";
import { Minefield } from "./components/minefield/minefield.component";

import { SegmentDisplay } from "./components/segment-display";

function App() {
  const [isGameModeSelectorOpen, setIsGameModeSelectorOpen] = useState(false);

  const { dispatch, state, flags, minefield, settings, status, elapsedTime } = useMinesweeper({
    defaultGameSettings: GAME_MODES[GameMode.Easy].settings,
  });

  const formatter = new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <Modal isOpen={isGameModeSelectorOpen} setIsOpen={setIsGameModeSelectorOpen}>
        <ModeSelector
          defaultMode={GameMode.Medium}
          modes={GAME_MODES}
          onStartGame={(settings) => {
            dispatch({
              type: Action.Init,
              payload: settings,
            });
            setIsGameModeSelectorOpen(false);
          }}
        />
      </Modal>

      <div className="h-full flex items-center justify-center bg-yellow-300">
        <div>
          <Button
            className="absolute top-4 left-4 shadow-sm"
            variant="default"
            onClick={() => setIsGameModeSelectorOpen(true)}
          >
            New Game
          </Button>

          <Paper>
            <div className="flex justify-between border-b-2 border-black p-4">
              <SegmentDisplay value={formatter.format(elapsedTime)} />
              <SegmentDisplay value={settings.bombCount - flags.length} />
            </div>
            <div className="relative p-4">
              <Minefield
                cells={minefield}
                dirtyCells={state.dirtyCells}
                settings={settings}
                onFlag={(cell) => {
                  dispatch({
                    type: Action.FlagCell,
                    payload: cell,
                  });
                }}
                onReveal={(cell) => {
                  dispatch({
                    type: Action.RevealCell,
                    payload: cell,
                  });
                }}
              />
              {(status === GameStatus.Lost || status === GameStatus.Won) && (
                <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 p-8">
                  <Button
                    variant="default"
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
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default App;
