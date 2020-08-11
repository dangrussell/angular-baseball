import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
  providers: [
    GameService,
    TeamService,
  ]
})
export class ScoreboardComponent implements OnInit {

  teamAway = this.teamService.teamAway;
  teamHome = this.teamService.teamHome;

  game = this.gameService.game;

  constructor(
    public gameService: GameService,
    public teamService: TeamService,
  ) { }

  ngOnInit(): void {
  }

}
