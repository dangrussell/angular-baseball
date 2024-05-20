import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pitchActions } from './actions/pitch.actions';
import { LineupComponent } from './components/lineup/lineup.component';
import { SceneComponent } from './components/scene/scene.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { selectPitchCount } from './selectors/pitch.selector';
import { GameService } from './services/game.service';
import { MessageService } from './services/message.service';
import { PitchService } from './services/pitch.service';
import { Player } from './services/player.service';
import { VarService, rand } from './services/var.service';

type StrikeKind = 'looking' | 'swinging';
type PAOutcome = 'BB' | '1B' | '2B' | '3B' | 'HR';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    NgIf,
    LineupComponent,
    ScoreboardComponent,
    SceneComponent,
    RouterOutlet,
  ],
})
export class AppComponent implements OnInit {

  title = 'angular-baseball';
  titleHTML = this.varService.titleHTML;

  showbuttons = false;

  // game.innings[game.inning].top.runs = 0;

  pitchOutput = '';

  pitch$: Observable<number>;

  constructor(
    private readonly varService: VarService,
    public readonly gameService: GameService, // TODO: avoid using gameService in the template
    private readonly messageService: MessageService,
    private readonly pitchService: PitchService,
    private readonly store: Store,
  ) {
    this.pitch$ = this.store.select(selectPitchCount, pitchActions.pitch);
  }

  ngOnInit(): void {
    this.showbuttons = true;

    this.gameService.startGame();
  }

  public pitch(pitches = 1): void {
    for (let p = 1; p <= pitches; p++) {
      if (!this.gameService.game.final) {
        this.store.dispatch(pitchActions.pitch());

        this.messageService.pitchResult = ''; // clear pitch result

        this.gameService.game.pitches++;
        this.messageService.message('pitch');

        // Inside strike zone?
        const inZone: boolean = rand(1, 100) <= this.varService.ZONE;

        let didSwing: boolean;

        if (inZone) {
          didSwing = rand(1, 100) <= this.varService.ZSWING;
        } else {
          didSwing = rand(1, 100) <= this.varService.OSWING;
        }

        if (didSwing) {
          this.gameService.game.swings++;

          const madeContact: boolean = this.pitchService.swing(inZone, this.gameService.getBatterUp());
          if (madeContact) {
            // Contact!
            if (inZone) {
              this.messageService.message('swing-hit-strike');
            } else {
              this.messageService.message('swing-hit-ball');
            }

            this.inPlay();
          } else {
            // Missed
            this.recordStrike('swinging', inZone);
          }
        } else {
          // Take

          if (inZone) {
            this.recordStrike('looking');
          } else {
            this.messageService.message('taken-ball');
            this.recordBall();
          }
        }

        this.pitchOutput = this.messageService.pitchResult;

        /* reset */
        // this.messageService.pitchResult = this.messageService.message('pitch');
      }
    }
  }

  private recordStrike(strikeKind: StrikeKind, inZone?: boolean): void {
    this.gameService.game.strikes++;

    this.gameService.game.situation.pa.strike();

    if (strikeKind === 'looking') {
      this.gameService.game.taken++;
      this.messageService.message('taken-strike');
    } else if (strikeKind === 'swinging') {
      this.gameService.game.misses++;
      if (inZone) {
        this.messageService.message('swing-miss-strike');
      } else {
        this.messageService.message('swing-miss-ball');
      }
    }

    if (this.gameService.game.situation.pa.strikes === 3) {
      this.recordK(strikeKind);
    }
  }

  private recordK(strikeKind: StrikeKind): void {
    if (strikeKind === 'looking') {
      this.messageService.message('K-looking');
    } else if (strikeKind === 'swinging') {
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

  private advanceRunners(outcome: PAOutcome): void {
    const firstRunner: Player = this.gameService.game.situation.bases.getBase(1);
    const secondRunner: Player = this.gameService.game.situation.bases.getBase(2);
    const thirdRunner: Player = this.gameService.game.situation.bases.getBase(3);

    let advanceBatterRunnerTo: number;
    if (outcome === '2B') {
      advanceBatterRunnerTo = 2;
    } else if (outcome === '3B') {
      advanceBatterRunnerTo = 3;
    } else if (outcome === 'HR') {
      advanceBatterRunnerTo = 4;
    } else {
      advanceBatterRunnerTo = 1; // outcome === 'BB' || outcome === '1B'
    }

    if (firstRunner && secondRunner && thirdRunner) { // bases loaded
      if (outcome === 'BB') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 3);
        this.advanceRunner(1, 2);
      }
      if (outcome === '1B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 4);
        this.advanceRunner(1, 2);
      }
      if (outcome === '2B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 4);
        this.advanceRunner(1, 3);
      }
      if (outcome === '3B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 4);
        this.advanceRunner(1, 4);
      }
      if (outcome === 'HR') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 4);
        this.advanceRunner(1, 4);
      }
    }

    if (firstRunner && secondRunner && !thirdRunner) { // 2 on, first & second
      if (outcome === 'BB') {
        this.advanceRunner(2, 3);
        this.advanceRunner(1, 2);
      }
      if (outcome === '1B') {
        this.advanceRunner(2, 4);
        this.advanceRunner(1, 2);
      }
      if (outcome === '2B') {
        this.advanceRunner(2, 4);
        this.advanceRunner(1, 3);
      }
      if (outcome === '3B') {
        this.advanceRunner(2, 4);
        this.advanceRunner(1, 4);
      }
      if (outcome === 'HR') {
        this.advanceRunner(2, 4);
        this.advanceRunner(1, 4);
      }
    }

    if (firstRunner && !secondRunner && thirdRunner) { // 2 on, corners
      if (outcome === 'BB') {
        // runner on 3rd doesn't advance
        this.advanceRunner(1, 2);
      }
      if (outcome === '1B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(1, 2);
      }
      if (outcome === '2B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(1, 3);
      }
      if (outcome === '3B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(1, 4);
      }
      if (outcome === 'HR') {
        this.advanceRunner(3, 4);
        this.advanceRunner(1, 4);
      }
    }

    if (!firstRunner && secondRunner && thirdRunner) { // 2 on, second & third
      // runners on 2nd & 3rd don't advance on BB
      if (outcome === '1B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 4);
      }
      if (outcome === '2B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 4);
      }
      if (outcome === '3B') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 4);
      }
      if (outcome === 'HR') {
        this.advanceRunner(3, 4);
        this.advanceRunner(2, 4);
      }
    }

    if (firstRunner && !secondRunner && !thirdRunner) { // 1 on, first
      if (outcome === 'BB') {
        this.advanceRunner(1, 2);
      }
      if (outcome === '1B') {
        this.advanceRunner(1, 2);
      }
      if (outcome === '2B') {
        this.advanceRunner(1, 3);
      }
      if (outcome === '3B') {
        this.advanceRunner(1, 4);
      }
      if (outcome === 'HR') {
        this.advanceRunner(1, 4);
      }
    }

    if (!firstRunner && secondRunner && !thirdRunner) { // 1 on, second
      // runner on 2nd doesn't advance on BB
      if (outcome === '1B') {
        this.advanceRunner(2, 4);
      }
      if (outcome === '2B') {
        this.advanceRunner(2, 4);
      }
      if (outcome === '3B') {
        this.advanceRunner(2, 4);
      }
      if (outcome === 'HR') {
        this.advanceRunner(2, 4);
      }
    }

    if (!firstRunner && !secondRunner && thirdRunner) { // 1 on, third
      // runner on 3rd doesn't advance on BB
      if (outcome === '1B') {
        this.advanceRunner(3, 4);
      }
      if (outcome === '2B') {
        this.advanceRunner(3, 4);
      }
      if (outcome === '3B') {
        this.advanceRunner(3, 4);
      }
      if (outcome === 'HR') {
        this.advanceRunner(3, 4);
      }
    }

    // Advance the batter-runner
    this.advanceRunner(0, advanceBatterRunnerTo);
  }

  private recordHit(): void {
    this.gameService.game.hits++;

    this.gameService.getBatterUp().AB++;
    this.gameService.getBatterUp().hits++;

    this.messageService.message('hit');

    const roll: number = rand(0, 100);

    if (roll <= this.varService.ODDS3B) { // rarest
      this.gameService.teamBatting().addTeamHit('triples');
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
    this.gameService.game.getInningHalfCurrent().addHalfInningRuns(runs);

    this.gameService.teamBatting().runs = this.gameService.teamBatting().runs + runs;

    if (
      // Walk-off
      (this.gameService.game.getInningCurrent().num >= this.varService.INNINGS)
      && (this.gameService.teamBatting().isHome)
      && (this.gameService.teamBatting().runs > this.gameService.teamFielding().runs)
    ) {
      this.gameService.gameOver();
    }
  }

  private inPlay(): void {
    this.gameService.game.situation.pa.inplay = true;
    this.gameService.game.inplay++;

    if (rand(1, 100) <= this.varService.BABIP) {
      this.gameService.game.situation.pa.hit = true;

      this.recordHit();

      this.gameService.endPA();
    } else {
      this.gameService.game.situation.pa.out = true;

      this.messageService.message('out');

      this.gameService.recordOut();
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


}
