import { useReducer } from "react";
import { makeMinefield } from ".";
import { Action, GameAction, GameState, GameStatus } from "./types";
import { flagCell, revealCell } from "./actions";

type UseMineseeperInput = {
  rows: number;
  columns: number;
  bombCount: number;
};

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case Action.FlagCell:
      return flagCell(state, action.payload);
    case Action.RevealCell:
      return revealCell(state, action.payload);
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
