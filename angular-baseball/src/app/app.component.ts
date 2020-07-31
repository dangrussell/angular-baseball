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

  pitchResult = '';

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

  recordstrike(strikekind: string): void {
    this.gameService.game.strikes++;

    this.varService.pa.strikes++;

    if (strikekind === 'looking') {
      this.gameService.game.taken++;
    }
    if (strikekind === 'swinging') {
      this.gameService.game.misses++;
    }

    if (this.varService.pa.strikes === 3) {
      this.varService.resetpa();
      this.pitchResult += '<strong>Steee-rike three! Struck out ' + strikekind + '.</strong><br/><br/>';
      this.gameService.game.K++;
      this.gameService.recordout();
    }
  }

  recordball(): void {
    this.gameService.game.balls++;

    this.varService.pa.balls++;

    if (this.varService.pa.balls === 4) {
      this.varService.resetpa();
      this.pitchResult += '<strong>Ball four! That\'s a walk.</strong><br/><br/>';
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
        this.recordruns(1);
      }
      if (outcome === '1B') {
        this.varService.bases.first = true;
        this.varService.bases.second = true;
        this.varService.bases.third = false;
        this.recordruns(2);
      }
      if (outcome === '2B') {
        this.varService.bases.first = false;
        this.varService.bases.second = true;
        this.varService.bases.third = true;
        this.recordruns(2);
      }
      if (outcome === '3B') {
        this.varService.bases.first = false;
        this.varService.bases.second = false;
        this.varService.bases.third = true;
        this.recordruns(3);
      }
      if (outcome === 'HR') {
        this.varService.resetbases();
        this.recordruns(4);
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
        this.recordruns(1);
      }
      if (outcome === '2B') {
        this.varService.bases.first = false;
        this.varService.bases.second = true;
        this.varService.bases.third = true;
        this.recordruns(1);
      }
      if (outcome === '3B') {
        this.varService.bases.first = false;
        this.varService.bases.second = false;
        this.varService.bases.third = true;
        this.recordruns(2);
      }
      if (outcome === 'HR') {
        this.varService.resetbases();
        this.recordruns(3);
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
        this.recordruns(1);
      }
      if (outcome === '2B') {
        this.varService.bases.first = false;
        this.varService.bases.second = true;
        this.varService.bases.third = true;
        this.recordruns(1);
      }
      if (outcome === '3B') {
        this.varService.bases.first = false;
        this.varService.bases.second = false;
        this.varService.bases.third = true;
        this.recordruns(2);
      }
      if (outcome === 'HR') {
        this.varService.resetbases();
        this.recordruns(3);
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
        this.recordruns(2);
      }
      if (outcome === '2B') {
        this.varService.bases.first = false;
        this.varService.bases.second = true;
        this.varService.bases.third = false;
        this.recordruns(2);
      }
      if (outcome === '3B') {
        this.varService.bases.first = false;
        this.varService.bases.second = false;
        this.varService.bases.third = true;
        this.recordruns(2);
      }
      if (outcome === 'HR') {
        this.varService.resetbases();
        this.recordruns(3);
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
        this.recordruns(1);
      }
      if (outcome === 'HR') {
        this.varService.resetbases();
        this.recordruns(2);
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
        this.recordruns(1);
      }
      if (outcome === '2B') {
        this.varService.bases.first = false;
        this.varService.bases.second = true;
        this.varService.bases.third = false;
        this.recordruns(1);
      }
      if (outcome === '3B') {
        this.varService.bases.first = false;
        this.varService.bases.second = false;
        this.varService.bases.third = true;
        this.recordruns(1);
      }
      if (outcome === 'HR') {
        this.varService.resetbases();
        this.recordruns(2);
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
        this.recordruns(1);
      }
      if (outcome === '2B') {
        this.varService.bases.first = false;
        this.varService.bases.second = true;
        this.varService.bases.third = false;
        this.recordruns(1);
      }
      if (outcome === '3B') {
        this.varService.bases.first = false;
        this.varService.bases.second = false;
        this.varService.bases.third = true;
        this.recordruns(1);
      }
      if (outcome === 'HR') {
        this.varService.resetbases();
        this.recordruns(2);
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
        this.recordruns(1);
      }
      return;
    }
  }



  recordhit(): void {
    this.gameService.game.hits++;

    this.pitchResult += this.messageService.message('hit');

    const roll = this.rand(0, 100);

    if (roll <= this.varService.ODDS3B) { // rarest
      this.teamService.teambatting(this.gameService.inningHalf()).hits.triples++;
      this.advanceRunners('3B');
      this.pitchResult += this.messageService.message('3B');
    } else if (roll <= this.varService.ODDSHR) { // second rarest
      this.teamService.teambatting(this.gameService.inningHalf()).hits.homeruns++;
      this.advanceRunners('HR');
      this.pitchResult += this.messageService.message('HR');
    } else if (roll <= this.varService.ODDS2B) { // second most common
      this.teamService.teambatting(this.gameService.inningHalf()).hits.doubles++;
      this.advanceRunners('2B');
      this.pitchResult += this.messageService.message('2B');
    } else { // most common
      this.teamService.teambatting(this.gameService.inningHalf()).hits.singles++;
      this.advanceRunners('1B');
      this.pitchResult += this.messageService.message('1B');
    }
  }

  recordruns(runs: number): void {
    const ih = this.gameService.inningHalf();
    this.gameService.game.innings.find(el => el.num === this.gameService.inning())[ih].runs++;
    this.teamService.teambatting(ih).runs = this.teamService.teambatting(ih).runs + runs;
  }

  inplay(): void {
    this.varService.pa.inplay = true;
    this.gameService.game.inplay++;

    if (this.rand(1, 100) <= this.varService.BABIP) {
      this.varService.pa.hit = true;

      this.recordhit();
    } else {
      this.varService.pa.out = true;

      this.pitchResult += '<strong>Handled by the defense for an out.</strong><br/><br/>';

      this.gameService.recordout();
    }

    this.varService.resetpa();
  }

  swing(zone: boolean): void {
    let contact: number;
    let messageHit: string;
    let messageMiss: string;

    if (zone === false) {
      contact = this.varService.OCONTACT;
      messageHit = '...reached out, and slapped in play!<br/><br/>';
      messageMiss = 'Ooh... Shoulda let that one go!<br/><br/>';
    }
    if (zone === true) {
      contact = this.varService.ZCONTACT;
      messageHit = '...it\'s in play!<br/><br/>';
      messageMiss = 'Wow! Got it by the batter.<br/><br/>';
    }

    this.pitchResult += 'Swung on...<br/>';
    this.gameService.game.swings++;

    this.pitchOutcome = this.rand(1, 100);
    if (this.pitchOutcome <= contact) {
      // Contact!
      this.pitchResult += messageHit;

      this.inplay();
    } else {
      // Missed
      this.pitchResult += '...and missed for a strike.<br/>';
      this.pitchResult += messageMiss;

      this.recordstrike('swinging');
    }
  }

  take(zone: boolean): void {
    this.pitchResult += 'Taken for a ';
    if (zone === false) {
      this.pitchResult += 'ball. Good eye!<br/>';

      this.recordball();
    }
    if (zone === true) {
      this.pitchResult += 'strike.<br/>';

      this.recordstrike('looking');
    }
  }

  resetgame(): void {
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
    this.gameService.game.inning_current = 1;

    this.pitchResult = '';
    this.pitchOutput = '';

    this.varService.resetpa();
    this.varService.resetbases();
  }



  pitch(pitches = 1): void {
    for (let i = 1; i <= pitches; i++) {
      if (this.gameService.game.final === false) {
        this.gameService.game.pitches++;
        this.pitchResult = this.messageService.message('pitch');

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

        this.pitchOutput = this.pitchResult;

        /* reset */
        // this.pitchResult = this.messageService.message('pitch');
      }
    }
  }

  ngOnInit(): void {
    this.showbuttons = true;

    this.gameService.game.teams.push(this.teamService.teamAway);
    this.gameService.game.teams.push(this.teamService.teamHome);

    this.gameService.startgame();
  }
}
