import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VarService {

  title = 'Angular Baseball';
  titleHTML = '<em><strong>ANGULAR</strong>Baseball</em>';

  /* Uses 2018 MLB totals */
  MLBHITS = 41019;
  MLBHR = 5585;
  MLB3B = 847;
  MLB2B = 8264;
  // MLB1B = this.MLBHITS - this.MLB2B - this.MLB3B - this.MLBHR; // 26323

  // ODDS1B = (this.MLB1B / this.MLBHITS) * 100;
  ODDS2B = (this.MLB2B / this.MLBHITS) * 100;
  ODDS3B = (this.MLB3B / this.MLBHITS) * 100;
  ODDSHR = (this.MLBHR / this.MLBHITS) * 100;

  BABIP = 30; // League-average BABIP = .300

  ZONE = 45; // Zone% - average 45%

  ZSWING = 65; // Z-Swing% - average 65%
  OSWING = 30; // O-Swing% - average 30%

  OCONTACT = 66; // O-Contact% - average 66%
  ZCONTACT = 87; // Z-Contact% - average 87%

  INNINGS = 9;

  positions = {
    1: {
      name: 'pitcher',
      abbreviation: 'P',
    },
    2: {
      name: 'catcher',
      abbreviation: 'C',
    },
    3: {
      name: 'first baseman',
      abbreviation: '1B',
    },
    4: {
      name: 'second baseman',
      abbreviation: '2B',
    },
    5: {
      name: 'third baseman',
      abbreviation: '3B',
    },
    6: {
      name: 'shortstop',
      abbreviation: 'SS',
    },
    7: {
      name: 'left fielder',
      abbreviation: 'LF',
    },
    8: {
      name: 'center fielder',
      abbreviation: 'CF',
    },
    9: {
      name: 'right fielder',
      abbreviation: 'RF',
    },
  };

  constructor() { }

  rand(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ordinal(i: number): string {
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
