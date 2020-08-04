import { Player } from './../player/player';

export interface Team {
  runs: number;
  hits: {
    singles: number;
    doubles: number;
    triples: number;
    homeruns: number;
  };
  errors: number;
  players: Player[];
  home: boolean;
  name: string;
}
