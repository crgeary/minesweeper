import { useEffect, useState } from "react";
import { Button } from "./button.component";
import { Input } from "./input.component";
import { GameMode, GameModeObject } from "../types";

type ModeSelectorProps = {
  modes: Omit<Record<GameMode, GameModeObject>, GameMode.Custom>;
  defaultMode: Exclude<GameMode, GameMode.Custom>;
  onSelectMode: (mode: GameMode) => void;
};

export function ModeSelector({ defaultMode, modes, onSelectMode }: ModeSelectorProps) {
  const [mode, setMode] = useState<GameMode>(defaultMode);

  const [rows, setRows] = useState(modes[defaultMode].settings.rows);
  const [columns, setColumns] = useState(modes[defaultMode].settings.columns);
  const [bombCount, setBombCount] = useState(modes[defaultMode].settings.bombCount);

  const setGameMode = (m: Exclude<GameMode, GameMode.Custom>) => {
    setRows(modes[m].settings.rows);
    setColumns(modes[m].settings.columns);
    setBombCount(modes[m].settings.bombCount);
  };

  useEffect(() => {
    const detected = Object.keys(modes).find(
      (m) =>
        JSON.stringify(modes[m as Exclude<GameMode, GameMode.Custom>].settings) ===
        JSON.stringify({ rows, columns, bombCount }),
    ) as GameMode | undefined;
    setMode(detected ?? GameMode.Custom);
  }, [rows, columns, bombCount, modes]);

  return (
    <div>
      <div className="p-4 flex gap-4">
        <div className="flex flex-col gap-4 pr-4 border-r-2 border-black w-3/5">
          <Button variant="easy" onClick={() => setGameMode(GameMode.Easy)}>
            {modes[GameMode.Easy].name}
          </Button>
          <Button variant="medium" onClick={() => setGameMode(GameMode.Medium)}>
            {modes[GameMode.Medium].name}
          </Button>
          <Button variant="hard" onClick={() => setGameMode(GameMode.Hard)}>
            {modes[GameMode.Hard].name}
          </Button>
          <Button variant="custom" onClick={() => setMode(GameMode.Custom)}>
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
              value={bombCount}
              onChange={(e) => setBombCount(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="p-4 border-t-2 border-black">
        <Button variant={mode ?? "default"} onClick={() => onSelectMode(mode)}>
          Start {mode !== GameMode.Custom ? modes[mode].name : "Custom"} Game
        </Button>
      </div>
    </div>
  );
}
