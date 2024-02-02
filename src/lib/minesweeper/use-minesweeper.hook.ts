import { useReducer } from "react";
import { flagCell, makeMinefield } from ".";
import { Action, DirtyCell, GameAction, GameState, GameStatus } from "./types";

type UseMineseeperInput = {
  rows: number;
  columns: number;
  bombCount: number;
};

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case Action.FlagCell:
      return {
        ...state,
        status: GameStatus.Playing,
        dirtyCells: flagCell(state.dirtyCells, action.payload),
      };
    case Action.RevealCell:
      return {
        ...state,
        status: GameStatus.Playing,
        dirtyCells: new Map(state.dirtyCells.set(action.payload, DirtyCell.Reveal)),
      };
  }

  return state;
}

export function useMinesweeper(input: UseMineseeperInput) {
  const initialState: GameState = {
    minefield: makeMinefield(input.rows, input.columns, input.bombCount),
    status: GameStatus.NotStarted,
    dirtyCells: new Map<number, number>(),
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    minefield: state.minefield,
    state,
    dispatch,
  };
}
