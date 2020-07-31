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
      },
      {
        name: 'Lefty Baggs',
        position: 3,
        hits: 0,
        AB: 0,
      },
      {
        name: 'Ramón Manos',
        position: 4,
        hits: 0,
        AB: 0,
      },
      {
        name: 'Trip Rounding',
        position: 5,
        hits: 0,
        AB: 0,
      },
      {
        name: 'I.C. Rodríguez',
        position: 6,
        hits: 0,
        AB: 0,
      },
      {
        name: 'Mickey Flenderson',
        position: 7,
        hits: 0,
        AB: 0,
      },
      {
        name: 'Niels Giffey, Jr.',
        position: 8,
        hits: 0,
        AB: 0,
      },
      {
        name: 'Barry Strasberg',
        position: 9,
        hits: 0,
        AB: 0,
      },
      {
        name: 'Dewey Doctor',
        position: 1,
        hits: 0,
        AB: 0,
      },
    ],
    home: false,
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
      },
      {
        name: 'Stretch Scooply',
        position: 3,
        hits: 0,
        AB: 0,
      },
      {
        name: 'Ecky Davidstein',
        position: 4,
        hits: 0,
        AB: 0,
      },
      {
        name: 'Rivers Corning',
        position: 5,
        hits: 0,
        AB: 0,
      },
      {
        name: 'Rip Calvin',
        position: 6,
        hits: 0,
        AB: 0,
      },
      {
        name: 'Wally Munster',
        position: 7,
        hits: 0,
        AB: 0,
      },
      {
        name: 'Leap Parker',
        position: 8,
        hits: 0,
        AB: 0,
      },
      {
        name: 'Yoshi Konami',
        position: 9,
        hits: 0,
        AB: 0,
      },
      {
        name: 'José Pelota',
        position: 1,
        hits: 0,
        AB: 0,
      },
    ],
    home: true,
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
}
