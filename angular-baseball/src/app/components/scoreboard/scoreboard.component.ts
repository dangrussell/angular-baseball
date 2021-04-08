import { Component, Input, OnInit } from '@angular/core';
import { Game, Inning } from '../../services/game.service';
import { Team } from '../../services/team.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {

  @Input() game: Game;

  gameInnings: Inning[];
  gameTeamAway: Team;
  gameTeamHome: Team;

  ngOnInit(): void {
    this.gameInnings = this.game.getInnings();
    this.gameTeamAway = this.game.getTeamAway();
    this.gameTeamHome = this.game.getTeamHome();
  }

  public isCurrentInning(inning: number): boolean {
    return this.game.getInningCurrent().num === inning;
  }

}
