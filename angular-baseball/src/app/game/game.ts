import { Team } from './../team/team';

export interface InningHalf {
  toporbot: string;
  outs: number;
  runs: number;
}
export interface Inning {
  num: number;
  top: InningHalf;
  bot: InningHalf;
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
  inning_current?: Inning;
  inning_half_current?: InningHalf;
  innings: Inning[];
  teams: Team[];
}
