import { Component, OnInit } from '@angular/core';

import { VarService } from './var.service';
import { GameService } from './game.service';
import { TeamService } from './team.service';
import { MessageService } from './message.service';

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

  constructor(
    public varService: VarService,
    public gameService: GameService,
    public teamService: TeamService,
    public messageService: MessageService,
  ) {}

  rand(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  recordStrike(strikekind: string, zone?: boolean): void {
    this.gameService.game.strikes++;

    this.varService.pa.strikes++;

    if (strikekind === 'looking') {
      this.gameService.game.taken++;
      this.messageService.message('taken-strike');
    }
    if (strikekind === 'swinging') {
      this.gameService.game.misses++;
      if (zone === false) {
        this.messageService.message('swing-miss-ball');
      }
      if (zone === true) {
        this.messageService.message('swing-miss-strike');
      }
    }

    if (this.varService.pa.strikes === 3) {
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
    this.varService.resetpa();
    this.gameService.game.K++;
    this.gameService.recordOut();
  }

  recordBall(): void {
    this.gameService.game.balls++;

    this.varService.pa.balls++;

    if (this.varService.pa.balls === 4) {
      this.varService.resetpa();
      this.messageService.message('BB');
      this.gameService.game.BB++;

      this.advanceRunners('BB');
    }
  }

  advanceRunners(outcome: string): void {
    if (this.varService.bases.first && this.varService.bases.second && this.varService.bases.third) { // bases loaded
      if (outcome === 'BB') {
        this.varService.bases.first = true;
        this.varService.bases.second = true;
        this.varService.bases.third = true;
        this.recordRuns(1);
      }
      if (outcome === '1B') {
        this.varService.bases.first = true;
        this.varService.bases.second = true;
        this.varService.bases.third = false;
        this.recordRuns(2);
      }
      if (outcome === '2B') {
        this.varService.bases.first = false;
        this.varService.bases.second = true;
        this.varService.bases.third = true;
        this.recordRuns(2);
      }
      if (outcome === '3B') {
        this.varService.bases.first = false;
        this.varService.bases.second = false;
        this.varService.bases.third = true;
        this.recordRuns(3);
      }
      if (outcome === 'HR') {
        this.varService.resetbases();
        this.recordRuns(4);
      }
      return;
    }
    if (this.varService.bases.first && this.varService.bases.second && !this.varService.bases.third) { // 2 on, first & second
      if (outcome === 'BB') {
        this.varService.bases.first = true;
        this.varService.bases.second = true;
        this.varService.bases.third = true;
      }
      if (outcome === '1B') {
        this.varService.bases.first = true;
        this.varService.bases.second = true;
        this.varService.bases.third = false;
        this.recordRuns(1);
      }
      if (outcome === '2B') {
        this.varService.bases.first = false;
        this.varService.bases.second = true;
        this.varService.bases.third = true;
        this.recordRuns(1);
      }
      if (outcome === '3B') {
        this.varService.bases.first = false;
        this.varService.bases.second = false;
        this.varService.bases.third = true;
        this.recordRuns(2);
      }
      if (outcome === 'HR') {
        this.varService.resetbases();
        this.recordRuns(3);
      }
      return;
    }
    if (this.varService.bases.first && !this.varService.bases.second && this.varService.bases.third) { // 2 on, corners
      if (outcome === 'BB') {
        this.varService.bases.first = true;
        this.varService.bases.second = true;
        this.varService.bases.third = true;
      }
      if (outcome === '1B') {
        this.varService.bases.first = true;
        this.varService.bases.second = true;
        this.varService.bases.third = false;
        this.recordRuns(1);
      }
      if (outcome === '2B') {
        this.varService.bases.first = false;
        this.varService.bases.second = true;
        this.varService.bases.third = true;
        this.recordRuns(1);
      }
      if (outcome === '3B') {
        this.varService.bases.first = false;
        this.varService.bases.second = false;
        this.varService.bases.third = true;
        this.recordRuns(2);
      }
      if (outcome === 'HR') {
        this.varService.resetbases();
        this.recordRuns(3);
      }
      return;
    }
    if (!this.varService.bases.first && this.varService.bases.second && this.varService.bases.third) { // 2 on, second & third
      if (outcome === 'BB') {
        this.varService.bases.first = true;
        this.varService.bases.second = true;
        this.varService.bases.third = true;
      }
      if (outcome === '1B') {
        this.varService.bases.first = true;
        this.varService.bases.second = false;
        this.varService.bases.third = false;
        this.recordRuns(2);
      }
      if (outcome === '2B') {
        this.varService.bases.first = false;
        this.varService.bases.second = true;
        this.varService.bases.third = false;
        this.recordRuns(2);
      }
      if (outcome === '3B') {
        this.varService.bases.first = false;
        this.varService.bases.second = false;
        this.varService.bases.third = true;
        this.recordRuns(2);
      }
      if (outcome === 'HR') {
        this.varService.resetbases();
        this.recordRuns(3);
      }
      return;
    }
    if (this.varService.bases.first && !this.varService.bases.second && !this.varService.bases.third) { // 1 on, first
      if (outcome === 'BB') {
        this.varService.bases.first = true;
        this.varService.bases.second = true;
      }
      if (outcome === '1B') {
        this.varService.bases.first = true;
        this.varService.bases.second = true;
        this.varService.bases.third = false;
      }
      if (outcome === '2B') {
        this.varService.bases.first = false;
        this.varService.bases.second = true;
        this.varService.bases.third = true;
      }
      if (outcome === '3B') {
        this.varService.bases.first = false;
        this.varService.bases.second = false;
        this.varService.bases.third = true;
        this.recordRuns(1);
      }
      if (outcome === 'HR') {
        this.varService.resetbases();
        this.recordRuns(2);
      }
      return;
    }
    if (!this.varService.bases.first && this.varService.bases.second && !this.varService.bases.third) { // 1 on, second
      if (outcome === 'BB') {
        this.varService.bases.first = true;
        this.varService.bases.second = true;
      }
      if (outcome === '1B') {
        this.varService.bases.first = true;
        this.varService.bases.second = false;
        this.varService.bases.third = false;
        this.recordRuns(1);
      }
      if (outcome === '2B') {
        this.varService.bases.first = false;
        this.varService.bases.second = true;
        this.varService.bases.third = false;
        this.recordRuns(1);
      }
      if (outcome === '3B') {
        this.varService.bases.first = false;
        this.varService.bases.second = false;
        this.varService.bases.third = true;
        this.recordRuns(1);
      }
      if (outcome === 'HR') {
        this.varService.resetbases();
        this.recordRuns(2);
      }
      return;
    }
    if (!this.varService.bases.first && !this.varService.bases.second && this.varService.bases.third) { // 1 on, third
      if (outcome === 'BB') {
        this.varService.bases.first = true;
        this.varService.bases.third = true;
      }
      if (outcome === '1B') {
        this.varService.bases.first = true;
        this.varService.bases.second = false;
        this.varService.bases.third = false;
        this.recordRuns(1);
      }
      if (outcome === '2B') {
        this.varService.bases.first = false;
        this.varService.bases.second = true;
        this.varService.bases.third = false;
        this.recordRuns(1);
      }
      if (outcome === '3B') {
        this.varService.bases.first = false;
        this.varService.bases.second = false;
        this.varService.bases.third = true;
        this.recordRuns(1);
      }
      if (outcome === 'HR') {
        this.varService.resetbases();
        this.recordRuns(2);
      }
      return;
    }
    if (!this.varService.bases.first && !this.varService.bases.second && !this.varService.bases.third) { // no one on base
      if (outcome === 'BB') {
        this.varService.bases.first = true;
      }
      if (outcome === '1B') {
        this.varService.bases.first = true;
      }
      if (outcome === '2B') {
        this.varService.bases.second = true;
      }
      if (outcome === '3B') {
        this.varService.bases.third = true;
      }
      if (outcome === 'HR') {
        this.recordRuns(1);
      }
      return;
    }
  }

  recordHit(): void {
    this.gameService.game.hits++;

    this.messageService.message('hit');

    const roll = this.rand(0, 100);

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
    this.varService.pa.inplay = true;
    this.gameService.game.inplay++;

    if (this.rand(1, 100) <= this.varService.BABIP) {
      this.varService.pa.hit = true;

      this.recordHit();
    } else {
      this.varService.pa.out = true;

      this.messageService.message('out');

      this.gameService.recordOut();
    }

    this.varService.resetpa();
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
    this.gameService.game.swings++;

    this.pitchOutcome = this.rand(1, 100);
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
    this.gameService.game.pitches = 0;
    this.gameService.game.swings = 0;
    this.gameService.game.misses = 0;
    this.gameService.game.taken = 0;
    this.gameService.game.balls = 0;
    this.gameService.game.strikes = 0;
    this.gameService.game.BB = 0;
    this.gameService.game.K = 0;
    this.gameService.game.inplay = 0;
    this.gameService.game.hits = 0;
    this.gameService.game.outs = 0;
    this.gameService.game.inning_current = null;

    this.messageService.pitchResult = '';
    this.pitchOutput = '';

    this.varService.resetpa();
    this.varService.resetbases();

    this.gameService.startGame();
  }

  pitch(pitches = 1): void {
    for (let i = 1; i <= pitches; i++) {
      if (this.gameService.game.final === false) {
        this.messageService.pitchResult = ''; // clear pitch result

        this.gameService.game.pitches++;
        this.messageService.message('pitch');

        let zone: boolean;

        // Inside strike zone?
        this.pitchOutcome = this.rand(1, 100);
        if (this.pitchOutcome <= this.varService.ZONE) {
          // Inside the zone
          zone = true;

          this.pitchOutcome = this.rand(1, 100);
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

          this.pitchOutcome = this.rand(1, 100);
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
