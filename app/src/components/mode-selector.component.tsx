import { useEffect, useState } from "react";
import { Button } from "./button.component";
import { Input } from "./input.component";
import { GameMode, GameModeObject } from "../types";
import { GameSettings } from "../lib/minesweeper";

type ModeSelectorProps = {
  modes: Omit<Record<GameMode, GameModeObject>, GameMode.Custom>;
  defaultMode: Exclude<GameMode, GameMode.Custom>;
  onStartGame: (settings: GameSettings, mode?: GameMode) => void;
};

export function ModeSelector({ defaultMode, modes, onStartGame }: ModeSelectorProps) {
  const [mode, setMode] = useState<GameMode>(defaultMode);

  const [rows, setRows] = useState(modes[defaultMode].settings.rows);
  const [columns, setColumns] = useState(modes[defaultMode].settings.columns);
  const [mineCount, setMineCount] = useState(modes[defaultMode].settings.mineCount);

  const setGameMode = (m: Exclude<GameMode, GameMode.Custom>) => {
    setRows(modes[m].settings.rows);
    setColumns(modes[m].settings.columns);
    setMineCount(modes[m].settings.mineCount);
  };

  useEffect(() => {
    const detected = Object.keys(modes).find(
      (m) =>
        JSON.stringify(modes[m as Exclude<GameMode, GameMode.Custom>].settings) ===
        JSON.stringify({ rows, columns, mineCount }),
    ) as GameMode | undefined;
    setMode(detected ?? GameMode.Custom);
  }, [rows, columns, mineCount, modes]);

  return (
    <div>
      <div className="p-4 flex gap-4">
        <div className="flex flex-col gap-4 pr-4 border-r-2 border-black w-3/5">
          <Button className="w-full" variant="easy" onClick={() => setGameMode(GameMode.Easy)}>
            {modes[GameMode.Easy].name}
          </Button>
          <Button className="w-full" variant="medium" onClick={() => setGameMode(GameMode.Medium)}>
            {modes[GameMode.Medium].name}
          </Button>
          <Button className="w-full" variant="hard" onClick={() => setGameMode(GameMode.Hard)}>
            {modes[GameMode.Hard].name}
          </Button>
          <Button className="w-full" variant="custom" onClick={() => setMode(GameMode.Custom)}>
            Custom
          </Button>
        </div>
        <div className="flex flex-col gap-4 w-2/5">
          <div>
            <label>Rows</label>
            <Input type="number" value={rows} onChange={(e) => setRows(Number(e.target.value))} />
          </div>
          <div>
            <label>Columns</label>
            <Input
              type="number"
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Bombs</label>
            <Input
              type="number"
              value={mineCount}
              onChange={(e) => setMineCount(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="p-4 border-t-2 border-black flex justify-end">
        <Button
          variant={mode ?? "default"}
          onClick={() => onStartGame({ rows, columns, mineCount }, mode)}
        >
          Start {mode !== GameMode.Custom ? modes[mode].name : "Custom"} Game
        </Button>
      </div>
    </div>
  );
}
