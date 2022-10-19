import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Players } from '../interfaces/player';
import { MessageService } from './message.service';
import { Player, PlayerService } from './player.service';
import { Team, TeamService } from './team.service';
import { VarService } from './var.service';

class PlateAppearance {
  balls: number;
  strikes: number;
  inplay: boolean;
  hit: boolean;
  out: boolean;
  player: Player;

  constructor() {
    this.balls = 0;
    this.strikes = 0;
    this.inplay = false;
    this.hit = false;
    this.out = false;
  }

  public ball(): void {
    this.balls++;
  }

  public strike(): void {
    this.strikes++;
  }

  public resetPlateAppearance(): void {
    this.balls = 0;
    this.strikes = 0;
    this.inplay = false;
  }
}

class Bases {
  private 1: Player | null;
  private 2: Player | null;
  private 3: Player | null;

  constructor() {
    this[1] = null;
    this[2] = null;
    this[3] = null;
  }

  public getBase(base: number): Player | null {
    return this[base] as Player | null;
  }

  public setBase(base: number, value: Player | null) {
    this[base] = value;
  }

  resetBases(): void {
    this.setBase(1, null);
    this.setBase(2, null);
    this.setBase(3, null);
  }
}

class InningHalf {
  toporbot: string;
  private _isCurrent = false;
  private _final = false;
  private _runs: number;
  private _outs = 0;

  constructor(toporbot: string) {
    this.toporbot = toporbot;
  }

  public get halfInningRunsForScoreboard(): string {
    let placeholder = '&nbsp;';
    if (this.final) {
      placeholder = 'X';
    }
    return this._runs !== undefined ? this._runs.toString() : placeholder;
  }

  public get outs(): number {
    return this._outs;
  }

  public get isCurrent(): boolean {
    return this._isCurrent;
  }
  public set isCurrent(isCurrent: boolean) {
    this._isCurrent = isCurrent;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private get final(): boolean {
    return this._final;
  }
  private set final(isFinal: boolean) {
    this._final = isFinal;
  }

  public addHalfInningRuns(runs: number): void {
    this._runs += runs;
  }

  public recordOut(): void {
    this._outs++;
  }

  public start(): void {
    this._isCurrent = true;
    this._runs = 0;
  }

  public finalize(): void {
    this.final = true;
  }
}

export class Inning {
  num: number;
  top: InningHalf;
  bot: InningHalf;

  constructor(num: number) {
    this.num = num;
    this.top = new InningHalf('top');
    this.bot = new InningHalf('bot');
  }

  get isCurrent(): boolean {
    return this.top.isCurrent || this.bot.isCurrent;
  }
}

export class Game {
  final: boolean;
  pitches: number;
  swings: number;
  misses: number;
  taken: number;
  balls: number;
  strikes: number;
  BB: number;
  K: number;
  inplay: number;
  hits: number;
  outs: number;
  // inningCurrent: Inning;
  // inningHalfCurrent: InningHalf;
  innings: Inning[];
  situation: {
    pa: PlateAppearance;
    bases: Bases;
  };
  private teams: {
    away: Team;
    home: Team;
  };

  constructor(gameAwayTeam: Team, gameHomeTeam: Team, gameInnings: number) {
    this.final = false;
    this.pitches = 0;
    this.swings = 0;
    this.misses = 0;
    this.taken = 0;
    this.balls = 0;
    this.strikes = 0;
    this.BB = 0;
    this.K = 0;
    this.inplay = 0;
    this.hits = 0;
    this.outs = 0;
    // this.inningCurrent = new Inning(1);
    // this.inningHalfCurrent = new InningHalf('top');
    this.innings = [];
    this.teams = {
      away: gameAwayTeam,
      home: gameHomeTeam
    };
    this.situation = {
      pa: new PlateAppearance(),
      bases: new Bases()
    };

    for (let i = 1; i <= gameInnings; i++) {
      const addedInning: Inning = this.addInning(i);
      this.innings.push(addedInning);
      /*
      if (i === 1) {
        addedInning.top.current = true;
      }
      */
      // console.log(this.game.innings);
    }

    const startInning: Inning = this.innings.find((inning: Inning) => inning.num === 1);
    startInning.top.start();

    // this.inningCurrent = startInning;
    // this.inningHalfCurrent = startInning.top;
  }

  addInning(i: number): Inning {
    const inning: Inning = new Inning(i);
    console.log('Added inning', i);
    return inning;
  }

  public getInnings(): Inning[] {
    return this.innings;
  }

  public getInningCurrent(): Inning {
    // console.log('getInningCurrent');
    // console.log(this.innings);
    return this.innings.find((inning: Inning) => inning.isCurrent);
  }

  public getInningHalfCurrent(): InningHalf {
    const currentInning: Inning = this.getInningCurrent();
    // console.error('getInningHalfCurrent()');
    // console.log(currentInning);
    if (currentInning.top.isCurrent) {
      return currentInning.top;
    }
    if (currentInning.bot.isCurrent) {
      return currentInning.bot;
    }
  }

  public getTeamAway(): Team {
    return this.teams.away;
  }

  public getTeamHome(): Team {
    return this.teams.home;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public game: Game;

  constructor(
    public varService: VarService,
    public teamService: TeamService,
    public playerService: PlayerService,
    public messageService: MessageService,
  ) {
    this.game = new Game(this.teamService.teams.away, this.teamService.teams.home, this.varService.INNINGS);
  }

  public startPA(): void {
    this.whereAreWe();
    this.getBatterUp().PA++;
    console.log('Now batting for the ' + this.teamBatting().name + ':', this.getBatterUp().name);
  }

  public endPA(): void {
    this.game.situation.pa.resetPlateAppearance();
    if (this.teamBatting().nowBatting < 9) {
      this.teamBatting().nowBatting++;
    } else {
      this.teamBatting().nowBatting = 1; // top of the order
    }
    if (this.game.getInningHalfCurrent().outs < 3) {
      this.startPA();
    }
  }

  public getBatterUp(): Player {
    const nowBatting: Player = this.teamBatting().players.find((player: Player) => player.battingorder === this.teamBatting().nowBatting);
    return nowBatting;
  }

  public isTied(): boolean {
    return this.teamService.teams.away.runs === this.teamService.teams.home.runs;
  }

  public recordOut(): void {
    // this.game.outs++;

    this.getBatterUp().AB++;

    this.game.getInningHalfCurrent().recordOut();

    this.endPA();

    if (this.game.getInningHalfCurrent().outs === 3) {
      if (
        this.game.getInningCurrent().num >= this.varService.INNINGS &&
        !this.teamBatting().isHome &&
        this.teamBatting().runs < this.teamFielding().runs
      ) {
        // Last out of away team in last inning or later
        console.log('Last inning or later');
        console.log('Away team is batting');
        console.log('Away team is losing');
        this.game.getInningHalfCurrent().finalize();
        this.gameOver();
      } else {
        this.nextInningHalf();
        this.startPA();
      }
    }
    this.nextInningHalf();
    this.startPA();
  }

  public startGame(): void {
    const players$: Observable<Players> = this.playerService.getPlayers();
    players$.subscribe(
      {
        next: (response: Players) => {
          this.playerService.players = {
            ...response
          };

          this.playerService.players.data.forEach((player: Player) => {
            if (player.team === 0) {
              this.playerService.teamAwayPlayers.push(player);
            } else if (player.team === 1) {
              this.playerService.teamHomePlayers.push(player);
            }

            player.PA = 0;
            player.AB = 0;
            player.hits = 0;
          });
        },
        error: (err: unknown) => console.error(err),
        complete: () => {
          console.log('Players fetched.');

          this.setBatterUp();
          // this.whereAreWe();
        }
      }
    );
  }

  public teamBatting(): Team {
    if (this.game.getInningCurrent().top.isCurrent === true) {
      return this.game.getTeamAway();
    }
    return this.game.getTeamHome();
  }

  public teamFielding(): Team {
    if (this.game.getInningCurrent().top.isCurrent === true) {
      return this.game.getTeamHome();
    }
    return this.game.getTeamAway();
  }

  public gameOver(): void {
    this.messageService.message('game-over', 1);

    if (this.teamService.teams.away.runs > this.teamService.teams.home.runs) {
      this.messageService.message('winner-away', 0);
    } else {
      this.messageService.message('winner-home', 0);
    }
    this.game.final = true;
  }

  private dueUp(): void {
    console.group('Due up for the ' + this.teamFielding().name + ':');
    console.log(this.getBatterDueUp(0).name);
    console.log('On deck:', this.getBatterDueUp(1).name);
    console.log('In the hole:', this.getBatterDueUp(2).name);
    console.groupEnd();
  }

  private getBatterDueUp(i: number): Player {
    let upcomingSpot = this.teamFielding().nowBatting + i;
    if (upcomingSpot > 9) {
      upcomingSpot = upcomingSpot - 9;
    }
    const dueUp: Player = this.teamFielding().players.find((player: Player) => player.battingorder === upcomingSpot);
    return dueUp;
  }

  private setBatterUp(): void {
    console.log(this.game.situation);
    console.log(this.game.situation.pa);
    this.game.situation.pa.player = this.getBatterUp();
    console.log(this.game.situation.pa.player);
    this.startPA();
  }

  private whereAreWe(): void {
    console.log(this.game.getInningHalfCurrent().toporbot, this.game.getInningCurrent().num);
    console.log(this.teamService.teams.away.name, this.teamService.teams.away.runs);
    console.log(this.teamService.teams.home.name, this.teamService.teams.home.runs);
    console.log(this.game.getInningHalfCurrent().outs, 'outs');
  }

  private nextInning(nextInningNumber: number): void {
    console.log(`End of inning ${nextInningNumber - 1}!`);
    console.log(`Next up: inning ${nextInningNumber}!`);

    let nextInning: Inning = this.game.innings.find((inning: Inning) => inning.num === nextInningNumber);

    console.log(this.game.innings);

    // extra innings
    if (!nextInning) {
      nextInning = this.game.addInning(nextInningNumber);
    }

    console.log(nextInning);

    // this.game.getinningCurrent = this.game.innings.find((inning: Inning) => inning.num === ni);

    nextInning.top.start();
  }

  private nextInningHalf(): void {
    console.log('End of half inning!');
    this.game.situation.bases.resetBases();

    this.dueUp();

    const currentInning: Inning = this.game.getInningCurrent();

    // console.log(currentInning);

    if (currentInning.top.isCurrent) {
      currentInning.top.isCurrent = false;
      currentInning.bot.start();
    } else {
      currentInning.bot.isCurrent = false;
      this.nextInning(currentInning.num + 1);
    }

    this.messageService.switchSides(this.game.getInningHalfCurrent().toporbot, this.game.getInningCurrent().num);
  }

}
