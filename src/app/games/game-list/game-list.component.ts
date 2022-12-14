import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Game } from '../shared/game';
import { Observable } from 'rxjs';
import * as gameActions from '../store/games.actions';
import { getAllGames1 } from '../store/games.reducers';
import { PlatformsService } from '../shared/platforms.service';
import { Platform } from '../shared/platform';
import { getAllPlatforms } from '../store/platforms.reducers';
import { GetAllPlatforms } from '../store/platforms.actions';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
})
export class GameListComponent implements OnInit {
  title = 'List of Games';
  games: Observable<Game[]>;
  platforms: Observable<Platform[]>;

  constructor(
    private platformService: PlatformsService,
    private store: Store<AppState>
  ) {
    this.games = this.store.select(getAllGames1);
    this.platforms = this.store.select(getAllPlatforms);
  }

  ngOnInit() {
    this.store.dispatch(new GetAllPlatforms());
    this.store.dispatch(gameActions.ShowAllAction());
  }
  delete(game: Game) {
    if (confirm('Are you sure do you want to delete this Game?')) {
      this.store.dispatch(gameActions.RemoveGame({ payload: game }));
    }
  }
}
