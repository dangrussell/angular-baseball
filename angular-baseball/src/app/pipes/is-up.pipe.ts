import { Pipe, PipeTransform } from '@angular/core';
import { GameService } from '../services/game.service';
import { Player } from './../services/player.service';

@Pipe({
  name: 'isUp'
})
export class IsUpPipe implements PipeTransform {

  constructor(public gameService: GameService){}

  transform(player: Player): boolean {
    const playerUp: Player = this.gameService.getBatterUp();
    return (player === playerUp);
  }

}
