import { Injectable } from '@angular/core';

import { Player, PlayerService } from './player.service';

export class Team {
  runs: number;
  hits: {
    singles: number;
    doubles: number;
    triples: number;
    homeruns: number;
  };
  errors: number;
  players: Player[];
  isHome: boolean;
  name: string;

  constructor(
    teamName: string,
    teamIsHome: boolean,
    teamPlayers: Player[]) {
      this.runs = 0;
      this.hits = {
        singles: 0,
        doubles: 0,
        triples: 0,
        homeruns: 0,
      };
      this.errors = 0;
      this.players = teamPlayers;
      this.isHome = teamIsHome;
      this.name = teamName;
  }

  getRuns(): number {
    return this.runs;
  }

  getHits(): number {
    return this.hits.singles + this.hits.doubles + this.hits.triples + this.hits.homeruns;
  }

  getErrors(): number {
    return this.errors;
  }

  getHomeAwayText(): string {
    if (this.isHome === true) {
      return 'home';
    } else {
      return 'away';
    }
  }

  addHit(hit: string): void {
    this.hits[hit]++;
  }
}
@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamAway = new Team('Shelby Villains', false, this.playerService.teamAwayPlayers);
  teamHome = new Team('Hartford Homers', true, this.playerService.teamHomePlayers);

  teams = {
    away: this.teamAway,
    home: this.teamHome
  };

  constructor(public playerService: PlayerService) { }

}
