import { GameMode } from "./types";
import type { GameModeObject } from "./types";

export const GAME_MODES: Omit<Record<GameMode, GameModeObject>, GameMode.Custom> = {
  [GameMode.Easy]: {
    name: "Easy",
    settings: {
      rows: 8,
      columns: 8,
      bombCount: 10,
    },
  },
  [GameMode.Medium]: {
    name: "Medium",
    settings: {
      rows: 16,
      columns: 16,
      bombCount: 40,
    },
  },
  [GameMode.Hard]: {
    name: "Hard",
    settings: {
      rows: 16,
      columns: 32,
      bombCount: 99,
    },
  },
};
