export enum Action {
  FlagCell = "flag",
  RevealCell = "reval",
  Init = "init",
  Restart = "restart",
}

export enum GameStatus {
  NotStarted = "not-started",
  Playing = "playing",
  Won = "won",
  Lost = "lost",
}

export enum DirtyCell {
  Flag = 1,
  Reveal = -1,
}

export enum GameMode {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
  Custom = "custom",
}

export type GameSettings = {
  columns: number;
  rows: number;
  bombCount: number;
};

export type GameModeObject = {
  name: string;
  settings: GameSettings;
};

export type GameState = {
  status: GameStatus;
  minefield: number[];
  mode: GameMode;
  settings: GameSettings;
  dirtyCells: Map<number, DirtyCell>;
};

export type GameAction =
  | { type: Action.FlagCell; payload: number }
  | { type: Action.RevealCell; payload: number }
  | {
      type: Action.Init;
      payload:
        | {
            mode: GameMode.Custom;
            settings: GameSettings;
          }
        | {
            mode: Exclude<GameMode, GameMode.Custom>;
          };
    }
  | { type: Action.Restart };
