import { Component, OnInit, Input } from '@angular/core';

import { GameService } from '../../services/game.service';
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

  constructor(
    public gameService: GameService
  ) { }

  ngOnInit(): void {
  }

}
