import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Baseball';

  pitchResult = 'Here comes the pitch...<br />';

  pitchOutcome = 0;

  pa = {
    "balls": 0,
    "strikes": 0,
    "inplay": false,
    "hit": false,
    "out": false
  };

  game = {
    "pitches": 0,
    "swings": 0,
    "misses": 0,
    "taken": 0,
    "balls": 0,
    "strikes": 0,
    "BB": 0,
    "K": 0,
    "inplay": 0,
    "hits": 0,
    "outs": 0,
    "inning": 1,
    "innings": [],
    "teams": {
      "away": {
        runs: 0,
        hits: 0,
        errors: 0
      },
      "home": {
        runs: 0,
        hits: 0,
        errors: 0
      }
    }
  };

  toporbot = "top";

  //game.innings[game.inning].top.runs = 0;

  pitchOutput = "";

  rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  wherearewe(){
    //alert(this.toporbot + ' ' + this.game.inning);
  }

  switchsides(){
    if(this.toporbot == "top"){
      this.toporbot = "bot";
    }
    else{
      this.toporbot = "top";
    }
  }

  recordout(){
    this.game.outs++;
    if((this.game.outs % 3) == 0){
      //alert("End of half inning!");

      this.game.innings[this.game.inning][this.toporbot].runs = 0;

      if((this.game.outs % 6) == 0){
        //alert("End of inning!");
        this.game.inning++;
        this.startinning();
      }

      this.switchsides();

      this.wherearewe();
    }
  }

  teambatting(){
    if(this.toporbot == "top"){
      return "away";
    }
    else{
      return "home";
    }
  }

  recordhit(){
    this.game.hits++;

    this.game.teams[this.teambatting()].hits++;
  }

  inplay() {
    this.pa.inplay = true;

    if(this.rand(1, 100) <= 30) { //League-average BABIP = .300
      this.pa.hit = true;

      this.recordhit();
      this.pitchResult += '<strong>Lands for a base hit!</strong><br/>';
    }
    else{
      this.pa.out = true;

      this.recordout();

      this.pitchResult += '<strong>Handled by the defense for an out.</strong><br/>';
    }

  }

  swing(zone) {
    var contact
    var messageHit;
    var messageMiss;

    if(zone == 0){
      contact = 66; // Contact? [O-Contact% - average 66%]
      messageHit = "<strong>Slapped in play!</strong><br/>";
      messageMiss = "Shoulda let that one go!<br/>";
    }
    if(zone == 1){
      contact = 87; // Contact? [Z-Contact% - average 87%]
      messageHit = "<strong>It\'s in play!</strong><br/>";
      messageMiss = "Got it by him!<br/>";
    }

    this.pitchResult += 'Swung on...<br/>';
    this.game.swings++;

    this.pitchOutcome = this.rand(1, 100);
    if(this.pitchOutcome <= contact){
      // Contact!
      this.pitchResult += messageHit;

      this.inplay();
    }
    else{
      // Missed
      this.pitchResult += 'Swung on and missed for a strike.<br/>';
      this.pitchResult += messageMiss;

      this.game.misses++;
      this.game.strikes++;

      this.pa.strikes++;
    }
  }

  take(zone){
    var message;

    this.game.taken++;

    if(zone == 0){
      message = 'Taken for a ball.<br/>Good eye!<br/>';
      this.game.balls++;

      this.pa["balls"]++;
    }
    if(zone == 1){
      message = 'Taken for a strike.<br/>';
      this.game.strikes++;

      this.pa["strikes"]++;
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

    this.pitchResult = "";
    this.pitchOutput = "";
  }

  startinning(){
    this.game.innings[this.game.inning] = {};
    this.game.innings[this.game.inning].top = {};
    this.game.innings[this.game.inning].bot = {};
  }

  startgame(){
    //
    this.wherearewe();

    this.startinning();
  }

  pitch() {
    if (this.game.outs < (3*2*9)){
      if (this.game.pitches == 0){
        this.startgame();
      }
      this.game.pitches++;

      var zone;

      // Inside strike zone? [Zone% - average 45%]
      this.pitchOutcome = this.rand(1, 100);
      if(this.pitchOutcome <= 45){
        // Inside the zone
        zone = 1;

        // Swing? [Z-Swing% - average 65%]
        this.pitchOutcome = this.rand(1, 100);
        if(this.pitchOutcome <= 65){
          // Pitch swung on
          this.swing(zone);
        }
        else{
          // Pitch taken
          this.take(zone);
        }
      }
      else{
        // Outside the zone
        zone = 0;

        // Swing? [O-Swing% - average 30%]
        this.pitchOutcome = this.rand(1, 100);
        if(this.pitchOutcome <= 30){
          // Pitch swung on
          this.swing(zone); // Contact? [O-Contact% - average 66%]
        }
        else{
          // Pitch taken
          this.take(zone);
        }
      }

      this.pitchOutput = this.pitchResult;

      if (this.pa.balls == 4) {
        this.resetpa();
        this.pitchResult += '<strong>Ball four! That\'s a walk.</strong>';
        this.game.BB++;
      }
      if (this.pa.strikes == 3) {
        this.resetpa();
        this.pitchResult += '<strong>Steee-rike three! Struck out.</strong>';
        this.game.K++;
        this.game.outs++;
      }
      if (this.pa.inplay == true) {
        this.resetpa();
        this.game.inplay++;
      }

      /* reset */
      this.pitchResult = 'Here comes the pitch...<br /><br />';
    }
  }

  pitches(pitches){
    for(let i=1;i<=pitches;i++){
      this.pitch();
    }
  }

  ngOnInit() {

  }
}
