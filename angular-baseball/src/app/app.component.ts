import { Component, OnChanges, OnInit/*, DoCheck,*/ } from '@angular/core';
import { AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
// Implementing DoCheck and OnChanges in a class is not recommended

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements
  OnChanges, OnInit, /*DoCheck,*/ AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  // Implementing DoCheck and OnChanges in a class is not recommended
  title = 'Angular Baseball';

  pitchResult = '';

  pitchOutcome = 0;

  pa = {
    balls: 0,
    strikes: 0,
    inplay: false,
    hit: false,
    out: false
  };

  game = {
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
    inning: 1,
    innings: [],
    teams: {
      away: {
        runs: 0,
        hits: 0,
        errors: 0
      },
      home: {
        runs: 0,
        hits: 0,
        errors: 0
      }
    }
  };

  messages = {
    pitch: {
      0: 'Here comes the pitch...',
      1: 'The pitcher kicks and deals...'
    },
    hit: {
      0: '<strong>Lands for a base hit.</strong>'
    }
  };

  toporbot = 'top';

  // game.innings[game.inning].top.runs = 0;

  MLB2018hits = 41019;
  MLB20182B = 8264;
  MLB20183B = 847;
  MLB2018HR = 5585;
  MLB20181B = this.MLB2018hits - this.MLB20182B - this.MLB20183B - this.MLB2018HR;

  hitpercent1B = (this.MLB20181B / this.MLB2018hits) * 100;
  hitpercent2B = (this.MLB20182B / this.MLB2018hits) * 100;
  hitpercent3B = (this.MLB20183B / this.MLB2018hits) * 100;
  hitpercentHR = (this.MLB2018HR / this.MLB2018hits) * 100;

  pitchOutput = '';

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
    // alert(this.toporbot + ' ' + this.game.inning);
  }

  switchsides() {
    if (this.toporbot === 'top') {
      this.toporbot = 'bot';
    } else {
      this.toporbot = 'top';
    }
  }

  recordstrike(strikekind: string) {
    this.game.strikes++;

    this.pa.strikes++;

    if (strikekind === 'looking') {
      this.game.taken++;
    }
    if (strikekind === 'swinging') {
      this.game.misses++;
    }

    if (this.pa.strikes === 3) {
      this.resetpa();
      this.pitchResult += '<strong>Steee-rike three! Struck out ' + strikekind + '.</strong><br/><br/>';
      this.game.K++;
      this.recordout();
    }
  }

  recordball() {
    this.game.balls++;

    this.pa.balls++;

    if (this.pa.balls === 4) {
      this.resetpa();
      this.pitchResult += '<strong>Ball four! That\'s a walk.</strong><br/><br/>';
      this.game.BB++;
    }
  }

  recordout() {
    this.game.outs++;
    if ((this.game.outs === (3 * 2 * 9))) {
      this.pitchResult += '<br /><br /><strong>And that\'s the game!</strong>';
    } else {
      if ((this.game.outs % 3) === 0) {
        // alert("End of half inning!");

        this.game.innings[this.game.inning][this.toporbot].runs = 0;

        if ((this.game.outs % 6) === 0) {
          // alert("End of inning!");
          this.game.inning++;
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
    this.game.hits++;

    this.game.teams[this.teambatting()].hits++;

    this.pitchResult += this.message('hit');

    const roll = this.rand(0, 100);

    if (roll <= this.hitpercentHR) {
      this.pitchResult += 'Going back... <strong>It\'s a Home Run!!!</strong><br /><br />';
    }
    if (roll <= this.hitpercent3B) {
      this.pitchResult += 'What speed! <strong>It\'s a triple!</strong><br /><br />';
    }
    if (roll <= this.hitpercent2B) {
        this.pitchResult += 'Gonna try for two.. <strong>In with a double.</strong><br /><br />';
    }
    if (roll <= this.hitpercent1B) {
      this.pitchResult += 'A clean hit. <strong>On first with a single.</strong><br /><br />';
    }

  }

  inplay() {
    this.pa.inplay = true;
    this.game.inplay++;

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

  swing(zone) {
    let contact: number;
    let messageHit: string;
    let messageMiss: string;

    if (zone === false) {
      contact = 66; // Contact? [O-Contact% - average 66%]
      messageHit = '<strong>Slapped in play!</strong><br/><br/>';
      messageMiss = 'Shoulda let that one go!<br/><br/>';
    }
    if (zone === true) {
      contact = 87; // Contact? [Z-Contact% - average 87%]
      messageHit = '<strong>It\'s in play!</strong><br/><br/>';
      messageMiss = 'Got it by him!<br/><br/>';
    }

    this.pitchResult += 'Swung on...<br/>';
    this.game.swings++;

    this.pitchOutcome = this.rand(1, 100);
    if (this.pitchOutcome <= contact) {
      // Contact!
      this.pitchResult += messageHit;

      this.inplay();
    } else {
      // Missed
      this.pitchResult += 'Swung on and missed for a strike.<br/>';
      this.pitchResult += messageMiss;

      this.recordstrike('swinging');
    }
  }

  take(zone: boolean) {
    let message: string;

    if (zone === false) {
      message = 'Taken for a ball. Good eye!<br/>';

      this.recordball();
    }
    if (zone === true) {
      message = 'Taken for a strike.<br/>';

      this.recordstrike('looking');
    }

    this.pitchResult += message;
  }

  resetpa() {
    this.pa.balls = 0;
    this.pa.strikes = 0;
    this.pa.inplay = false;
  }

  resetgame() {
    this.game.pitches = 0,
    this.game.swings = 0,
    this.game.misses = 0,
    this.game.taken = 0,
    this.game.balls = 0,
    this.game.strikes = 0,
    this.game.BB = 0;
    this.game.K = 0;
    this.game.inplay = 0;
    this.game.hits = 0;
    this.game.outs = 0;
    this.game.inning = 1;
    this.game.inning = 1;

    this.pitchResult = '';
    this.pitchOutput = '';
  }

  startinning() {
    this.game.innings[this.game.inning] = {};
    this.game.innings[this.game.inning].top = {};
    this.game.innings[this.game.inning].bot = {};
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
    if (this.game.outs < (3 * 2 * 9)) {
      if (this.game.pitches === 0) {
        this.startgame();
      }
      this.game.pitches++;
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
      this.pitchResult = this.message('pitch');
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
  }
/*
  ngDoCheck() {

    // Detect and act upon changes that Angular can't or won't detect on its own.

    // Called during every change detection run, immediately after ngOnChanges() and ngOnInit().

    // Implementing DoCheck and OnChanges in a class is not recommended
  }
*/
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

  ngOnDestroy() {
    // Cleanup just before Angular destroys the directive/component.
    // Unsubscribe Observables and detach event handlers to avoid memory leaks.

    // Called just before Angular destroys the directive/component.
  }
}
