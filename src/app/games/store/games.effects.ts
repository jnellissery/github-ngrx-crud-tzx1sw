import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
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
  GetGameFailureAction,
  GetGameSuccess,
  GetGameSuccessAction,
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
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';

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

  getGame$ = createEffect(() =>
  this.actions$.pipe(
    ofType(GetGame),
	debounceTime(500),
    map((action) => action.payload),
    switchMap((id) => this.svc.findById(id).pipe (
	map((res) => {
            if (res )
              return GetGameSuccessAction({ payload: res });
            else throw Error;
          }),
          catchError((error) =>
            of(GetGameFailureAction({ payload: error }))
          )
        )
		)
     
  ));

  // @Effect()
  // getGame$ = this.actions$.pipe(
  //   ofType(GetGame),
  //   map((action) => action.payload),
  //   switchMap((id) => this.svc.findById(id)),
  //   map((hero) => {
  //     GetGameSuccessAction({ payload: hero });
  //   }),
  //   catchError((err) => of(GetGameFailureAction({ payload: err })))
  // );

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
