import { Injectable } from '@angular/core';

export interface Position {
  num: number;
  name: string;
  abbreviation: string;
}

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

  /* Uses 2019 MLB totals */
  public readonly MLBHITS = 42039;
  public readonly MLBHR = 6776;
  public readonly MLB3B = 785;
  public readonly MLB2B = 8531;
  // public readonly MLB1B = this.MLBHITS - this.MLB2B - this.MLB3B - this.MLBHR;

  // ODDS1B = (this.MLB1B / this.MLBHITS) * 100;
  public readonly ODDS2B = (this.MLB2B / this.MLBHITS) * 100;
  public readonly ODDS3B = (this.MLB3B / this.MLBHITS) * 100;
  public readonly ODDSHR = (this.MLBHR / this.MLBHITS) * 100;

  public readonly BABIP = 30; // League-average BABIP = .300

  public readonly ZONE = 45; // Zone% - average 45%

  public readonly ZSWING = 65; // Z-Swing% - average 65%
  public readonly OSWING = 30; // O-Swing% - average 30%

  public readonly OCONTACT = 66; // O-Contact% - average 66%
  public readonly ZCONTACT = 87; // Z-Contact% - average 87%

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

  public rand(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public ordinal(i: number): string {
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
  }

}
