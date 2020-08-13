import { Component, OnInit, Input } from '@angular/core';
import { VarService } from './../../services/var.service';
import { TeamService, Team } from '../../services/team.service';

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

  constructor(
    public varService: VarService,
    public teamService: TeamService,
  ) { }

  ngOnInit(): void {
    if (this.team) {
      this.homeAwayText = this.team.getHomeAwayText();
      this.teamName = this.team.name;
    }
  }

}
