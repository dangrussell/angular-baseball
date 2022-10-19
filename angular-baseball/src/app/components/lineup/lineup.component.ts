import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/services/player.service';
import { Team } from '../../services/team.service';

@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.scss'],
})
export class LineupComponent implements OnInit {

  @Input() team: Team;

  homeAwayText: string;
  teamName: string;
  teamPlayers: Player[];

  ngOnInit(): void {
    if (this.team) {
      this.homeAwayText = this.team.getHomeAwayText();
      this.teamName = this.team.name;
      this.teamPlayers = this.team.players;
    }
  }

}
