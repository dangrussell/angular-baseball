import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { LineupComponent } from './lineup/lineup.component';
import { LineupPlayerComponent } from './lineup/lineup-player/lineup-player.component';

@NgModule({
   declarations: [
      AppComponent,
      ScoreboardComponent,
      LineupComponent,
      LineupPlayerComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
