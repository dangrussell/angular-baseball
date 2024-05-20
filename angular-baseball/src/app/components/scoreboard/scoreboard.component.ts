import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { GameService, Inning } from '../../services/game.service';
import { Team } from '../../services/team.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
  standalone: true,
  imports: [NgFor, NgClass],
})
export class ScoreboardComponent {

  constructor(
    private readonly gameService: GameService,
  ) { }

  public get gameInnings(): Inning[] {
    return this.gameService.game.getInnings();
  }

  public get toporbot(): string {
    return this.gameService.game.getInningHalfCurrent().toporbot;
  }

  public get teamAway(): Team {
    return this.gameService.game.getTeamAway();
  }

  public get teamHome(): Team {
    return this.gameService.game.getTeamHome();
  }

  public isCurrentInning(inning: number): boolean {
    return this.gameService.game.getInningCurrent().num === inning;
  }

}
