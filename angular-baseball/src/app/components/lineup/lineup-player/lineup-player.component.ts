import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/services/player.service';

@Component({
  selector: 'tr[app-lineup-player]',
  templateUrl: './lineup-player.component.html',
  styleUrls: ['./lineup-player.component.scss']
})
export class LineupPlayerComponent implements OnInit {

  @Input() player: Player;

  constructor() { }

  ngOnInit(): void {
  }

}
