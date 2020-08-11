import { Component, OnInit, Input } from '@angular/core';
import { VarService } from './../../services/var.service';
import { TeamService } from '../../services/team.service';
import { Team } from '../../team/team';
import { Player } from '../../player/player';

@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.scss'],
  providers: [
    VarService,
    TeamService,
  ]
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
      this.homeAwayText = this.teamService.teamHomeAwayText(this.team.isHome);
      this.teamName = this.team.name;
      this.teamPlayers = this.team.players;
    }
  }

}
