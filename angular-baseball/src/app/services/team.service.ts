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
  /**
   * The number in the batting order
   */
  nowBatting: number;

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
    this.nowBatting = 1;
  }

  getTeamRuns(): number {
    return this.runs;
  }

  getTeamHits(): number {
    return this.hits.singles + this.hits.doubles + this.hits.triples + this.hits.homeruns;
  }

  getTeamErrors(): number {
    return this.errors;
  }

  getHomeAwayText(): string {
    if (this.isHome === true) {
      return 'home';
    } else {
      return 'away';
    }
  }

  addTeamHit(hit: string): void {
    this.hits[hit]++;
  }
}
@Injectable({
  providedIn: 'root'
})
export class TeamService {

  public teams: {
    away: Team;
    home: Team;
  };

  private teamAway = new Team('Shelby Villains', false, this.playerService.teamAwayPlayers);
  private teamHome = new Team('Hartford Homers', true, this.playerService.teamHomePlayers);

  constructor(
    private readonly playerService: PlayerService,
  ) {
    this.teams = {
      away: this.teamAway,
      home: this.teamHome
    };
  }

}
