import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as gameActions from './games.actions';
import {
  AddGame,
  AddGameError,
  AddGameSuccess,
  CreateAction,
  CreateFailureAction,
  CreateSuccessAction,
  GetGame,
  GetGameError,
  GetGameSuccess,
  RemoveGame,
  RemoveGameError,
  RemoveGameSuccess,
  ShowAllAction,
  ShowAllFailureAction,
  ShowAllSuccessAction,
  UpdateGame,
  UpdateGameError,
  UpdateGameSuccess,
} from './games.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { GamesService } from '../shared/games.service';
import { Game } from '../shared/game';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class GameEffects {
  constructor(private actions$: Actions, private svc: GamesService) {}

  @Effect()
  getAllGames$: Observable<Action> = this.actions$.pipe(
    ofType(ShowAllAction),
    switchMap(() => this.svc.findAll()),
    map(
      (heroes) => ShowAllSuccessAction({ payload: heroes }),
      catchError((err) => of(ShowAllFailureAction({ payload: err })))
    )
  );

  @Effect()
  getGame$ = this.actions$.pipe(
    ofType(gameActions.GET_GAME),
    map((action: GetGame) => action.payload),
    switchMap((id) => this.svc.findById(id)),
    map((hero) => new GetGameSuccess(hero)),
    catchError((err) => [new GetGameError(err)])
  );

  @Effect()
  updateGame$ = this.actions$.pipe(
    ofType(gameActions.UPDATE_GAME),
    map((action: UpdateGame) => action.payload),
    switchMap((game) => this.svc.update(game)),
    map(() => new UpdateGameSuccess()),
    catchError((err) => [new UpdateGameError(err)])
  );

  @Effect()
  createGame$ = this.actions$.pipe(
    ofType(CreateAction),
    map((action) => action.payload),
    switchMap((newGame) => this.svc.insert(newGame)),
    map(
      (game) => CreateSuccessAction({ payload: game }),
      catchError((err) => of(CreateFailureAction({ payload: err })))
    )
  );

  @Effect()
  removeGame$ = this.actions$.pipe(
    ofType(gameActions.DELETE_GAME),
    map((action: RemoveGame) => action.payload),
    switchMap((id) => this.svc.delete(id)),
    map((hero: Game) => new RemoveGameSuccess(hero)),
    catchError((err) => [new RemoveGameError(err)])
  );
}
