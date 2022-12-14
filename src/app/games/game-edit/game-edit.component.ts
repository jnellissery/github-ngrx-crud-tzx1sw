import { Component, OnInit } from '@angular/core';
import { Game } from '../shared/game';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import * as gameActions from '../store/games.actions';
import { GetGame, UpdateGame } from '../store/games.actions';
import { Platform } from '../shared/platform';
import { getAllPlatforms } from '../store/platforms.reducers';
import { getGame1 } from '../store/games.reducers';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css'],
})
export class GameEditComponent implements OnInit {
  title = 'Game Edition';
  game: Game;
  platforms: Platform[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.store.dispatch(GetGame({ payload: +params.id }));
    });
    this.store.select(getAllPlatforms).subscribe((result) => {
      this.platforms = result;
    });
    this.store.select(getGame1).subscribe((game) => {
      if (game != null) {
        this.game = { ...game };
        this.platforms = this.platforms.map((p) => {
          const temp: Platform = { ...p };
          temp.checked = game.platforms.indexOf(p.id) >= 0;
          return temp;
        });
      }
    });
  }

  /**
   * Create a new game
   */
  onSaveGame() {
    let tempplatform: Platform[];
    tempplatform = this.platforms;
    let tempgame: Game;
    tempgame = { ...this.game };
    let index = tempplatform.filter((p) => p.checked === true).map((p) => p.id);
    tempgame.platforms = index;
    this.store.dispatch(UpdateGame({ payload: tempgame }));
  }

  /**
   * If user is in view mode, back to edit mode else go to games page
   */
  onBack() {
    this.router.navigate(['/games']);
  }

  /**
   * Reset all fields in the form
   */
  reset() {
    this.game.name = '';
    this.game.description = '';
    this.game.releaseDate = null;
    this.game.platforms = [];
  }

  /**
   * Delete the selected hero
   */
  delete(game: Game) {
    if (confirm('Are you sure do you want to delete this Game?')) {
      this.store.dispatch(gameActions.RemoveGame({ payload: game }));
    }
  }
}
