import { useMinesweeper } from "./lib/minesweeper/use-minesweeper.hook";
import { useState } from "react";
import { Button } from "./components/button.component";
import { ModeSelector } from "./components/mode-selector.component";

import { Modal } from "./components/modal.component";
import { Paper } from "./components/paper.component";
import { GAME_MODES } from "./constants";
import { GameMode } from "./types";
import { Minefield } from "./components/minefield/minefield.component";

import { SegmentDisplay } from "./components/segment-display";
import { GameStatus } from "@crgeary/minesweeper";

function App() {
  const [isGameModeSelectorOpen, setIsGameModeSelectorOpen] = useState(false);

  const {
    state,
    init,
    flagCell,
    revealCell,
    restart,
    flags,
    minefield,
    settings,
    status,
    elapsedTime,
    turns,
  } = useMinesweeper({
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
            init(settings);
            setIsGameModeSelectorOpen(false);
          }}
        />
      </Modal>

      <div className="h-full flex items-center justify-center bg-yellow-300 px-4">
        <Button
          className="absolute top-4 left-4 shadow-sm"
          variant="default"
          onClick={() => setIsGameModeSelectorOpen(true)}
        >
          New Game
        </Button>

        <Paper className="max-w-full">
          <div className="flex justify-between border-b-2 border-black p-4">
            <SegmentDisplay value={formatter.format(elapsedTime)} />
            <SegmentDisplay value={settings.mineCount - flags.length} />
          </div>
          <div className="relative p-4">
            <Minefield
              cells={minefield}
              dirtyCells={state.dirtyCells}
              settings={settings}
              onFlag={flagCell}
              onReveal={revealCell}
              status={status}
              turns={turns}
            />

            {(status === GameStatus.Lost || status === GameStatus.Won) && (
              <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 p-8">
                <Button className="shadow-sm" variant="default" onClick={restart}>
                  Restart Game
                </Button>
              </div>
            )}
          </div>
        </Paper>
      </div>
    </>
  );
}

export default App;
