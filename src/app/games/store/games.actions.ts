import { Action, createAction, props } from '@ngrx/store';
import { Game } from '../shared/game';

export const GET_GAMES = '[ALL] Games';
export const GET_GAMES_SUCCESS = '[ALL] Games Success';
export const GET_GAMES_ERROR = '[ALL] Games Error';

export const GET_GAME = '[GET] Game';
export const GET_GAME_SUCCESS = '[GET] Games Success';
export const GET_GAME_ERROR = '[GET] Games Error';

export const CREATE_GAME = '[CREATE] Game';
export const CREATE_GAME_SUCCESS = '[CREATE] Game Success';
export const CREATE_GAME_ERROR = '[CREATE] Game Error';

export const DELETE_GAME = '[DELETE] Game';
export const DELETE_GAME_SUCCESS = '[DELETE] Game Success';
export const DELETE_GAME_ERROR = '[DELETE] Game Error';

export const UPDATE_GAME = '[UPDATE] Game';
export const UPDATE_GAME_SUCCESS = '[UPDATE] Game Success';
export const UPDATE_GAME_ERROR = '[UPDATE] Game Error';

/****************************************
 * GET all the games
 ****************************************/
export const ShowAllAction = createAction(GET_GAMES);
export const ShowAllSuccessAction = createAction(GET_GAMES_SUCCESS, props<{ payload: Game[] }>());
export const ShowAllFailureAction = createAction(GET_GAMES_ERROR,props<{ payload: Error }>());


export const CreateAction = createAction('[GAME] Create', props<{ payload: Game}>());
export const CreateSuccessAction = createAction('[GAME] Create Success', props<{ payload: Game}>());
export const CreateFailureAction = createAction('[GAME] Create Failure', props<{ payload: any}>());


export const GetGame = createAction('[GAME] get', props<{ payload: number}>());
export const GetGameSuccessAction = createAction('[GAME] get Game Success', props<{ payload: Game}>());
export const GetGameFailureAction = createAction('[GAME] get Game Failure', props<{ payload: any}>());
/****************************************
 * REMOVE a game by id
 ****************************************/
 export const RemoveGame = createAction('[GAME] get', props<{ payload: number}>());
 export const RemoveGameSuccess = createAction('[GAME] get Game Success', props<{ payload: Game}>());
 export const RemoveGameFailure = createAction('[GAME] get Game Failure', props<{ payload: any}>());

/****************************************
 * UPDATE game by id
 ****************************************/
export class UpdateGame implements Action {
  readonly type = UPDATE_GAME;

  constructor(public payload: Game) {}
}

export class UpdateGameSuccess implements Action {
  readonly type = UPDATE_GAME_SUCCESS;
}

export class UpdateGameError implements Action {
  readonly type = UPDATE_GAME_ERROR;

  constructor(public payload: Error) {}
}
