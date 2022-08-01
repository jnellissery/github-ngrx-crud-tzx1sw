import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as gameActions from './games.actions';
import {
  CreateAction,
  CreateFailureAction,
  CreateSuccessAction,
  GetGame,
  GetGameFailureAction,
  GetGameSuccessAction,
  RemoveGame,
  RemoveGameFailure,
  RemoveGameSuccess,
  ShowAllAction,
  ShowAllFailureAction,
  ShowAllSuccessAction,
  UpdateGame,
  UpdateGameFailure,
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
  getAllGames$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ShowAllAction),
      switchMap(() => this.svc.findAll()),
      map(
        (heroes) => ShowAllSuccessAction({ payload: heroes }),
        catchError((err) => of(ShowAllFailureAction({ payload: err })))
      )
    )
  );
  getGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetGame),
      debounceTime(500),
      map((action) => action.payload),
      switchMap((id) =>
        this.svc.findById(id).pipe(
          map((res) => {
            if (res) return GetGameSuccessAction({ payload: res });
            else throw Error;
          }),
          catchError((error) => of(GetGameFailureAction({ payload: error })))
        )
      )
    )
  );
  createGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateAction),
      map((action) => action.payload),
      switchMap((newGame) => this.svc.insert(newGame)),
      map(
        (game) => CreateSuccessAction({ payload: game }),
        catchError((err) => of(CreateFailureAction({ payload: err })))
      )
    )
  );
  updateGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameActions.UPDATE_GAME),
      map((action: UpdateGame) => action.payload),
      switchMap((game) => this.svc.update(game)),
      map(() => new UpdateGameSuccess()),
      catchError((err) => [new UpdateGameError(err)])
    )
  );

  updateRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateGame),
      switchMap((action) => {
        return this.svc.update(action.payload).pipe(
          map((item: any) => {
            return UpdateGameSuccess({ payload: item });
          }),
          catchError((error) => {
            return of(UpdateGameFailure({ payload: error }));
          })
        );
      })
    )
  );

  deleteRequestEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RemoveGame),
      switchMap((action) => {
        return this.svc.delete(action.payload.id).pipe(
          map(() => {
            return RemoveGameSuccess({ payload: action.payload });
          }),
          catchError((error) => {
            return of(RemoveGameFailure({ payload: error }));
          })
        );
      })
    )
  );
}
