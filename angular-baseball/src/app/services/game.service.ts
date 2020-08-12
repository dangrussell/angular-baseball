import { Injectable } from '@angular/core';

import { VarService } from './var.service';
import { TeamService } from './team.service';
import { MessageService } from './message.service';
import { Team } from '../interfaces/team';

class PlateAppearance {
  balls: number;
  strikes: number;
  inplay: boolean;
  hit: boolean;
  out: boolean;

  constructor() {
    this.balls = 0;
    this.strikes = 0;
    this.inplay = false;
    this.hit = false;
    this.out = false;
  }

  ball(): void {
    this.balls++;
  }

  strike(): void {
    this.strikes++;
  }

  reset(): void {
    this.balls = 0;
    this.strikes = 0;
    this.inplay = false;
  }
}

class Bases {
  first: boolean;
  second: boolean;
  third: boolean;

  constructor() {
    this.first = false;
    this.second = false;
    this.third = false;
  }

  reset(): void {
    this.first = false;
    this.second = false;
    this.third = false;
  }
}

class InningHalf {
  toporbot: string;
  outs: number;
  runs: number;

  constructor(toporbot: string) {
    this.toporbot = toporbot;
    this.outs = 0;
    this.runs = 0;
  }
}

class Inning {
  num: number;
  top: InningHalf;
  bot: InningHalf;

  constructor(num: number) {
    this.num = num;
    this.top = new InningHalf('top');
    this.bot = new InningHalf('bot');
  }
}

export class Game {
  final: boolean;
  pitches: number;
  swings: number;
  misses: number;
  taken: number;
  balls: number;
  strikes: number;
  BB: number;
  K: number;
  inplay: number;
  hits: number;
  outs: number;
  inningCurrent: Inning;
  inningHalfCurrent: InningHalf;
  innings: Inning[];
  teams: Team[];
  situation: {
    pa: PlateAppearance;
    bases: Bases;
  };

  constructor(gameTeams: Team[], gameInnings: number) {
    this.final = false;
    this.pitches = 0;
    this.swings = 0;
    this.misses = 0;
    this.taken = 0;
    this.balls = 0;
    this.strikes = 0;
    this.BB = 0;
    this.K = 0;
    this.inplay = 0;
    this.hits = 0;
    this.outs = 0;
    this.inningCurrent = new Inning(1);
    this.inningHalfCurrent = new InningHalf('top');
    this.innings = [];
    this.teams = gameTeams;
    this.situation = {
      pa: new PlateAppearance(),
      bases: new Bases()
    };

    for (let i = 1; i <= gameInnings; i++) {
      this.addInning(i);
      // console.log(this.game.innings);
    }

    const startInning = this.innings.find(el => el.num === 1);

    this.inningCurrent = startInning;
    this.inningHalfCurrent = startInning.top;
  }

  addInning(i: number): void {
    const inning = new Inning(i);
    this.innings.push(inning);
    // console.log('Added inning', i);
  }
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: Game;

  constructor(
    public varService: VarService,
    public teamService: TeamService,
    public messageService: MessageService,
  ) {
    this.game = new Game(this.teamService.teams, this.varService.INNINGS);
  }

  whereAreWe(): void {
    console.log(this.inningHalf(), this.inning());
    console.log(this.game.inningHalfCurrent.outs, 'outs');
  }

  inningCurrent(): Inning {
    return this.game.inningCurrent;
  }

  inningHalfCurrent(): InningHalf {
    return this.game.inningHalfCurrent;
  }

  inning(inning: Inning = this.inningCurrent()): number {
    return inning.num;
  }

  inningHalf(inningHalf: InningHalf = this.inningHalfCurrent()): string {
    return inningHalf.toporbot;
  }

  inningTotal(): number {
    return this.game.innings.length;
  }

  nextInning(): void {
    console.log('End of inning!');

    const ni = this.inning() + 1;

    if (!this.game.innings.find(el => el.num === ni)) {
      this.game.addInning(ni);
    }

    this.game.inningCurrent = this.game.innings.find(el => el.num === ni);
  }

  nextInningHalf(): void {
    console.log('End of half inning!');
    this.game.situation.bases.reset();

    if (this.game.inningHalfCurrent.toporbot === 'top') {
      this.game.inningHalfCurrent = this.game.inningCurrent.bot;
    } else {
      this.nextInning();
      this.game.inningHalfCurrent = this.game.inningCurrent.top;
    }

    const ordinal = this.varService.ordinal(this.game.inningCurrent.num);

    this.messageService.switchSides(this.game.inningHalfCurrent, this.game.inningCurrent, ordinal);
  }

  recordOut(): void {
    this.game.outs++;

    this.game.inningHalfCurrent.outs++;

    if ((this.game.outs >= (3 * 2 * this.varService.INNINGS)) && (this.teamService.teamAway.runs !== this.teamService.teamHome.runs)) {

      this.messageService.message('game-over', 1);

      if (this.teamService.teamAway.runs > this.teamService.teamHome.runs) {
        this.messageService.message('winner-away', 0);
      } else {
        this.messageService.message('winner-home', 0);
      }
      this.game.final = true;
    } else {
      if (this.game.inningHalfCurrent.outs === 3) {
        this.nextInningHalf();
      }
    }

    this.whereAreWe();

  }

  startGame(): void {
    this.whereAreWe();
  }

  resetGame(): void {
    this.game = new Game(this.teamService.teams, this.varService.INNINGS);
    this.startGame();
  }

}
