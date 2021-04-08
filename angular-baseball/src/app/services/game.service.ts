import { Injectable } from '@angular/core';
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

  ball(): void {
    this.balls++;
  }

  strike(): void {
    this.strikes++;
  }

  reset(): void {
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

  getBase(base: number): Player | null {
    return this[base] as Player | null;
  }

  setBase(base: number, value: Player | null) {
    this[base] = value;
  }

  reset(): void {
    this[1] = null;
    this[2] = null;
    this[3] = null;
  }
}

class InningHalf {
  toporbot: string;
  current: boolean;
  private runs: number;
  private outs: number;

  constructor(toporbot: string) {
    this.toporbot = toporbot;
    this.outs = 0;
    // this.runs = 0;
    this.current = false;
  }

  public getOuts(): number {
    return this.outs;
  }

  public getRuns(): number {
    return this.runs;
  }

  public addRuns(runs: number): void {
    this.runs += runs;
  }

  public recordOut(): void {
    this.outs++;
  }

  public start() {
    this.current = true;
    this.runs = 0;
  }
}

export class Inning {
  num: number;
  top: InningHalf;
  bot: InningHalf;

  get isCurrent(): boolean {
    return this.top.current || this.bot.current;
  }

  constructor(num: number) {
    this.num = num;
    this.top = new InningHalf('top');
    this.bot = new InningHalf('bot');
  }

  getOuts(): number {
    const topOuts = this.top.getOuts();
    const botOuts = this.bot.getOuts();

    return topOuts + botOuts;
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
      const addedInning = this.addInning(i);
      this.innings.push(addedInning);
      /*
      if (i === 1) {
        addedInning.top.current = true;
      }
      */
      // console.log(this.game.innings);
    }

    const startInning = this.innings.find((inning: Inning) => inning.num === 1);
    startInning.top.start();

    // this.inningCurrent = startInning;
    // this.inningHalfCurrent = startInning.top;
  }

  addInning(i: number): Inning {
    const inning = new Inning(i);
    // console.log('Added inning', i);
    return inning;
  }

  public getInnings(): Inning[] {
    return this.innings;
  }

  getInningCurrent(): Inning {
    // console.log('getInningCurrent');
    // console.log(this.innings);
    return this.innings.find((inning: Inning) => inning.isCurrent);
  }

  getInningHalfCurrent(): InningHalf {
    const currentInning = this.getInningCurrent();
    if (currentInning.top.current) {
      return currentInning.top;
    }
    if (currentInning.bot.current) {
      return currentInning.bot;
    }
  }

  public getTeamAway(): Team {
    return this.teams.away;
  }

  public getTeamHome(): Team {
    return this.teams.home;
  }

  getOuts(): number {
    let outs = 0;
    this.innings.forEach((inning: Inning) => {
      outs += inning.getOuts();
    });
    return outs;
  }

  /*
  getBatterUp(): Player {
    return this.situation.pa.player;
  }
  */
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game: Game;

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
    this.game.situation.pa.reset();
    if (this.teamBatting().nowBatting < 9) {
      this.teamBatting().nowBatting++;
    } else {
      this.teamBatting().nowBatting = 1; // top of the order
    }
    if (this.game.getInningHalfCurrent().getOuts() < 3) {
      this.startPA();
    }
  }

  dueUp(): void {
    console.group('Due up for the ' + this.teamFielding().name + ':');
    console.log(this.getBatterDueUp(0).name);
    console.log('On deck:', this.getBatterDueUp(1).name);
    console.log('In the hole:', this.getBatterDueUp(2).name);
    console.groupEnd();
  }

  getBatterUp(): Player {
    const nowBatting = this.teamBatting().players.find((player: Player) => player.battingorder === this.teamBatting().nowBatting);
    return nowBatting;
  }

  getBatterDueUp(i: number): Player {
    let upcomingSpot = this.teamFielding().nowBatting + i;
    if (upcomingSpot > 9) {
      upcomingSpot = upcomingSpot - 9;
    }
    const dueUp = this.teamFielding().players.find((player: Player) => player.battingorder === upcomingSpot);
    return dueUp;
  }

  setBatterUp(): void {
    console.log(this.game.situation);
    console.log(this.game.situation.pa);
    this.game.situation.pa.player = this.getBatterUp();
    console.log(this.game.situation.pa.player);
    this.startPA();
  }

  whereAreWe(): void {
    console.log(this.game.getInningHalfCurrent().toporbot, this.game.getInningCurrent().num);
    console.log(this.teamService.teamAway.name, this.teamService.teamAway.runs);
    console.log(this.teamService.teamHome.name, this.teamService.teamHome.runs);
    console.log(this.game.getInningHalfCurrent().getOuts(), 'outs');
  }

  nextInning(nextInningNumber: number): void {
    console.log('End of inning!');

    // extra innings
    if (!this.game.innings.find((inning: Inning) => inning.num === nextInningNumber)) {
      this.game.addInning(nextInningNumber);
    }

    // this.game.getinningCurrent = this.game.innings.find((inning: Inning) => inning.num === ni);

    this.game.innings.find((inning: Inning) => inning.num === nextInningNumber).top.start();
  }

  nextInningHalf(): void {
    console.log('End of half inning!');
    this.game.situation.bases.reset();

    this.dueUp();

    const currentInning = this.game.getInningCurrent();

    // console.log(currentInning);

    if (currentInning.top.current) {
      currentInning.top.current = false;
      currentInning.bot.start();
    } else {
      currentInning.bot.current = false;
      this.nextInning(currentInning.num + 1);
    }

    this.messageService.switchSides(this.game.getInningHalfCurrent().toporbot, this.game.getInningCurrent().num);
  }

  recordOut(): void {
    // this.game.outs++;

    this.getBatterUp().AB++;

    this.game.getInningHalfCurrent().recordOut();

    this.endPA();

    if ((this.game.getOuts() >= (3 * 2 * this.varService.INNINGS)) && (this.teamService.teamAway.runs !== this.teamService.teamHome.runs)) {
      this.gameOver();
    } else {
      if (this.game.getInningHalfCurrent().getOuts() === 3) {
        this.nextInningHalf();
        this.startPA();
      }
    }
  }

  public startGame(): void {

    this.playerService.getPlayers().subscribe(
      (response: Players) => {
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
      (err) => console.error(err),
      () => {
        console.log('Players fetched.');

        this.setBatterUp();
        // this.whereAreWe();
      }
    );
  }

  /*
  resetGame(): void {
    this.game = new Game(this.teamService.teams.away, this.teamService.teams.home, this.varService.INNINGS);
    this.startGame();
  }
  */

  teamBatting(): Team {
    if (this.game.getInningCurrent().top.current === true) {
      return this.game.getTeamAway();
    } else {
      return this.game.getTeamHome();
    }
  }

  teamFielding(): Team {
    if (this.game.getInningCurrent().top.current === true) {
      return this.game.getTeamHome();
    } else {
      return this.game.getTeamAway();
    }
  }

  private gameOver(): void {
    this.messageService.message('game-over', 1);

    if (this.teamService.teamAway.runs > this.teamService.teamHome.runs) {
      this.messageService.message('winner-away', 0);
    } else {
      this.messageService.message('winner-home', 0);
    }
    this.game.final = true;
  }

}
