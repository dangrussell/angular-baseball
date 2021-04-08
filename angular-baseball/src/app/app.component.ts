import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import { MessageService } from './services/message.service';
import { Player } from './services/player.service';
import { TeamService } from './services/team.service';
import { VarService } from './services/var.service';

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
  titleHTML = this.varService.titleHTML;

  showbuttons = false;

  pitchOutcome = 0;

  // game.innings[game.inning].top.runs = 0;

  pitchOutput = '';

  constructor(
    public varService: VarService,
    public gameService: GameService,
    public teamService: TeamService,
    public messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.showbuttons = true;

    this.gameService.startGame();
  }

  public pitch(pitches = 1): void {
    for (let p = 1; p <= pitches; p++) {
      if (this.gameService.game.final === false) {
        this.messageService.pitchResult = ''; // clear pitch result

        this.gameService.game.pitches++;
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

  private recordStrike(strikekind: string, zone?: boolean): void {
    this.gameService.game.strikes++;

    this.gameService.game.situation.pa.strike();

    if (strikekind === 'looking') {
      this.gameService.game.taken++;
      this.messageService.message('taken-strike');
    }
    if (strikekind === 'swinging') {
      this.gameService.game.misses++;
      if (zone === false) {
        this.messageService.message('swing-miss-ball');
      } else if (zone === true) {
        this.messageService.message('swing-miss-strike');
      }
    }

    if (this.gameService.game.situation.pa.strikes === 3) {
      this.recordK(strikekind);
    }
  }

  private recordK(strikekind: string): void {
    if (strikekind === 'looking') {
      this.messageService.message('K-looking');
    } else if (strikekind === 'swinging') {
      this.messageService.message('K-swinging');
    }
    this.gameService.game.K++;
    this.gameService.recordOut();
  }

  private recordBall(): void {
    this.gameService.game.balls++;

    this.gameService.game.situation.pa.ball();

    if (this.gameService.game.situation.pa.balls === 4) {
      this.recordBB();
    }
  }

  private recordBB(): void {
    this.messageService.message('BB');
    this.gameService.game.BB++;

    this.advanceRunners('BB');

    this.gameService.endPA();
  }

  private advanceRunners(outcome: string): void {
    const firstRunner = this.gameService.game.situation.bases[1];
    const secondRunner = this.gameService.game.situation.bases[2];
    const thirdRunner = this.gameService.game.situation.bases[3];

    if (firstRunner && secondRunner && thirdRunner) { // bases loaded
      if (outcome === 'BB') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 3);
        this.advanceRunner(1, 2);
        this.advanceRunner(0, 1);
        return;
      }
      if (outcome === '1B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 4);
        this.advanceRunner(1, 2);
        this.advanceRunner(0, 1);
        return;
      }
      if (outcome === '2B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 4);
        this.advanceRunner(1, 3);
        this.advanceRunner(0, 2);
        return;
      }
      if (outcome === '3B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 4);
        this.advanceRunner(1, 4);
        this.advanceRunner(0, 3);
        return;
      }
      if (outcome === 'HR') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 4);
        this.advanceRunner(1, 4);
        this.advanceRunner(0, 4);
        return;
      }
    }

    if (firstRunner && secondRunner && !thirdRunner) { // 2 on, first & second
      if (outcome === 'BB') {
        this.advanceRunner(2, 3);
        this.advanceRunner(1, 2);
        this.advanceRunner(0, 1);
        return;
      }
      if (outcome === '1B') {
        this.advanceRunner(2, 4);
        this.advanceRunner(1, 2);
        this.advanceRunner(0, 1);
        return;
      }
      if (outcome === '2B') {
        this.advanceRunner(2, 4);
        this.advanceRunner(1, 3);
        this.advanceRunner(0, 2);
        return;
      }
      if (outcome === '3B') {
        this.advanceRunner(2, 4);
        this.advanceRunner(1, 4);
        this.advanceRunner(0, 3);
        return;
      }
      if (outcome === 'HR') {
        this.advanceRunner(2, 4);
        this.advanceRunner(1, 4);
        this.advanceRunner(0, 4);
        return;
      }
    }

    if (firstRunner && !secondRunner && thirdRunner) { // 2 on, corners
      if (outcome === 'BB') {
        // runner on 3rd doesn't advance
        this.advanceRunner(1, 2);
        this.advanceRunner(0, 1);
        return;
      }
      if (outcome === '1B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(1, 2);
        this.advanceRunner(0, 1);
        return;
      }
      if (outcome === '2B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(1, 3);
        this.advanceRunner(0, 2);
        return;
      }
      if (outcome === '3B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(1, 4);
        this.advanceRunner(0, 3);
        return;
      }
      if (outcome === 'HR') {
        this.advanceRunner(3, 4);
        this.advanceRunner(1, 4);
        this.advanceRunner(0, 4);
        return;
      }
    }

    if (!firstRunner && secondRunner && thirdRunner) { // 2 on, second & third
      if (outcome === 'BB') {
        // runners on 2nd & 3rd don't advance
        this.advanceRunner(0, 1);
        return;
      }
      if (outcome === '1B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 4);
        this.advanceRunner(0, 1);
        return;
      }
      if (outcome === '2B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 4);
        this.advanceRunner(0, 2);
        return;
      }
      if (outcome === '3B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 4);
        this.advanceRunner(0, 3);
        return;
      }
      if (outcome === 'HR') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 4);
        this.advanceRunner(0, 4);
        return;
      }
    }

    if (firstRunner && !secondRunner && !thirdRunner) { // 1 on, first
      if (outcome === 'BB') {
        this.advanceRunner(1, 2);
        this.advanceRunner(0, 1);
        return;
      }
      if (outcome === '1B') {
        this.advanceRunner(1, 2);
        this.advanceRunner(0, 1);
        return;
      }
      if (outcome === '2B') {
        this.advanceRunner(1, 3);
        this.advanceRunner(0, 2);
        return;
      }
      if (outcome === '3B') {
        this.advanceRunner(1, 4);
        this.advanceRunner(0, 3);
        return;
      }
      if (outcome === 'HR') {
        this.advanceRunner(1, 4);
        this.advanceRunner(0, 4);
        return;
      }
    }

    if (!firstRunner && secondRunner && !thirdRunner) { // 1 on, second
      if (outcome === 'BB') {
        // runner on 2nd doesn't advance
        this.advanceRunner(0, 1);
        return;
      }
      if (outcome === '1B') {
        this.advanceRunner(2, 4);
        this.advanceRunner(0, 1);
        return;
      }
      if (outcome === '2B') {
        this.advanceRunner(2, 4);
        this.advanceRunner(0, 2);
        return;
      }
      if (outcome === '3B') {
        this.advanceRunner(2, 4);
        this.advanceRunner(0, 3);
        return;
      }
      if (outcome === 'HR') {
        this.advanceRunner(2, 4);
        this.advanceRunner(0, 4);
        return;
      }
    }

    if (!firstRunner && !secondRunner && thirdRunner) { // 1 on, third
      if (outcome === 'BB') {
        // runner on 3rd doesn't advance
        this.advanceRunner(0, 1);
        return;
      }
      if (outcome === '1B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(0, 1);
        return;
      }
      if (outcome === '2B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(0, 2);
        return;
      }
      if (outcome === '3B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(0, 3);
        return;
      }
      if (outcome === 'HR') {
        this.advanceRunner(3, 4);
        this.advanceRunner(0, 4);
        return;
      }
    }

    if (!firstRunner && !secondRunner && !thirdRunner) { // no one on base
      if (outcome === 'BB') {
        this.advanceRunner(0, 1);
        return;
      }
      if (outcome === '1B') {
        this.advanceRunner(0, 1);
        return;
      }
      if (outcome === '2B') {
        this.advanceRunner(0, 2);
        return;
      }
      if (outcome === '3B') {
        this.advanceRunner(0, 3);
        return;
      }
      if (outcome === 'HR') {
        this.advanceRunner(0, 4);
        return;
      }
    }
  }

  private recordHit(): void {
    this.gameService.game.hits++;

    this.gameService.getBatterUp().AB++;
    this.gameService.getBatterUp().hits++;

    this.messageService.message('hit');

    const roll = this.varService.rand(0, 100);

    if (roll <= this.varService.ODDS3B) { // rarest
      this.gameService.teamBatting().addHit('triples');
      this.advanceRunners('3B');
      this.messageService.message('3B');
    } else if (roll <= this.varService.ODDSHR) { // second rarest
      this.gameService.teamBatting().hits.homeruns++;
      this.advanceRunners('HR');
      this.messageService.message('HR');
    } else if (roll <= this.varService.ODDS2B) { // second most common
      this.gameService.teamBatting().hits.doubles++;
      this.advanceRunners('2B');
      this.messageService.message('2B');
    } else { // most common
      this.gameService.teamBatting().hits.singles++;
      this.advanceRunners('1B');
      this.messageService.message('1B');
    }
  }

  private recordRuns(runs: number): void {
    this.gameService.game.getInningHalfCurrent().addRuns(runs);

    this.gameService.teamBatting().runs = this.gameService.teamBatting().runs + runs;
  }

  private inPlay(): void {
    this.gameService.game.situation.pa.inplay = true;
    this.gameService.game.inplay++;

    if (this.varService.rand(1, 100) <= this.varService.BABIP) {
      this.gameService.game.situation.pa.hit = true;

      this.recordHit();

      this.gameService.endPA();
    } else {
      this.gameService.game.situation.pa.out = true;

      this.messageService.message('out');

      this.gameService.recordOut();
    }
  }

  private swing(zone: boolean): void {
    let contact: number;

    if (zone === false) {
      contact = this.varService.OCONTACT;
    }
    if (zone === true) {
      contact = this.varService.ZCONTACT;
    }

    // this.messageService.message('swing');
    this.gameService.game.swings++;

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

  private advanceRunner(fromBase: number, toBase: number): void {
    let runner: Player;
    if (fromBase > 0) {
      runner = this.gameService.game.situation.bases.getBase(fromBase);

      // vacate the fromBase
      this.gameService.game.situation.bases.setBase(fromBase, null);
    } else {
      runner = this.gameService.getBatterUp(); // batter-runner
    }

    console.log('runner is', runner);

    if (toBase === 4) {
      // score a run, even for batter-runners (a HR)
      this.recordRuns(1);
    } else {
      // add runner to the toBase
      this.gameService.game.situation.bases.setBase(toBase, runner);
    }
  }

  private take(zone: boolean): void {
    if (zone === false) {
      this.messageService.message('taken-ball');
      this.recordBall();
    } else if (zone === true) {
      this.recordStrike('looking');
    }
  }
}
