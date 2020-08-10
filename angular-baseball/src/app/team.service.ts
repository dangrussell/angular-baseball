import { Injectable } from '@angular/core';

import { Team } from './team/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  teamAway: Team = {
    runs: 0,
    hits: {
      singles: 0,
      doubles: 0,
      triples: 0,
      homeruns: 0,
    },
    errors: 0,
    players: [
      {
        name: 'Cap Framer',
        position: 2,
        hits: 0,
        AB: 0,
        battingorder: 1,
      },
      {
        name: 'Lefty Baggs',
        position: 3,
        hits: 0,
        AB: 0,
        battingorder: 2,
      },
      {
        name: 'Ramón Manos',
        position: 4,
        hits: 0,
        AB: 0,
        battingorder: 3,
      },
      {
        name: 'Trip Rounding',
        position: 5,
        hits: 0,
        AB: 0,
        battingorder: 4,
      },
      {
        name: 'I.C. Rodríguez',
        position: 6,
        hits: 0,
        AB: 0,
        battingorder: 5,
      },
      {
        name: 'Mickey Flenderson',
        position: 7,
        hits: 0,
        AB: 0,
        battingorder: 6,
      },
      {
        name: 'Niels Giffey, Jr.',
        position: 8,
        hits: 0,
        AB: 0,
        battingorder: 7,
      },
      {
        name: 'Barry Strasberg',
        position: 9,
        hits: 0,
        AB: 0,
        battingorder: 8,
      },
      {
        name: 'Dewey Doctor',
        position: 1,
        hits: 0,
        AB: 0,
        battingorder: 9,
      },
    ],
    home: false,
    name: 'Shelby Villains',
  };

  teamHome: Team = {
    runs: 0,
    hits: {
      singles: 0,
      doubles: 0,
      triples: 0,
      homeruns: 0,
    },
    errors: 0,
    players: [
      {
        name: 'Mitt Paddington',
        position: 2,
        hits: 0,
        AB: 0,
        battingorder: 1,
      },
      {
        name: 'Stretch Scooply',
        position: 3,
        hits: 0,
        AB: 0,
        battingorder: 2,
      },
      {
        name: 'Ecky Davidstein',
        position: 4,
        hits: 0,
        AB: 0,
        battingorder: 3,
      },
      {
        name: 'Rivers Corning',
        position: 5,
        hits: 0,
        AB: 0,
        battingorder: 4,
      },
      {
        name: 'Rip Calvin',
        position: 6,
        hits: 0,
        AB: 0,
        battingorder: 5,
      },
      {
        name: 'Wally Munster',
        position: 7,
        hits: 0,
        AB: 0,
        battingorder: 6,
      },
      {
        name: 'Leap Parker',
        position: 8,
        hits: 0,
        AB: 0,
        battingorder: 7,
      },
      {
        name: 'Yoshi Konami',
        position: 9,
        hits: 0,
        AB: 0,
        battingorder: 8,
      },
      {
        name: 'José Pelota',
        position: 1,
        hits: 0,
        AB: 0,
        battingorder: 9,
      },
    ],
    home: true,
    name: 'Hartford Homers',
  };

  constructor() { }

  teamHits(team: Team): number {
    return team.hits.singles + team.hits.doubles + team.hits.triples + team.hits.homeruns;
  }

  teambatting(toporbot: string): Team {
    if (toporbot === 'top') {
      return this.teamAway;
    } else {
      return this.teamHome;
    }
  }

  teamHomeAway(home: boolean): string {
    if (home === true) {
      return 'home';
    } else {
      return 'away';
    }
  }

  getTeamHomeAway(homeAway: string): Team {
    if (homeAway === 'home') {
      return this.teamHome;
    } else {
      return this.teamAway;
    }
  }
}
