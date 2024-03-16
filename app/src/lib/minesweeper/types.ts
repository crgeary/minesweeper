import { DirtyCells, GameSettings, GameStatus } from "@crgeary/minesweeper";

export enum Action {
  FlagCell = "flag",
  RevealCell = "reval",
  Init = "init",
  Restart = "restart",
  SetCurrentTime = "set-current-time",
}

export enum TurnAction {
  FlagCell = "flag",
  UnflagCell = "unflag",
  RevealCell = "reveal",
}

export type GameTurn = {
  action: TurnAction;
  cell: number;
};

export type GameState = {
  status: GameStatus;
  minefield: number[];
  settings: GameSettings;
  dirtyCells: DirtyCells;
  startTime: number;
  currentTime: number;
  turns: GameTurn[];
};

export type GameAction =
  | { type: Action.FlagCell; payload: number }
  | { type: Action.RevealCell; payload: number }
  | { type: Action.Init; payload: GameSettings }
  | { type: Action.SetCurrentTime; payload: number }
  | { type: Action.Restart };
