import { Component, OnInit, Input } from '@angular/core';
import { VarService } from './../../var.service';
import { Player } from 'src/app/player/player';

@Component({
  selector: '[app-lineup-player]',
  templateUrl: './lineup-player.component.html',
  styleUrls: ['./lineup-player.component.scss'],
  providers: [
    VarService,
  ]
})
export class LineupPlayerComponent implements OnInit {

  @Input() player: Player;

  constructor(
    public varService: VarService,
    ) { }

  ngOnInit(): void {
  }

}
