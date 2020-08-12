import { Player } from './player';

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
  isHome: boolean;
  name: string;
}
