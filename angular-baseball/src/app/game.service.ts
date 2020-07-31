import { Injectable } from '@angular/core';

import { Game, Inning, HalfInning } from './game/game';

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
    inning_current: 1,
    innings: [],
    teams: [],
  };

  ih: HalfInning = {
    toporbot: 'top',
    runs: 0,
    outs: 0
  };

  constructor(
    public varService: VarService,
    public teamService: TeamService,
    public messageService: MessageService,
  ) { }

  wherearewe(): void {
    console.log(this.inningHalf(), this.inning());
  }

  inning(): number {
    return this.game.inning_current;
  }

  inningHalf(): string {
    return this.ih.toporbot;
  }

  switchsides(): void {
    this.varService.resetbases();

    this.messageService.message('switchsides');

    const i = this.inning();
    const ih = this.inningHalf();

    if (ih === 'top') {
      this.ih.toporbot = 'bot';
    } else {
      this.ih.toporbot = 'top';
    }

    this.game.innings[i][ih].runs = 0;

    this.game.innings[i][ih].outs = 0;
  }

  startinning(): void {
    const i = this.inning();
    if (!this.game.innings.find(el => el.num === i)) {
      this.game.innings.push(
        {
          num: i,
          top: {
              toporbot: 'top',
              outs: 0,
              runs: 0,
            },
          bot: {
              toporbot: 'bot',
              outs: 0,
              runs: 0,
            }
        }
      );
    }
  }

  recordout(): void {
    this.game.outs++;
    const i = this.inning();
    const ih = this.inningHalf();
    this.game.innings[i][ih].outs++;

    if ((this.game.outs >= (3 * 2 * 9)) && (this.teamService.teamAway.runs !== this.teamService.teamHome.runs)) {
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
      if ((this.game.outs % 3) === 0) {
        console.log('End of half inning!');

        this.game.innings[i][ih].runs = 0;

        this.game.innings[i][ih].outs = 0;

        if ((this.game.outs % 6) === 0) {
          console.log('End of inning!');
          this.game.inning_current++;
          this.startinning();
        }

        this.switchsides();

        this.wherearewe();
      }
    }

  }

  startgame(): void {
    this.wherearewe();
    for (let i = 0; i <= this.varService.INNINGS; i++) {
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
    }
    this.startinning();
  }

}
