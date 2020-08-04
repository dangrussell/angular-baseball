import { Injectable } from '@angular/core';

import { Game, Inning, InningHalf } from './game/game';

import { VarService } from './var.service';
import { TeamService } from './team.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: Game = {
    final: false,
    pitches: 0,
    swings: 0,
    misses: 0,
    taken: 0,
    balls: 0,
    strikes: 0,
    BB: 0,
    K: 0,
    inplay: 0,
    hits: 0,
    outs: 0,
    innings: [],
    teams: [],
  };

  ih: InningHalf = {
    toporbot: 'top',
    runs: 0,
    outs: 0
  };

  constructor(
    public varService: VarService,
    public teamService: TeamService,
    public messageService: MessageService,
  ) { }

  whereAreWe(): void {
    console.log(this.inningHalf(), this.inning());
    console.log(this.game.inning_half_current.outs, 'outs');
  }

  inningCurrent(): Inning {
    return this.game.inning_current;
  }

  inningHalfCurrent(): InningHalf {
    return this.game.inning_half_current;
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

  addInning(i: number): void {
    const inning: Inning = {
      num: i,
      top: {
        toporbot: 'top',
        runs: 0,
        outs: 0,
      },
      bot: {
        toporbot: 'bot',
        runs: 0,
        outs: 0,
      },
    };
    this.game.innings.push(inning);
    console.log('Added inning', i);
  }

  nextInning(): void {
    console.log('End of inning!');

    const ni = this.inning() + 1;

    if (!this.game.innings.find(el => el.num === ni)) {
      this.addInning(ni);
    }

    this.game.inning_current = this.game.innings.find(el => el.num === ni);
  }

  nextInningHalf(): void {
    console.log('End of half inning!');
    this.varService.resetbases();

    this.messageService.message('switchSides');

    if (this.game.inning_half_current.toporbot === 'top') {
      this.game.inning_half_current = this.game.inning_current.bot;
    } else {
      this.nextInning();
      this.game.inning_half_current = this.game.inning_current.top;
    }
  }

  recordOut(): void {
    this.game.outs++;
    // const ih = this.inningHalf();

    this.game.inning_half_current.outs++;

    if ((this.game.outs >= (3 * 2 * this.varService.INNINGS)) && (this.teamService.teamAway.runs !== this.teamService.teamHome.runs)) {
      /*
      this.pitchResult += '<br /><br /><strong>And that\'s the game!</strong>';
      let winner = 'home';
      if (this.teamService.teamAway.runs > this.teamService.teamHome.runs) {
        winner = 'away';
      }
      this.pitchResult += '<br /><br /><strong>The ' + winner + ' team wins!</strong>';
      */
      this.game.final = true;
    } else {
      if (this.game.inning_half_current.outs === 3) {
        this.nextInningHalf();
      }
    }

    this.whereAreWe();

  }

  startGame(): void {
    for (let i = 1; i <= this.varService.INNINGS; i++) {
      this.addInning(i);
      console.log(this.game.innings);
    }

    const startInning = this.game.innings.find(el => el.num === 1);

    this.game.inning_current = startInning;
    this.game.inning_half_current = startInning.top;

    this.whereAreWe();
  }

}
