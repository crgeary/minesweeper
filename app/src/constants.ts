import { GameMode } from "./types";
import type { GameModeObject } from "./types";

export const GAME_MODES: Omit<Record<GameMode, GameModeObject>, GameMode.Custom> = {
  [GameMode.Easy]: {
    name: "Easy",
    settings: {
      rows: 9,
      columns: 9,
      mineCount: 10,
    },
  },
  [GameMode.Medium]: {
    name: "Medium",
    settings: {
      rows: 16,
      columns: 16,
      mineCount: 40,
    },
  },
  [GameMode.Hard]: {
    name: "Hard",
    settings: {
      rows: 16,
      columns: 30,
      mineCount: 99,
    },
  },
};
