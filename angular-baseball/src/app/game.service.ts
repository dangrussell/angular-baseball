import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  positions = {
    1: {
      name: 'pitcher',
      abbreviation: 'P',
    },
    2: {
      name: 'catcher',
      abbreviation: 'C',
    },
    3: {
      name: 'first baseman',
      abbreviation: '1B',
    },
    4: {
      name: 'second baseman',
      abbreviation: '2B',
    },
    5: {
      name: 'third baseman',
      abbreviation: '3B',
    },
    6: {
      name: 'shortstop',
      abbreviation: 'SS',
    },
    7: {
      name: 'left fielder',
      abbreviation: 'LF',
    },
    8: {
      name: 'center fielder',
      abbreviation: 'CF',
    },
    9: {
      name: 'right fielder',
      abbreviation: 'RF',
    },
  };

  game = {
    final: false,
    pitches: 0,
    swings: 0,
    misses: 0,
    taken: 0,
    balls: 0,
    strikes: 0,
    BB: 0,
    K: 0,
    inplay: 0,
    hits: 0,
    outs: 0,
    inning: 1,
    innings: [],
    teams: {
      away: {
        runs: 0,
        hits: {
          singles: 0,
          doubles: 0,
          triples: 0,
          homeruns: 0,
        },
        errors: 0,
        players: {
          0: {
            name: 'Cap Framer',
            position: 2,
            hits: 0,
            AB: 0,
          },
          1: {
            name: 'Lefty Baggs',
            position: 3,
            hits: 0,
            AB: 0,
          },
          2: {
            name: 'Ramón Manos',
            position: 4,
            hits: 0,
            AB: 0,
          },
          3: {
            name: 'Trip Rounding',
            position: 5,
            hits: 0,
            AB: 0,
          },
          4: {
            name: 'I.C. Rodríguez',
            position: 6,
            hits: 0,
            AB: 0,
          },
          5: {
            name: 'Mickey Flenderson',
            position: 7,
            hits: 0,
            AB: 0,
          },
          6: {
            name: 'Niels Giffey, Jr.',
            position: 8,
            hits: 0,
            AB: 0,
          },
          7: {
            name: 'Barry Strasberg',
            position: 9,
            hits: 0,
            AB: 0,
          },
          8: {
            name: 'Dewey Doctor',
            position: 1,
            hits: 0,
            AB: 0,
          },
        },
      },
      home: {
        runs: 0,
        hits: {
          singles: 0,
          doubles: 0,
          triples: 0,
          homeruns: 0,
        },
        errors: 0,
        players: {
          0: {
            name: 'Mitt Paddington',
            position: 2,
            hits: 0,
            AB: 0,
          },
          1: {
            name: 'Stretch Scooply',
            position: 3,
            hits: 0,
            AB: 0,
          },
          2: {
            name: 'Ecky Davidstein',
            position: 4,
            hits: 0,
            AB: 0,
          },
          3: {
            name: 'Rivers Corning',
            position: 5,
            hits: 0,
            AB: 0,
          },
          4: {
            name: 'Rip Calvin',
            position: 6,
            hits: 0,
            AB: 0,
          },
          5: {
            name: 'Wally Munster',
            position: 7,
            hits: 0,
            AB: 0,
          },
          6: {
            name: 'Leap Parker',
            position: 8,
            hits: 0,
            AB: 0,
          },
          7: {
            name: 'Yoshi Konami',
            position: 9,
            hits: 0,
            AB: 0,
          },
          8: {
            name: 'José Pelota',
            position: 1,
            hits: 0,
            AB: 0,
          },
        },
      },
    },
  };

  teamHits(team) {
    return team.hits.singles + team.hits.doubles + team.hits.triples + team.hits.homeruns;
  }

}
