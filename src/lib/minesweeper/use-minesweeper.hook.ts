import { useReducer } from "react";
import { Action, GameAction, GameMode, GameState, GameStatus } from "./types";

import { flagCell, initGame, revealCell } from "./actions";
import { GAME_MODES } from "./constants";
import { makeMinefield } from ".";

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case Action.FlagCell:
      return flagCell(state, action.payload);
    case Action.RevealCell:
      return revealCell(state, action.payload);
    case Action.Init:
      return initGame(
        state,
        action.payload.mode,
        action.payload.mode === GameMode.Custom
          ? action.payload.settings
          : GAME_MODES[action.payload.mode].settings,
      );
    case Action.Restart:
      return initGame(state, state.mode, state.settings);
  }

  return state;
}

type UseMineseeperInput = Partial<{
  defaultMode: Exclude<GameMode, GameMode.Custom>;
}>;

export function useMinesweeper(input: UseMineseeperInput) {
  const defaultMode = input.defaultMode ?? GameMode.Hard;
  const defaultModeSettings = GAME_MODES[defaultMode].settings;

  const initialState: GameState = {
    minefield: makeMinefield(
      defaultModeSettings.rows,
      defaultModeSettings.columns,
      defaultModeSettings.bombCount,
    ),
    mode: defaultMode,
    settings: {
      ...defaultModeSettings,
    },
    status: GameStatus.NotStarted,
    dirtyCells: new Map<number, number>(),
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    minefield: state.minefield,
    state,
    dispatch,

    // ...
    settings: state.settings,
  };
}
