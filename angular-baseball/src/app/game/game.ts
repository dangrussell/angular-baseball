import { Team } from './../team/team';

export interface InningHalfInterface {
  toporbot: string;
  outs: number;
  runs: number;
}
export interface InningInterface {
  num: number;
  top: InningHalfInterface;
  bot: InningHalfInterface;
}
export interface GameInterface {
  final: boolean;
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
  inningCurrent: InningInterface;
  inningHalfCurrent: InningHalfInterface;
  innings: InningInterface[];
  teams: Team[];
}
