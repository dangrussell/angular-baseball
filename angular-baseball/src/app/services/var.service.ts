import { Injectable } from '@angular/core';

export interface Position {
  num: number;
  name: string;
  abbreviation: string;
}

export const rand = (min: number, max: number): number => {
  const minR: number = Math.ceil(min);
  const maxR: number = Math.floor(max);
  return Math.floor(Math.random() * (maxR - minR + 1)) + minR;
};

export const getOrdinal = (i: number): string => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return 'st';
  }
  if (j === 2 && k !== 12) {
    return 'nd';
  }
  if (j === 3 && k !== 13) {
    return 'rd';
  }
  return 'th';
};

@Injectable({
  providedIn: 'root'
})
export class VarService {

  public readonly title = 'Angular Baseball';
  public readonly titleHTML = '<em><strong>ANGULAR</strong>Baseball</em>';

  /* Uses 2021 MLB totals */
  public readonly MLBHITS = 39484;
  public readonly MLBHR = 5944;
  public readonly MLB3B = 671;
  public readonly MLB2B = 7863;
  // public readonly MLB1B = this.MLBHITS - this.MLB2B - this.MLB3B - this.MLBHR;

  // ODDS1B = (this.MLB1B / this.MLBHITS) * 100;
  public readonly ODDS2B = (this.MLB2B / this.MLBHITS) * 100;
  public readonly ODDS3B = (this.MLB3B / this.MLBHITS) * 100;
  public readonly ODDSHR = (this.MLBHR / this.MLBHITS) * 100;

  public readonly BABIP = 29.2; // League-average BABIP

  public readonly ZONE = 42.1; // Zone%

  public readonly ZSWING = 68.9; // Z-Swing%
  public readonly OSWING = 31.3; // O-Swing%

  public readonly OCONTACT = 62.4; // O-Contact%
  public readonly ZCONTACT = 84.6; // Z-Contact%

  public readonly INNINGS = 9;

  public readonly positions: Position[] = [
    {
      num: 1,
      name: 'pitcher',
      abbreviation: 'P',
    },
    {
      num: 2,
      name: 'catcher',
      abbreviation: 'C',
    },
    {
      num: 3,
      name: 'first baseman',
      abbreviation: '1B',
    },
    {
      num: 4,
      name: 'second baseman',
      abbreviation: '2B',
    },
    {
      num: 5,
      name: 'third baseman',
      abbreviation: '3B',
    },
    {
      num: 6,
      name: 'shortstop',
      abbreviation: 'SS',
    },
    {
      num: 7,
      name: 'left fielder',
      abbreviation: 'LF',
    },
    {
      num: 8,
      name: 'center fielder',
      abbreviation: 'CF',
    },
    {
      num: 9,
      name: 'right fielder',
      abbreviation: 'RF',
    }
  ];

}
