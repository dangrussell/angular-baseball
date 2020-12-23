import { Component, Input, OnInit } from '@angular/core';
import { GameService, Inning } from '../../services/game.service';
import { Team } from '../../services/team.service';
import { GameInterface } from './../../interfaces/game';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
  providers: [
    GameService
  ]
})
export class ScoreboardComponent implements OnInit {

  @Input() game: GameInterface;

  gameInnings: Inning[];
  gameInningCurrent: Inning;
  gameTeamAway: Team;
  gameTeamHome: Team;

  constructor(
    public gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameInnings = this.gameService.game.innings;
    this.gameInningCurrent = this.gameService.game.inningCurrent;
    this.gameTeamAway = this.gameService.game.teams.away;
    this.gameTeamHome = this.gameService.game.teams.home;
  }

}
