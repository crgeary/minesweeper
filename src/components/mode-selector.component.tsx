import { useState } from "react";
import { Button } from "./button.component";
import { Input } from "./input.component";

type ModeSelectorProps = {
  defaultMode: "easy" | "medium" | "hard" | "custom";
  onSelectMode: (mode: "easy" | "medium" | "hard" | "custom") => void;
};

export function ModeSelector({ defaultMode, onSelectMode }: ModeSelectorProps) {
  const [mode, setMode] = useState(defaultMode);
  return (
    <div>
      <div className="p-4 flex gap-4">
        <div className="flex flex-col gap-4 pr-4 border-r-2 border-black w-3/5">
          <Button variant="easy" onClick={() => setMode("easy")}>
            Easy
          </Button>
          <Button variant="medium" onClick={() => setMode("medium")}>
            Medium
          </Button>
          <Button variant="hard" onClick={() => setMode("hard")}>
            Hard
          </Button>
          <Button variant="custom" onClick={() => setMode("custom")}>
            Custom
          </Button>
        </div>
        <div className="flex flex-col gap-4 w-2/5">
          <div>
            <label>Rows</label>
            <Input type="number" />
          </div>
          <div>
            <label>Columns</label>
            <Input type="number" />
          </div>
          <div>
            <label>Bombs</label>
            <Input type="number" />
          </div>
        </div>
      </div>
      <div className="p-4 border-t-2 border-black">
        <Button variant={mode ?? "default"} onClick={() => onSelectMode(mode)}>
          Start
        </Button>
      </div>
    </div>
  );
}
