import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Players } from './../interfaces/player';

export class Player {
  name: string;
  position: number;
  hits: number;
  AB: number;
  battingorder: number;
  team: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  teamAwayPlayers: Player[];
  teamHomePlayers: Player[];

  playersUrl = 'assets/players.json';

  players: Players;

  constructor(private http: HttpClient) {
    this.teamAwayPlayers = [];
    this.teamHomePlayers = [];

    this.getPlayers().subscribe(
      (response: Players) => {
        this.players = {
          ...response
        };
      },
      (err) => console.error(err),
      () => {
        console.log('Players fetched.');

        this.players.data.forEach(player => {
          if (player.team === 0){
            this.teamAwayPlayers.push(player);
          }
          if (player.team === 1){
            this.teamHomePlayers.push(player);
          }
        });
      }
    );
  }

  getPlayers(): Observable<Players> {
    return this.http.get<Players>(this.playersUrl);
  }
}
