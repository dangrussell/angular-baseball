import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Player } from 'src/app/services/player.service';
import { PositionAbbreviationPipe } from '../../../pipes/position-abbreviation.pipe';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-lineup-player',
  templateUrl: './lineup-player.component.html',
  styleUrl: './lineup-player.component.scss',
  standalone: true,
  imports: [NgClass, PositionAbbreviationPipe]
})
export class LineupPlayerComponent {

  @Input() player: Player;

  constructor(
    private readonly gameService: GameService,
  ) { }

  public isUp(player: Player): boolean {
    const playerUp: Player = this.gameService.getBatterUp();
    return player === playerUp;
  }
}
