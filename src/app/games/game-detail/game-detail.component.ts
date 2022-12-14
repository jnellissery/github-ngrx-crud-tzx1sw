import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import * as gameActions from '../store/games.actions';
import { GetGame } from '../store/games.actions';
import { Observable } from 'rxjs';
import { Game } from '../shared/game';
import { getGame1 } from '../store/games.reducers';
import { Platform } from '../shared/platform';
import { getAllPlatforms } from '../store/platforms.reducers';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css'],
})
export class GameDetailComponent implements OnInit {
  title = 'Game Details';
  game: Observable<Game>;
  platforms: Observable<Platform[]>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.game = this.store.select(getGame1);
    this.platforms = this.store.select(getAllPlatforms);
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.store.dispatch(GetGame({ payload: param.id }));
    });
  }
  /**
   * Delete the selected hero
   */
  delete(game) {
    if (confirm('Are you sure do you want to delete this Game?')) {
      this.store.dispatch(gameActions.RemoveGame({ payload: game }));
    }
  }
}
