export enum Cell {
  Empty = 0,
  Mine = -1,
}

export enum DirtyCell {
  Flag = 1,
  Reveal = -1,
}

export enum GameStatus {
  NotStarted = "not-started",
  Playing = "playing",
  Won = "won",
  Lost = "lost",
}

export type GameSettings = {
  columns: number;
  rows: number;
  mineCount: number;
};

export type Minefield = number[];

export type DirtyCells = Record<number, DirtyCell>;
