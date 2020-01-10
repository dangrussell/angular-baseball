export interface IGame {
  pitches: number;
  swings: number;
  misses: number;
  taken: number;
  balls: number;
  strikes: number;
  BB: number;
  K: number;
  inplay: number;
  hits: number;
  outs: number;
  inning: number;
  innings: Array<number>;
  teams: any;
}

export class Game implements IGame {
  constructor(
    public pitches: number,
    public swings: number,
    public misses: number,
    public taken: number,
    public balls: number,
    public strikes: number,
    public BB: number,
    public K: number,
    public inplay: number,
    public hits: number,
    public outs: number,
    public inning: number,
    public innings: Array<number>,
    public teams: any,
  ) {}

  someGameMethod() {}
}

/*
game = {
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
      hits: 0,
      errors: 0
    },
    home: {
      runs: 0,
      hits: 0,
      errors: 0
    }
  }
};
*/
