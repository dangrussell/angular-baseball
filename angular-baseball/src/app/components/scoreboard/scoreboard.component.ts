import { Component, OnInit } from '@angular/core';
import { GameService, Game, Inning } from '../../services/game.service';
import { Team } from '../../services/team.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {

  game: Game;

  gameInnings: Inning[];
  gameTeamAway: Team;
  gameTeamHome: Team;

  constructor(
    private gameService: GameService,
  ) {
    this.game = this.gameService.game;
  }

  ngOnInit(): void {
    this.gameInnings = this.gameService.game.getInnings();
    this.gameTeamAway = this.gameService.game.getTeamAway();
    this.gameTeamHome = this.gameService.game.getTeamHome();
  }

  public isCurrentInning(inning: number): boolean {
    return this.gameService.game.getInningCurrent().num === inning;
  }

}
