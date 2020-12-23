import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  teamAwayPlayers: Player[] = [];
  teamHomePlayers: Player[] = [];

  playersUrl = 'assets/players.json';

  players: Players;

  constructor(private http: HttpClient) {}

  public getPlayers(): Observable<Players> {
    return this.http.get<Players>(this.playersUrl);
  }
}
