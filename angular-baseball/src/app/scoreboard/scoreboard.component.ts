import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { TeamService } from '../team.service';
import { Game } from '../game/game';
import { Team } from '../team/team';

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

  @Input() game: Game;

  teamAway: Team;
  teamHome: Team;

  constructor(
    public gameService: GameService,
    public teamService: TeamService,
  ) { }

  ngOnInit(): void {
    if (this.game.teams.length === 2) {
      this.teamAway = this.game.teams.find(el => el.home === false);
      this.teamHome = this.game.teams.find(el => el.home === true);
    }
  }

}
