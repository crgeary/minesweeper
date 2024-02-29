import { useEffect, useReducer } from "react";
import { Action, DirtyCell, GameAction, GameSettings, GameState, GameStatus } from "./types";

import { flagCell, initGame, revealCell } from "./actions";
import { makeEmptyMinefield } from ".";

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
    case Action.SetCurrentTime:
      return { ...state, currentTime: action.payload };
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
    minefield: makeEmptyMinefield(defaultGameSettings.rows, defaultGameSettings.columns),
    settings: defaultGameSettings,
    status: GameStatus.NotStarted,
    dirtyCells: {},
    startTime: 0,
    currentTime: 0,
    turns: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const init = (settings: GameSettings) => {
    dispatch({
      type: Action.Init,
      payload: settings,
    });
  };

  const flagCell = (cell: number) => {
    dispatch({
      type: Action.FlagCell,
      payload: cell,
    });
  };

  const revealCell = (cell: number) => {
    dispatch({
      type: Action.RevealCell,
      payload: cell,
    });
  };

  const restart = () => {
    dispatch({
      type: Action.Restart,
    });
  };

  useEffect(() => {
    let intervalId: number;

    if (state.status === GameStatus.Playing) {
      intervalId = setInterval(
        () =>
          dispatch({
            type: Action.SetCurrentTime,
            payload: performance.now(),
          }),
        5,
      );
    }

    return () => clearInterval(intervalId);
  }, [state.status]);

  const flags = Object.keys(state.dirtyCells).filter(
    (k) => state.dirtyCells[Number(k)] === DirtyCell.Flag,
  );

  return {
    state,

    // methods
    init,
    flagCell,
    revealCell,
    restart,

    // state
    flags,
    minefield: state.minefield,
    settings: state.settings,
    status: state.status,
    elapsedTime: (state.currentTime - state.startTime) / 1000,
    turns: state.turns,
  };
}
