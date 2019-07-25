import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Baseball';

  pitchResult = 'Here comes the pitch...<br />';

  pitchOutcome = 0;

  totalPitches = 0;
  totalSwings = 0;
  totalMisses = 0;
  totalContact = 0;
  totalTaken = 0;
  totalBalls = 0;
  totalStrikes = 0;

  rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  pitch() {
    // Inside strike zone? [Zone% - average 45%]
    this.pitchOutcome = this.rand(1, 100);
    if(this.pitchOutcome <= 45){
      // Inside the zone

      // Swing? [Z-Swing% - average 65%]
      this.pitchOutcome = this.rand(1, 100);
      if(this.pitchOutcome <= 65){
        // Pitch swung on
        this.pitchResult += 'Swung on...<br/>';
        this.totalSwings++;

        // Contact? [Z-Contact% - average 87%]
        this.pitchOutcome = this.rand(1, 100);
        if(this.pitchOutcome <= 87){
          // Contact!
          this.pitchResult += 'It\'s in play!<br/>';
          this.totalContact++;
        }
        else{
          // Missed
          this.pitchResult += 'Swung on and missed for a strike.<br/>';
          this.pitchResult += 'Got it by him!<br/>';
          this.totalSwings++;
          this.totalStrikes++;
          this.totalMisses++;
        }

      }
      else{
        // Pitch taken
        this.pitchResult += 'Taken for a strike.<br/>';
        this.totalTaken++;
        this.totalStrikes++;
      }
    }
    else{
      // Outside the zone

      // Swing? [O-Swing% - average 30%]
      this.pitchOutcome = this.rand(1, 100);
      if(this.pitchOutcome <= 30){
        // Pitch swung on
        this.pitchResult += 'Swung on...<br/>';
        this.totalSwings++;

        // Contact? [O-Contact% - average 66%]
        this.pitchOutcome = this.rand(1, 100);
        if(this.pitchOutcome <= 66){
          // Contact!
          this.pitchResult += 'Slapped in play!<br/>';
          this.totalContact++;
        }
        else{
          // Missed
          this.pitchResult += 'Swung on and missed for a strike.<br/>';
          this.pitchResult += 'Shoulda let that one go!<br/>';
          this.totalStrikes++;
          this.totalMisses++;
        }

      }
      else{
        // Pitch taken
        this.pitchResult += 'Taken for a ball.<br/>';
        this.pitchResult += 'Good eye!<br/>';
        this.totalTaken++;
        this.totalBalls++;
      }
    }

    this.totalPitches++;

    this.pitchOutput = this.pitchResult;

    this.pitchResult = 'Here comes the pitch...<br />';

  }
}
