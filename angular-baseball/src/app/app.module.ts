import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { LineupComponent } from './components/lineup/lineup.component';

import { PositionAbbreviationPipe } from './pipes/position-abbreviation.pipe';

import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
   declarations: [
      AppComponent,
      ScoreboardComponent,
      LineupComponent,
      PositionAbbreviationPipe
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
