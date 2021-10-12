import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/services/player.service';
import { Team, TeamService } from '../../services/team.service';
import { VarService } from './../../services/var.service';

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

  constructor(
    public varService: VarService,
    public teamService: TeamService,
  ) { }

  ngOnInit(): void {
    if (this.team) {
      this.homeAwayText = this.team.getHomeAwayText();
      this.teamName = this.team.name;
      this.teamPlayers = this.team.players;
    }
  }

}
