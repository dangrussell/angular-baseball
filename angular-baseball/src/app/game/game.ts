import { Team } from './../team/team';

export interface HalfInning {
  toporbot: string;
  outs: number;
  runs: number;
}
export interface Inning {
  num: number;
  top: HalfInning;
  bot: HalfInning;
}
export interface Game {
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
  inning_current: number;
  innings: Inning[];
  teams: Team[];
}
