import { Component, OnInit } from '@angular/core';

import { VarService } from './services/var.service';
import { Game, GameService } from './services/game.service';
import { TeamService } from './services/team.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    VarService,
    GameService,
    TeamService,
    MessageService,
  ]
})
export class AppComponent implements OnInit {

  title = 'angular-baseball';

  showbuttons = false;

  pitchOutcome = 0;

  // game.innings[game.inning].top.runs = 0;

  pitchOutput = '';

  game: Game;

  constructor(
    public varService: VarService,
    public gameService: GameService,
    public teamService: TeamService,
    public messageService: MessageService,
  ) {
    this.game = this.gameService.game;
  }



  recordStrike(strikekind: string, zone?: boolean): void {
    this.game.strikes++;

    this.game.situation.pa.strike();

    if (strikekind === 'looking') {
      this.game.taken++;
      this.messageService.message('taken-strike');
    }
    if (strikekind === 'swinging') {
      this.game.misses++;
      if (zone === false) {
        this.messageService.message('swing-miss-ball');
      }
      if (zone === true) {
        this.messageService.message('swing-miss-strike');
      }
    }

    if (this.game.situation.pa.strikes === 3) {
      this.recordK(strikekind);
    }
  }

  recordK(strikekind: string): void {
    if (strikekind === 'looking') {
      this.messageService.message('K-looking');
    }
    if (strikekind === 'swinging') {
      this.messageService.message('K-swinging');
    }
    this.game.situation.pa.reset();
    this.game.K++;
    this.gameService.recordOut();
  }

  recordBall(): void {
    this.game.balls++;

    this.game.situation.pa.ball();

    if (this.game.situation.pa.balls === 4) {
      this.game.situation.pa.reset();
      this.messageService.message('BB');
      this.game.BB++;

      this.advanceRunners('BB');
    }
  }

  advanceRunners(outcome: string): void {
    if (this.game.situation.bases.first && this.game.situation.bases.second && this.game.situation.bases.third) { // bases loaded
      if (outcome === 'BB') {
        this.game.situation.bases.first = true;
        this.game.situation.bases.second = true;
        this.game.situation.bases.third = true;
        this.recordRuns(1);
      }
      if (outcome === '1B') {
        this.game.situation.bases.first = true;
        this.game.situation.bases.second = true;
        this.game.situation.bases.third = false;
        this.recordRuns(2);
      }
      if (outcome === '2B') {
        this.game.situation.bases.first = false;
        this.game.situation.bases.second = true;
        this.game.situation.bases.third = true;
        this.recordRuns(2);
      }
      if (outcome === '3B') {
        this.game.situation.bases.first = false;
        this.game.situation.bases.second = false;
        this.game.situation.bases.third = true;
        this.recordRuns(3);
      }
      if (outcome === 'HR') {
        this.game.situation.bases.reset();
        this.recordRuns(4);
      }
      return;
    }
    if (this.game.situation.bases.first && this.game.situation.bases.second && !this.game.situation.bases.third) { // 2 on, first & second
      if (outcome === 'BB') {
        this.game.situation.bases.first = true;
        this.game.situation.bases.second = true;
        this.game.situation.bases.third = true;
      }
      if (outcome === '1B') {
        this.game.situation.bases.first = true;
        this.game.situation.bases.second = true;
        this.game.situation.bases.third = false;
        this.recordRuns(1);
      }
      if (outcome === '2B') {
        this.game.situation.bases.first = false;
        this.game.situation.bases.second = true;
        this.game.situation.bases.third = true;
        this.recordRuns(1);
      }
      if (outcome === '3B') {
        this.game.situation.bases.first = false;
        this.game.situation.bases.second = false;
        this.game.situation.bases.third = true;
        this.recordRuns(2);
      }
      if (outcome === 'HR') {
        this.game.situation.bases.reset();
        this.recordRuns(3);
      }
      return;
    }
    if (this.game.situation.bases.first && !this.game.situation.bases.second && this.game.situation.bases.third) { // 2 on, corners
      if (outcome === 'BB') {
        this.game.situation.bases.first = true;
        this.game.situation.bases.second = true;
        this.game.situation.bases.third = true;
      }
      if (outcome === '1B') {
        this.game.situation.bases.first = true;
        this.game.situation.bases.second = true;
        this.game.situation.bases.third = false;
        this.recordRuns(1);
      }
      if (outcome === '2B') {
        this.game.situation.bases.first = false;
        this.game.situation.bases.second = true;
        this.game.situation.bases.third = true;
        this.recordRuns(1);
      }
      if (outcome === '3B') {
        this.game.situation.bases.first = false;
        this.game.situation.bases.second = false;
        this.game.situation.bases.third = true;
        this.recordRuns(2);
      }
      if (outcome === 'HR') {
        this.game.situation.bases.reset();
        this.recordRuns(3);
      }
      return;
    }
    if (!this.game.situation.bases.first && this.game.situation.bases.second && this.game.situation.bases.third) { // 2 on, second & third
      if (outcome === 'BB') {
        this.game.situation.bases.first = true;
        this.game.situation.bases.second = true;
        this.game.situation.bases.third = true;
      }
      if (outcome === '1B') {
        this.game.situation.bases.first = true;
        this.game.situation.bases.second = false;
        this.game.situation.bases.third = false;
        this.recordRuns(2);
      }
      if (outcome === '2B') {
        this.game.situation.bases.first = false;
        this.game.situation.bases.second = true;
        this.game.situation.bases.third = false;
        this.recordRuns(2);
      }
      if (outcome === '3B') {
        this.game.situation.bases.first = false;
        this.game.situation.bases.second = false;
        this.game.situation.bases.third = true;
        this.recordRuns(2);
      }
      if (outcome === 'HR') {
        this.game.situation.bases.reset();
        this.recordRuns(3);
      }
      return;
    }
    if (this.game.situation.bases.first && !this.game.situation.bases.second && !this.game.situation.bases.third) { // 1 on, first
      if (outcome === 'BB') {
        this.game.situation.bases.first = true;
        this.game.situation.bases.second = true;
      }
      if (outcome === '1B') {
        this.game.situation.bases.first = true;
        this.game.situation.bases.second = true;
        this.game.situation.bases.third = false;
      }
      if (outcome === '2B') {
        this.game.situation.bases.first = false;
        this.game.situation.bases.second = true;
        this.game.situation.bases.third = true;
      }
      if (outcome === '3B') {
        this.game.situation.bases.first = false;
        this.game.situation.bases.second = false;
        this.game.situation.bases.third = true;
        this.recordRuns(1);
      }
      if (outcome === 'HR') {
        this.game.situation.bases.reset();
        this.recordRuns(2);
      }
      return;
    }
    if (!this.game.situation.bases.first && this.game.situation.bases.second && !this.game.situation.bases.third) { // 1 on, second
      if (outcome === 'BB') {
        this.game.situation.bases.first = true;
        this.game.situation.bases.second = true;
      }
      if (outcome === '1B') {
        this.game.situation.bases.first = true;
        this.game.situation.bases.second = false;
        this.game.situation.bases.third = false;
        this.recordRuns(1);
      }
      if (outcome === '2B') {
        this.game.situation.bases.first = false;
        this.game.situation.bases.second = true;
        this.game.situation.bases.third = false;
        this.recordRuns(1);
      }
      if (outcome === '3B') {
        this.game.situation.bases.first = false;
        this.game.situation.bases.second = false;
        this.game.situation.bases.third = true;
        this.recordRuns(1);
      }
      if (outcome === 'HR') {
        this.game.situation.bases.reset();
        this.recordRuns(2);
      }
      return;
    }
    if (!this.game.situation.bases.first && !this.game.situation.bases.second && this.game.situation.bases.third) { // 1 on, third
      if (outcome === 'BB') {
        this.game.situation.bases.first = true;
        this.game.situation.bases.third = true;
      }
      if (outcome === '1B') {
        this.game.situation.bases.first = true;
        this.game.situation.bases.second = false;
        this.game.situation.bases.third = false;
        this.recordRuns(1);
      }
      if (outcome === '2B') {
        this.game.situation.bases.first = false;
        this.game.situation.bases.second = true;
        this.game.situation.bases.third = false;
        this.recordRuns(1);
      }
      if (outcome === '3B') {
        this.game.situation.bases.first = false;
        this.game.situation.bases.second = false;
        this.game.situation.bases.third = true;
        this.recordRuns(1);
      }
      if (outcome === 'HR') {
        this.game.situation.bases.reset();
        this.recordRuns(2);
      }
      return;
    }
    if (!this.game.situation.bases.first && !this.game.situation.bases.second && !this.game.situation.bases.third) { // no one on base
      if (outcome === 'BB') {
        this.game.situation.bases.first = true;
      }
      if (outcome === '1B') {
        this.game.situation.bases.first = true;
      }
      if (outcome === '2B') {
        this.game.situation.bases.second = true;
      }
      if (outcome === '3B') {
        this.game.situation.bases.third = true;
      }
      if (outcome === 'HR') {
        this.recordRuns(1);
      }
      return;
    }
  }

  recordHit(): void {
    this.game.hits++;

    this.messageService.message('hit');

    const roll = this.varService.rand(0, 100);

    if (roll <= this.varService.ODDS3B) { // rarest
      this.teamService.teambatting(this.gameService.inningHalf()).hits.triples++;
      this.advanceRunners('3B');
      this.messageService.message('3B');
    } else if (roll <= this.varService.ODDSHR) { // second rarest
      this.teamService.teambatting(this.gameService.inningHalf()).hits.homeruns++;
      this.advanceRunners('HR');
      this.messageService.message('HR');
    } else if (roll <= this.varService.ODDS2B) { // second most common
      this.teamService.teambatting(this.gameService.inningHalf()).hits.doubles++;
      this.advanceRunners('2B');
      this.messageService.message('2B');
    } else { // most common
      this.teamService.teambatting(this.gameService.inningHalf()).hits.singles++;
      this.advanceRunners('1B');
      this.messageService.message('1B');
    }
  }

  recordRuns(runs: number): void {
    this.gameService.inningHalfCurrent().runs = this.gameService.inningHalfCurrent().runs + runs;

    const ih = this.gameService.inningHalf();
    this.teamService.teambatting(ih).runs = this.teamService.teambatting(ih).runs + runs;
  }

  inPlay(): void {
    this.game.situation.pa.inplay = true;
    this.game.inplay++;

    if (this.varService.rand(1, 100) <= this.varService.BABIP) {
      this.game.situation.pa.hit = true;

      this.recordHit();
    } else {
      this.game.situation.pa.out = true;

      this.messageService.message('out');

      this.gameService.recordOut();
    }

    this.game.situation.pa.reset();
  }

  swing(zone: boolean): void {
    let contact: number;

    if (zone === false) {
      contact = this.varService.OCONTACT;
    }
    if (zone === true) {
      contact = this.varService.ZCONTACT;
    }

    // this.messageService.message('swing');
    this.game.swings++;

    this.pitchOutcome = this.varService.rand(1, 100);
    if (this.pitchOutcome <= contact) {
      // Contact!
      if (zone === false) {
        this.messageService.message('swing-hit-ball');
      }
      if (zone === true) {
        this.messageService.message('swing-hit-strike');
      }

      this.inPlay();
    } else {
      // Missed
      this.recordStrike('swinging', zone);
    }
  }

  take(zone: boolean): void {
    if (zone === false) {
      this.messageService.message('taken-ball');
      this.recordBall();
    }
    if (zone === true) {

      this.recordStrike('looking');
    }
  }

  resetGame(): void {
    this.game.pitches = 0;
    this.game.swings = 0;
    this.game.misses = 0;
    this.game.taken = 0;
    this.game.balls = 0;
    this.game.strikes = 0;
    this.game.BB = 0;
    this.game.K = 0;
    this.game.inplay = 0;
    this.game.hits = 0;
    this.game.outs = 0;
    this.game.inningCurrent = null;

    this.messageService.pitchResult = '';
    this.pitchOutput = '';

    this.game.situation.pa.reset();
    this.game.situation.bases.reset();

    this.gameService.startGame();
  }

  pitch(pitches = 1): void {
    for (let i = 1; i <= pitches; i++) {
      if (this.game.final === false) {
        this.messageService.pitchResult = ''; // clear pitch result

        this.game.pitches++;
        this.messageService.message('pitch');

        let zone: boolean;

        // Inside strike zone?
        this.pitchOutcome = this.varService.rand(1, 100);
        if (this.pitchOutcome <= this.varService.ZONE) {
          // Inside the zone
          zone = true;

          this.pitchOutcome = this.varService.rand(1, 100);
          if (this.pitchOutcome <= this.varService.ZSWING) {
            // Pitch swung on
            this.swing(zone);
          } else {
            // Pitch taken
            this.take(zone);
          }
        } else {
          // Outside the zone
          zone = false;

          this.pitchOutcome = this.varService.rand(1, 100);
          if (this.pitchOutcome <= this.varService.OSWING) {
            // Pitch swung on
            this.swing(zone);
          } else {
            // Pitch taken
            this.take(zone);
          }
        }

        this.pitchOutput = this.messageService.pitchResult;

        /* reset */
        // this.messageService.pitchResult = this.messageService.message('pitch');
      }
    }
  }

  ngOnInit(): void {
    this.showbuttons = true;

    this.gameService.startGame();
  }
}
