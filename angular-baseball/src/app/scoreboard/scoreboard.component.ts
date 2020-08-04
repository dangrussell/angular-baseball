import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';
import { TeamService } from '../team.service';
import { Game } from '../game/game';

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
  @Input() teams: [];

  constructor(
    public gameService: GameService,
    public teamService: TeamService,
    ) { }

  ngOnInit(): void {
  }

}
