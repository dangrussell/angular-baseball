import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineupPlayerComponent } from './components/lineup/lineup-player/lineup-player.component';
import { LineupComponent } from './components/lineup/lineup.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { httpInterceptorProviders } from './http-interceptors';
import { PositionAbbreviationPipe } from './pipes/position-abbreviation.pipe';

@NgModule({
   declarations: [
      AppComponent,
      ScoreboardComponent,
      LineupComponent,
      LineupPlayerComponent,
      PositionAbbreviationPipe,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule
   ],
   providers: [
    httpInterceptorProviders
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
