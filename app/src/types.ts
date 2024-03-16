import { GameSettings } from "@crgeary/minesweeper";

export enum GameMode {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
  Custom = "custom",
}

export type GameModeObject = {
  name: string;
  settings: GameSettings;
};
