import { Pipe, PipeTransform } from '@angular/core';

import { VarService } from './../services/var.service';

@Pipe({
  name: 'positionAbbreviation'
})
export class PositionAbbreviationPipe implements PipeTransform {

  constructor(public varService: VarService){}

  transform(positionNum: number): string {
    const position = this.varService.positions.find(el => el.num === positionNum);
    return position.abbreviation;
  }

}
