import * as gameActions from './games.actions';
import { AppAction } from '../../app.action';
import {
  createFeatureSelector,
  createSelector,
  createReducer,
  on,
  Action,
} from '@ngrx/store';
import { Game } from '../shared/game';

export interface State {
  data: Game[];
  selected: Game;
  action: string;
  done: boolean;
  error?: Error;
}

const initialState: State = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null,
};

export function reducer(state = initialState, action: AppAction): State {
  // ...state create immutable state object
  switch (action.type) {
    case gameActions.UPDATE_GAME:
      return {
        ...state,
        selected: action.payload,
        action: gameActions.UPDATE_GAME,
        done: false,
        error: null,
      };
    case gameActions.UPDATE_GAME_SUCCESS: {
      const index = state.data.findIndex((h) => h.id === state.selected.id);
      if (index >= 0) {
        const data = [
          ...state.data.slice(0, index),
          state.selected,
          ...state.data.slice(index + 1),
        ];
        return {
          ...state,
          data,
          done: true,
          selected: null,
          error: null,
        };
      }
      return state;
    }
    case gameActions.UPDATE_GAME_ERROR:
      return {
        ...state,
        done: true,
        selected: null,
        error: action.payload,
      };

      return state;
  }
}

const _gameReducer = createReducer(
  initialState,
  on(gameActions.ShowAllAction, (state) => ({
    ...state,
  })),
  on(gameActions.ShowAllSuccessAction, (state, { payload }) => {
    return {
      ...state,
      data: payload
    };
  }),
  on(gameActions.ShowAllFailureAction, (state, { payload }) => ({
    ...state,
    data: [],
    message: 'ShowAll Failure',
  })),
  on(gameActions.CreateSuccessAction, (state, { payload }) => ({
    ...state,
    data: [payload],
  })),
  on(gameActions.CreateFailureAction, (state, { payload }) => ({
    ...state,
    data: payload,
  })),
  on(gameActions.GetGameSuccessAction, (state, { payload }) => ({
    ...state,
    data: payload,
  })),
  on(gameActions.GetGameFailureAction, (state, { payload }) => ({
    ...state,
    data: payload,
  })),
  on(gameActions.RemoveGame, (state) => ({
    ...state,
    data: state.data
  })),
  on(gameActions.RemoveGameSuccess, (state, { payload }) => {
    const selecteduser = state;
    console.log(selecteduser);
    return { ...state, data: selecteduser };
  }),

  on(gameActions.RemoveGameFailure, (state, { payload }) => ({
    ...state,
    data: payload,
  }))
);
export function gameReducer(state: any, action: Action) {
  return _gameReducer(state, action);
}
export const getGamesState1 = createFeatureSelector<State>('gamereducer');

export const getAllGames1 = createSelector(
  getGamesState1,
  (state: State) => state.data
);

export const getGame1 = createSelector(
  getGamesState1,
  (state: State) => state.data
);
/*************************
 * SELECTORS
 ************************/
export const getGamesState = createFeatureSelector<State>('games1');

export const getAllGames = createSelector(
  getGamesState,
  (state: State) => state.data
);

export const isDeleted = createSelector(
  getGamesState,
  (state: State) =>
    state.action === gameActions.DELETE_GAME && state.done && !state.error
);
export const isCreated = createSelector(
  getGamesState,
  (state: State) =>
    state.action === gameActions.CREATE_GAME && state.done && !state.error
);
export const isUpdated = createSelector(
  getGamesState,
  (state: State) =>
    state.action === gameActions.UPDATE_GAME && state.done && !state.error
);
