export enum Action {
  FlagCell = "flag",
  RevealCell = "reval",
  Init = "init",
  Restart = "restart",
  SetCurrentTime = "set-current-time",
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

export type GameSettings = {
  columns: number;
  rows: number;
  bombCount: number;
};

export type GameState = {
  status: GameStatus;
  minefield: number[];
  settings: GameSettings;
  dirtyCells: Record<number, DirtyCell>;
  startTime: number;
  currentTime: number;
};

export type GameAction =
  | { type: Action.FlagCell; payload: number }
  | { type: Action.RevealCell; payload: number }
  | { type: Action.Init; payload: GameSettings }
  | { type: Action.SetCurrentTime; payload: number }
  | { type: Action.Restart };
