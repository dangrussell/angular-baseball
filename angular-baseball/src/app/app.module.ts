import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineupPlayerComponent } from './components/lineup/lineup-player/lineup-player.component';
import { LineupComponent } from './components/lineup/lineup.component';
import { SceneComponent } from './components/scene/scene.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { httpInterceptorProviders } from './http-interceptors';
import { PositionAbbreviationPipe } from './pipes/position-abbreviation.pipe';
import { pitchReducer } from './reducers/pitch.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ pitch: pitchReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    ScoreboardComponent,
    LineupComponent,
    LineupPlayerComponent,
    PositionAbbreviationPipe,
    SceneComponent,
  ],
  providers: [
    httpInterceptorProviders,
  ],
  bootstrap: [
    AppComponent,
  ],
  exports: [
    AppComponent,
  ],
})
export class AppModule { }
