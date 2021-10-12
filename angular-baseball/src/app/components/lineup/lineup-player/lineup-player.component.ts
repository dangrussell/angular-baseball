import { Component, Input } from '@angular/core';
import { Player } from 'src/app/services/player.service';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-lineup-player',
  templateUrl: './lineup-player.component.html',
  styleUrls: ['./lineup-player.component.scss']
})
export class LineupPlayerComponent {

  @Input() player: Player;

  constructor(
    private gameService: GameService,
  ) { }

  public isUp(player: Player): boolean {
    const playerUp: Player = this.gameService.getBatterUp();
    return player === playerUp;
  }
}
