import { Component, OnInit, Input } from '@angular/core';
import { VarService } from './../var.service';
import { TeamService } from './../team.service';
import { Team } from '../team/team';

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

  constructor(
    public varService: VarService,
    public teamService: TeamService,
  ) { }

  ngOnInit(): void {
    if (this.team) {
      this.homeAwayText = this.teamService.teamHomeAway(this.team.home);
    }
  }

}
