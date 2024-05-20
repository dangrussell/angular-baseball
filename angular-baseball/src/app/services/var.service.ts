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

  // 2023 League Stats: https://www.fangraphs.com/leaders/major-league?pos=all&stats=bat&lg=all&qual=0&type=0&month=0&ind=1&rost=&age=&filter=&players=0&startdate=&enddate=&season1=2023&season=2023&team=0%2Css

  /* Uses 2023 MLB totals */
  private readonly MLBHITS = 40839;
  private readonly MLBHR = 5868;
  private readonly MLB3B = 712;
  private readonly MLB2B = 8228;
  // private readonly MLB1B = this.MLBHITS - this.MLB2B - this.MLB3B - this.MLBHR;

  // ODDS1B = (this.MLB1B / this.MLBHITS) * 100;
  public readonly ODDS2B = (this.MLB2B / this.MLBHITS) * 100;
  public readonly ODDS3B = (this.MLB3B / this.MLBHITS) * 100;
  public readonly ODDSHR = (this.MLBHR / this.MLBHITS) * 100;

  public readonly BABIP = 29.7; // League-average BABIP

  // 2023 Plate Discipline: https://www.fangraphs.com/leaders/major-league?pos=all&stats=bat&lg=all&qual=0&type=5&month=0&ind=1&rost=&age=&filter=&players=0&startdate=&enddate=&season1=2023&season=2023&team=0%2Css
  public readonly ZONE = 41.9; // Zone%

  public readonly ZSWING = 68.8; // Z-Swing%
  public readonly OSWING = 31.9; // O-Swing%

  public readonly OCONTACT = 62.3; // O-Contact%
  public readonly ZCONTACT = 85.4; // Z-Contact%

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
