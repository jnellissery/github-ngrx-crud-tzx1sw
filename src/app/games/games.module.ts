import { NgModule } from '@angular/core';
import { GamesService } from './shared/games.service';
import {
  gamesRoutedComponents,
  GamesRoutingModule,
} from './games-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PlatformsService } from './shared/platforms.service';

// ngrx elements
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './store/games.effects';
import * as gameReducer from './store/games.reducers';
import * as platformReducer from './store/platforms.reducers';
import { PlatformEffects } from './store/platforms.effects';
import { stateSanitizer } from 'store-devtools-switcher';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const reducers: ActionReducerMap<any> = {
  platforms: platformReducer.reducer,
  gamereducer: gameReducer.gameReducer,
};

@NgModule({
  imports: [
    SharedModule,
    GamesRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([GameEffects, PlatformEffects]),
    StoreDevtoolsModule.instrument({
      stateSanitizer: stateSanitizer(),
    }),
  ],
  declarations: [gamesRoutedComponents],
  providers: [GamesService, PlatformsService],
})
export class GamesModule {}
