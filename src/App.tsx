import { useMinesweeper } from "./lib/minesweeper/use-minesweeper.hook";
import { GameStatus } from "./lib/minesweeper/types";
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
                onFlag={flagCell}
                onReveal={revealCell}
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
        <div className="absolute inset-y-0 right-0 w-32 p-4 text-sm ">
          <ol className="h-full overflow-auto">
            {[...turns].reverse().map((turn, i) => (
              <li key={i} className="flex justify-between">
                <span className="uppercase font-light opacity-70">{turn.action}</span>
                <span className="font-medium">{turn.cell}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default App;
