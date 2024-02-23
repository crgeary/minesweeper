import { useReducer } from "react";
import { Action, DirtyCell, GameAction, GameSettings, GameState, GameStatus } from "./types";

import { flagCell, initGame, revealCell } from "./actions";
import { makeMinefield } from ".";

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case Action.FlagCell:
      return flagCell(state, action.payload);
    case Action.RevealCell:
      return revealCell(state, action.payload);
    case Action.Init:
      return initGame(state, action.payload);
    case Action.Restart:
      return initGame(state, state.settings);
  }

  return state;
}

type UseMineseeperInput = Partial<{
  defaultGameSettings: GameSettings;
}>;

export function useMinesweeper(input: UseMineseeperInput) {
  const defaultGameSettings = input.defaultGameSettings ?? {
    rows: 4,
    columns: 4,
    bombCount: 10,
  };

  const initialState: GameState = {
    minefield: makeMinefield(
      defaultGameSettings.rows,
      defaultGameSettings.columns,
      defaultGameSettings.bombCount,
    ),
    settings: defaultGameSettings,
    status: GameStatus.NotStarted,
    dirtyCells: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const flags = Object.keys(state.dirtyCells).filter(
    (k) => state.dirtyCells[Number(k)] === DirtyCell.Flag,
  );

  return {
    minefield: state.minefield,
    state,
    dispatch,

    // ...

    flags,
    settings: state.settings,
    status: state.status,
  };
}
