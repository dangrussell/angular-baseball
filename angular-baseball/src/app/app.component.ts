import { Component, OnInit } from '@angular/core';

import { VarService } from './var.service';
import { GameService } from './game.service';
import { IGame } from './game/game';

/* Uses 2018 MLB totals */
const MLBHITS = 41019;
const MLBHR = 5585;
const MLB3B = 847;
const MLB2B = 8264;
// const MLB1B = MLBHITS - MLB2B - MLB3B - MLBHR; // 26323

// const ODDS1B = (MLB1B / MLBHITS) * 100;
const ODDS2B = (MLB2B / MLBHITS) * 100;
const ODDS3B = (MLB3B / MLBHITS) * 100;
const ODDSHR = (MLBHR / MLBHITS) * 100;

const BABIP = 30; // League-average BABIP = .300

const ZONE = 45; // Zone% - average 45%

const ZSWING = 65; // Z-Swing% - average 65%
const OSWING = 30; // O-Swing% - average 30%

const OCONTACT = 66; // O-Contact% - average 66%
const ZCONTACT = 87; // Z-Contact% - average 87%

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    VarService,
    GameService,
  ]
})
export class AppComponent implements OnInit {

  title = 'angular-baseball';

  game: IGame[] = [this.gameService.game];

  showbuttons = false;

  pitchResult: '';

  pitchOutcome = 0;

  pa = {
    balls: 0,
    strikes: 0,
    inplay: false,
    hit: false,
    out: false
  };

  bases = {
    first: false,
    second: false,
    third: false
  };

  toporbot = 'top';

  messages = {
    pitch: {
      0: 'Here comes the pitch...',
      1: 'The pitcher kicks and deals...'
    },
    hit: {
      0: 'Looks like a hit...',
      1: 'Got some good wood on that one...',
      2: 'Nice little piece of hitting there...',
    },
    switchsides: {
      0: '<strong>That\'ll do it for the <span style="text-transform: capitalize;">' +
        this.toporbot + '</span> of inning ' + this.gameService.game.inning + '</strong>'
    }
  };

  // game.innings[game.inning].top.runs = 0;

  pitchOutput = '';

  constructor(
    private varService: VarService,
    private gameService: GameService,
  ) {}

  rand(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randObj(obj: any): any {
    const keys = Object.keys(obj);
    return obj[keys[Math.floor(Math.random() * keys.length)]];
  }

  message(messagekind: string): string {
    let message = this.randObj(this.messages[messagekind]);
    message += '<br /><br />';
    return message;
  }

  wherearewe(): void {
    console.log(this.toporbot + ' ' + this.gameService.game.inning);
  }

  switchsides(): void {
    this.resetbases();

    this.message('switchsides');

    if (this.toporbot === 'top') {
      this.toporbot = 'bot';
    } else {
      this.toporbot = 'top';
    }

    this.gameService.game.innings[this.gameService.game.inning][this.toporbot].runs = 0;

    this.gameService.game.innings[this.gameService.game.inning][this.toporbot].outs = 0;
  }

  recordstrike(strikekind: string): void {
    this.gameService.game.strikes++;

    this.pa.strikes++;

    if (strikekind === 'looking') {
      this.gameService.game.taken++;
    }
    if (strikekind === 'swinging') {
      this.gameService.game.misses++;
    }

    if (this.pa.strikes === 3) {
      this.resetpa();
      this.pitchResult += '<strong>Steee-rike three! Struck out ' + strikekind + '.</strong><br/><br/>';
      this.gameService.game.K++;
      this.recordout();
    }
  }

  recordball(): void {
    this.gameService.game.balls++;

    this.pa.balls++;

    if (this.pa.balls === 4) {
      this.resetpa();
      this.pitchResult += '<strong>Ball four! That\'s a walk.</strong><br/><br/>';
      this.gameService.game.BB++;

      this.advanceRunners('BB');
    }
  }

  advanceRunners(outcome: string): void {
    if (this.bases.first && this.bases.second && this.bases.third) { // bases loaded
      if (outcome === 'BB') {
        this.bases.first = true;
        this.bases.second = true;
        this.bases.third = true;
        this.recordruns(1);
      }
      if (outcome === '1B') {
        this.bases.first = true;
        this.bases.second = true;
        this.bases.third = false;
        this.recordruns(2);
      }
      if (outcome === '2B') {
        this.bases.first = false;
        this.bases.second = true;
        this.bases.third = true;
        this.recordruns(2);
      }
      if (outcome === '3B') {
        this.bases.first = false;
        this.bases.second = false;
        this.bases.third = true;
        this.recordruns(3);
      }
      if (outcome === 'HR') {
        this.resetbases();
        this.recordruns(4);
      }
      return;
    }
    if (this.bases.first && this.bases.second && !this.bases.third) { // 2 on, first & second
      if (outcome === 'BB') {
        this.bases.first = true;
        this.bases.second = true;
        this.bases.third = true;
      }
      if (outcome === '1B') {
        this.bases.first = true;
        this.bases.second = true;
        this.bases.third = false;
        this.recordruns(1);
      }
      if (outcome === '2B') {
        this.bases.first = false;
        this.bases.second = true;
        this.bases.third = true;
        this.recordruns(1);
      }
      if (outcome === '3B') {
        this.bases.first = false;
        this.bases.second = false;
        this.bases.third = true;
        this.recordruns(2);
      }
      if (outcome === 'HR') {
        this.resetbases();
        this.recordruns(3);
      }
      return;
    }
    if (this.bases.first && !this.bases.second && this.bases.third) { // 2 on, corners
      if (outcome === 'BB') {
        this.bases.first = true;
        this.bases.second = true;
        this.bases.third = true;
      }
      if (outcome === '1B') {
        this.bases.first = true;
        this.bases.second = true;
        this.bases.third = false;
        this.recordruns(1);
      }
      if (outcome === '2B') {
        this.bases.first = false;
        this.bases.second = true;
        this.bases.third = true;
        this.recordruns(1);
      }
      if (outcome === '3B') {
        this.bases.first = false;
        this.bases.second = false;
        this.bases.third = true;
        this.recordruns(2);
      }
      if (outcome === 'HR') {
        this.resetbases();
        this.recordruns(3);
      }
      return;
    }
    if (!this.bases.first && this.bases.second && this.bases.third) { // 2 on, second & third
      if (outcome === 'BB') {
        this.bases.first = true;
        this.bases.second = true;
        this.bases.third = true;
      }
      if (outcome === '1B') {
        this.bases.first = true;
        this.bases.second = false;
        this.bases.third = false;
        this.recordruns(2);
      }
      if (outcome === '2B') {
        this.bases.first = false;
        this.bases.second = true;
        this.bases.third = false;
        this.recordruns(2);
      }
      if (outcome === '3B') {
        this.bases.first = false;
        this.bases.second = false;
        this.bases.third = true;
        this.recordruns(2);
      }
      if (outcome === 'HR') {
        this.resetbases();
        this.recordruns(3);
      }
      return;
    }
    if (this.bases.first && !this.bases.second && !this.bases.third) { // 1 on, first
      if (outcome === 'BB') {
        this.bases.first = true;
        this.bases.second = true;
      }
      if (outcome === '1B') {
        this.bases.first = true;
        this.bases.second = true;
        this.bases.third = false;
      }
      if (outcome === '2B') {
        this.bases.first = false;
        this.bases.second = true;
        this.bases.third = true;
      }
      if (outcome === '3B') {
        this.bases.first = false;
        this.bases.second = false;
        this.bases.third = true;
        this.recordruns(1);
      }
      if (outcome === 'HR') {
        this.resetbases();
        this.recordruns(2);
      }
      return;
    }
    if (!this.bases.first && this.bases.second && !this.bases.third) { // 1 on, second
      if (outcome === 'BB') {
        this.bases.first = true;
        this.bases.second = true;
      }
      if (outcome === '1B') {
        this.bases.first = true;
        this.bases.second = false;
        this.bases.third = false;
        this.recordruns(1);
      }
      if (outcome === '2B') {
        this.bases.first = false;
        this.bases.second = true;
        this.bases.third = false;
        this.recordruns(1);
      }
      if (outcome === '3B') {
        this.bases.first = false;
        this.bases.second = false;
        this.bases.third = true;
        this.recordruns(1);
      }
      if (outcome === 'HR') {
        this.resetbases();
        this.recordruns(2);
      }
      return;
    }
    if (!this.bases.first && !this.bases.second && this.bases.third) { // 1 on, third
      if (outcome === 'BB') {
        this.bases.first = true;
        this.bases.third = true;
      }
      if (outcome === '1B') {
        this.bases.first = true;
        this.bases.second = false;
        this.bases.third = false;
        this.recordruns(1);
      }
      if (outcome === '2B') {
        this.bases.first = false;
        this.bases.second = true;
        this.bases.third = false;
        this.recordruns(1);
      }
      if (outcome === '3B') {
        this.bases.first = false;
        this.bases.second = false;
        this.bases.third = true;
        this.recordruns(1);
      }
      if (outcome === 'HR') {
        this.resetbases();
        this.recordruns(2);
      }
      return;
    }
    if (!this.bases.first && !this.bases.second && !this.bases.third) { // no one on base
      if (outcome === 'BB') {
        this.bases.first = true;
      }
      if (outcome === '1B') {
        this.bases.first = true;
      }
      if (outcome === '2B') {
        this.bases.second = true;
      }
      if (outcome === '3B') {
        this.bases.third = true;
      }
      if (outcome === 'HR') {
        this.recordruns(1);
      }
      return;
    }
  }

  recordout(): void {
    this.gameService.game.outs++;
    this.gameService.game.innings[this.gameService.game.inning][this.toporbot].outs++;

    if ((this.gameService.game.outs >= (3 * 2 * 9)) && (this.gameService.game.teams.away.runs !== this.gameService.game.teams.home.runs)) {
      this.pitchResult += '<br /><br /><strong>And that\'s the game!</strong>';
      let winner = 'home';
      if (this.gameService.game.teams.away.runs > this.gameService.game.teams.home.runs) {
        winner = 'away';
      }
      this.pitchResult += '<br /><br /><strong>The ' + winner + ' team wins!</strong>';
      this.gameService.game.final = true;
    } else {
      if ((this.gameService.game.outs % 3) === 0) {
        console.log('End of half inning!');

        this.gameService.game.innings[this.gameService.game.inning][this.toporbot].runs = 0;

        this.gameService.game.innings[this.gameService.game.inning][this.toporbot].outs = 0;

        if ((this.gameService.game.outs % 6) === 0) {
          console.log('End of inning!');
          this.gameService.game.inning++;
          this.startinning();
        }

        this.switchsides();

        this.wherearewe();
      }
    }

  }

  teambatting(): string {
    if (this.toporbot === 'top') {
      return 'away';
    } else {
      return 'home';
    }
  }

  recordhit(): void {
    this.gameService.game.hits++;

    this.pitchResult += this.message('hit');

    const roll = this.rand(0, 100);

    if (roll <= ODDS3B) { // rarest
      this.gameService.game.teams[this.teambatting()].hits.triples++;
      this.advanceRunners('3B');
      this.pitchResult += 'What speed! <strong>It\'s a triple!</strong><br /><br />';
    } else if (roll <= ODDSHR) { // second rarest
      this.gameService.game.teams[this.teambatting()].hits.homeruns++;
      this.advanceRunners('HR');
      this.pitchResult += 'Going back... <strong>It\'s a Home Run!!!</strong><br /><br />';
    } else if (roll <= ODDS2B) { // second most common
      this.gameService.game.teams[this.teambatting()].hits.doubles++;
      this.advanceRunners('2B');
      this.pitchResult += 'Gonna try for two.. <strong>In with a double.</strong><br /><br />';
    } else { // most common
      this.gameService.game.teams[this.teambatting()].hits.singles++;
      this.advanceRunners('1B');
      this.pitchResult += 'A clean hit. <strong>On first with a single.</strong><br /><br />';
    }
  }

  recordruns(runs: number): void {
    this.gameService.game.teams[this.teambatting()].runs = this.gameService.game.teams[this.teambatting()].runs + runs;
  }

  inplay(): void {
    this.pa.inplay = true;
    this.gameService.game.inplay++;

    if (this.rand(1, 100) <= BABIP) {
      this.pa.hit = true;

      this.recordhit();
    } else {
      this.pa.out = true;

      this.pitchResult += '<strong>Handled by the defense for an out.</strong><br/><br/>';

      this.recordout();
    }

    this.resetpa();
  }

  swing(zone: boolean): void {
    let contact: number;
    let messageHit: string;
    let messageMiss: string;

    if (zone === false) {
      contact = OCONTACT;
      messageHit = '...reached out, and slapped in play!<br/><br/>';
      messageMiss = 'Ooh... Shoulda let that one go!<br/><br/>';
    }
    if (zone === true) {
      contact = ZCONTACT;
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

  resetpa(): void {
    this.pa.balls = 0;
    this.pa.strikes = 0;
    this.pa.inplay = false;
  }

  resetbases(): void {
    this.bases.first = false;
    this.bases.second = false;
    this.bases.third = false;
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
    this.gameService.game.inning = 1;

    this.pitchResult = '';
    this.pitchOutput = '';

    this.resetpa();
    this.resetbases();
  }

  startinning(): void {
    let inning = this.gameService.game.inning;
    if (!this.gameService.game.innings[inning]) {
      this.gameService.game.innings[inning] = {};
    }
    this.gameService.game.innings[inning].top = {};
    this.gameService.game.innings[inning].bot = {};
    this.gameService.game.innings[inning][this.toporbot].outs = 0;
  }

  startgame(): void {
    this.wherearewe();
    for (let i = 9; i <= 9; i++) {
      this.gameService.game.innings[i] = {};
    }
    this.startinning();
  }

  pitch(pitches = 1): void {
    for (let i = 1; i <= pitches; i++) {
      if (this.gameService.game.final === false) {
        this.gameService.game.pitches++;
        this.pitchResult = this.message('pitch');

        let zone: boolean;

        // Inside strike zone?
        this.pitchOutcome = this.rand(1, 100);
        if (this.pitchOutcome <= ZONE) {
          // Inside the zone
          zone = true;

          this.pitchOutcome = this.rand(1, 100);
          if (this.pitchOutcome <= ZSWING) {
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
          if (this.pitchOutcome <= OSWING) {
            // Pitch swung on
            this.swing(zone);
          } else {
            // Pitch taken
            this.take(zone);
          }
        }

        this.pitchOutput = this.pitchResult;

        /* reset */
        // this.pitchResult = this.message('pitch');
      }
    }
  }

  ngOnInit(): void {
    // Initialize the directive/component after Angular first displays
    // the data-bound properties and sets the directive/component's input properties.

    // Called once, after the first ngOnChanges().

    this.showbuttons = true;

    this.startgame();
  }
}
