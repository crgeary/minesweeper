export enum Action {
  FlagCell = "flag",
  RevealCell = "reval",
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

export type GameState = {
  minefield: number[];
  status: GameStatus;
  dirtyCells: Map<number, DirtyCell>;
};

export type GameAction =
  | { type: Action.FlagCell; payload: number }
  | { type: Action.RevealCell; payload: number };
