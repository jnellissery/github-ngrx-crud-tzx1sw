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
export const gameReducer = createReducer(
  initialState,
  on(gameActions.ShowAllAction, (state: State) => {
    return {
      ...state,
      data: state.data,
    };
  }),
  on(gameActions.ShowAllSuccessAction, (state, { payload }) => {
    return {
      ...state,
      data: payload,
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
  on(gameActions.RemoveGameSuccess, (state: State, { payload }) => {
    const data = state.data.filter((h) => h.id !== payload.id);
    return {
      ...state,
      data,
    };
  }),
  on(gameActions.RemoveGameFailure, (state, { payload }) => ({
    ...state,
    data: payload,
  })),
  on(gameActions.UpdateGameSuccess, (state, { payload }) => {
    const data = payload;
    console.log('updated', payload);
    return {
      ...state,
      data,
    };
  }),
  on(gameActions.UpdateGameFailure, (state, { payload }) => ({
    ...state,
    data: payload,
  }))
);
export const getGamesState1 = createFeatureSelector<State>('gamereducer');
export const getAllGames1 = createSelector(
  getGamesState1,
  (state: State) => state.data
);
export const getGame1 = createSelector(
  getGamesState1,
  (state: State) => state.data
);
