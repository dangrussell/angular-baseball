import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

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
          homeruns: 0
        },
        errors: 0,
      },
      home: {
        runs: 0,
        hits: {
          singles: 0,
          doubles: 0,
          triples: 0,
          homeruns: 0
        },
        errors: 0
      }
    }
  };

  teamHits(team) {
    return team.hits.singles + team.hits.doubles + team.hits.triples + team.hits.homeruns;
  }

}
