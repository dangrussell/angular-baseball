import { Component, OnChanges, OnInit, OnDestroy } from '@angular/core';
// import { DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked,  } from '@angular/core';
// Implementing DoCheck and OnChanges in a class is not recommended
import { VarService } from './var.service';

import { GameService } from './game.service';

import { IGame } from './game/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    VarService,
    GameService,
  ]
})
export class AppComponent implements
  OnChanges, OnInit, OnDestroy/*, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked*/ {
  // Implementing DoCheck and OnChanges in a class is not recommended

  constructor(
    private varService: VarService,
    private gameService: GameService,
  ) {}

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

  MLB2018hits = 41019;
  MLB20181B = 26323; // this.MLB2018hits - this.MLB20182B - this.MLB20183B - this.MLB2018HR;
  MLB20182B = 8264;
  MLB2018HR = 5585;
  MLB20183B = 847;

  hitpercent1B = (this.MLB20181B / this.MLB2018hits) * 100;
  hitpercent2B = (this.MLB20182B / this.MLB2018hits) * 100;
  hitpercent3B = (this.MLB20183B / this.MLB2018hits) * 100;
  hitpercentHR = (this.MLB2018HR / this.MLB2018hits) * 100;

  rand(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randObj(obj) {
    const keys = Object.keys(obj);
    return obj[keys[Math.floor(Math.random() * keys.length)]];
  }

  message(messagekind: string) {
    let message = this.randObj(this.messages[messagekind]);
    message += '<br /><br />';
    return message;
  }

  wherearewe() {
    // alert(this.toporbot + ' ' + this.gameService.game.inning);
  }

  switchsides() {
    this.message('switchsides');

    if (this.toporbot === 'top') {
      this.toporbot = 'bot';
    } else {
      this.toporbot = 'top';
    }

    this.gameService.game.innings[this.gameService.game.inning][this.toporbot].runs = 0;

    this.gameService.game.innings[this.gameService.game.inning][this.toporbot].outs = 0;
  }

  recordstrike(strikekind: string) {
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

  recordball() {
    this.gameService.game.balls++;

    this.pa.balls++;

    if (this.pa.balls === 4) {
      this.resetpa();
      this.pitchResult += '<strong>Ball four! That\'s a walk.</strong><br/><br/>';
      this.gameService.game.BB++;
    }
  }

  recordout() {
    this.gameService.game.outs++;
    this.gameService.game.innings[this.gameService.game.inning][this.toporbot].outs++;

    if ((this.gameService.game.outs === (3 * 2 * 9))) {
      this.pitchResult += '<br /><br /><strong>And that\'s the game!</strong>';
    } else {
      if ((this.gameService.game.outs % 3) === 0) {
        // alert("End of half inning!");

        this.gameService.game.innings[this.gameService.game.inning][this.toporbot].runs = 0;

        this.gameService.game.innings[this.gameService.game.inning][this.toporbot].outs = 0;

        if ((this.gameService.game.outs % 6) === 0) {
          // alert("End of inning!");
          this.gameService.game.inning++;
          this.startinning();
        }

        this.switchsides();

        this.wherearewe();
      }
    }

  }

  teambatting() {
    if (this.toporbot === 'top') {
      return 'away';
    } else {
      return 'home';
    }
  }

  recordhit() {
    this.gameService.game.hits++;

    this.gameService.game.teams[this.teambatting()].hits++;

    this.pitchResult += this.message('hit');

    const roll = this.rand(0, 100);

    // alert(roll);

    if (roll <= this.hitpercent3B) { // rarest
      this.pitchResult += 'What speed! <strong>It\'s a triple!</strong><br /><br />';
    } else if (roll <= this.hitpercentHR) { // second rarest
      this.pitchResult += 'Going back... <strong>It\'s a Home Run!!!</strong><br /><br />';
    } else if (roll <= this.hitpercent2B) { // second most common
      this.pitchResult += 'Gonna try for two.. <strong>In with a double.</strong><br /><br />';
    } else { // most common
      this.pitchResult += 'A clean hit. <strong>On first with a single.</strong><br /><br />';
    }
    /*
    } else if (roll <= this.hitpercent1B) { // most common
      this.pitchResult += 'A clean hit. <strong>On first with a single.</strong><br /><br />';
    }
    */
  }

  inplay() {
    this.pa.inplay = true;
    this.gameService.game.inplay++;

    if (this.rand(1, 100) <= 30) { // League-average BABIP = .300
      this.pa.hit = true;

      this.recordhit();
    } else {
      this.pa.out = true;

      this.pitchResult += '<strong>Handled by the defense for an out.</strong><br/><br/>';

      this.recordout();
    }

    this.resetpa();
  }

  swing(zone: boolean) {
    let contact: number;
    let messageHit: string;
    let messageMiss: string;

    if (zone === false) {
      contact = 66; // Contact? [O-Contact% - average 66%]
      messageHit = '...reached out, and slapped in play!<br/><br/>';
      messageMiss = 'Ooh... Shoulda let that one go!<br/><br/>';
    }
    if (zone === true) {
      contact = 87; // Contact? [Z-Contact% - average 87%]
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

  take(zone: boolean) {
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

  resetpa() {
    this.pa.balls = 0;
    this.pa.strikes = 0;
    this.pa.inplay = false;
  }

  resetgame() {
    this.gameService.game.pitches = 0,
    this.gameService.game.swings = 0,
    this.gameService.game.misses = 0,
    this.gameService.game.taken = 0,
    this.gameService.game.balls = 0,
    this.gameService.game.strikes = 0,
    this.gameService.game.BB = 0;
    this.gameService.game.K = 0;
    this.gameService.game.inplay = 0;
    this.gameService.game.hits = 0;
    this.gameService.game.outs = 0;
    this.gameService.game.inning = 1;
    this.gameService.game.inning = 1;

    this.pitchResult = '';
    this.pitchOutput = '';
  }

  startinning() {
    this.gameService.game.innings[this.gameService.game.inning] = {};
    this.gameService.game.innings[this.gameService.game.inning].top = {};
    this.gameService.game.innings[this.gameService.game.inning].bot = {};
    this.gameService.game.innings[this.gameService.game.inning][this.toporbot].outs = 0;
  }

  startgame() {
    //
    this.wherearewe();

    /*
    alert(this.hitpercent1B);
    alert(this.hitpercent2B);
    alert(this.hitpercent3B);
    alert(this.hitpercentHR);
    */
    this.startinning();
  }

  pitch() {
    if (this.gameService.game.outs < (3 * 2 * 9)) {
      if (this.gameService.game.pitches === 0) {
        this.startinning();
      }
      this.gameService.game.pitches++;
      this.pitchResult = this.message('pitch');

      let zone: boolean;

      // Inside strike zone? [Zone% - average 45%]
      this.pitchOutcome = this.rand(1, 100);
      if (this.pitchOutcome <= 45) {
        // Inside the zone
        zone = true;

        // Swing? [Z-Swing% - average 65%]
        this.pitchOutcome = this.rand(1, 100);
        if (this.pitchOutcome <= 65) {
          // Pitch swung on
          this.swing(zone);
        } else {
          // Pitch taken
          this.take(zone);
        }
      } else {
        // Outside the zone
        zone = false;

        // Swing? [O-Swing% - average 30%]
        this.pitchOutcome = this.rand(1, 100);
        if (this.pitchOutcome <= 30) {
          // Pitch swung on
          this.swing(zone); // Contact? [O-Contact% - average 66%]
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

  pitches(pitches: number) {
    for (let i = 1; i <= pitches; i++) {
      this.pitch();
    }
  }

  ngOnChanges() {
    // Respond when Angular (re)sets data-bound input properties.
    // The method receives a SimpleChanges object of current and previous property values.

    // Called before ngOnInit() and whenever one or more data-bound input properties change.

    // Implementing DoCheck and OnChanges in a class is not recommended
  }

  ngOnInit() {
    // Initialize the directive/component after Angular first displays
    // the data-bound properties and sets the directive/component's input properties.

    // Called once, after the first ngOnChanges().

    this.showbuttons = true;

    this.startgame();
  }
/*
  ngDoCheck() {

    // Detect and act upon changes that Angular can't or won't detect on its own.

    // Called during every change detection run, immediately after ngOnChanges() and ngOnInit().

    // Implementing DoCheck and OnChanges in a class is not recommended
  }

  ngAfterContentInit() {
    // Respond after Angular projects external content into the component's view / the view that a directive is in.

    // Called once after the first ngDoCheck().
  }

  ngAfterContentChecked() {
    // Respond after Angular checks the content projected into the directive/component.

    // Called after the ngAfterContentInit() and every subsequent ngDoCheck().
  }

  ngAfterViewInit() {
    // Respond after Angular initializes the component's views and child views / the view that a directive is in.

    // Called once after the first ngAfterContentChecked().
  }

  ngAfterViewChecked() {
    // Respond after Angular checks the component's views and child views / the view that a directive is in.

    // Called after the ngAfterViewInit() and every subsequent ngAfterContentChecked().
  }
*/
  ngOnDestroy() {
    // Cleanup just before Angular destroys the directive/component.
    // Unsubscribe Observables and detach event handlers to avoid memory leaks.

    // Called just before Angular destroys the directive/component.
  }
}
