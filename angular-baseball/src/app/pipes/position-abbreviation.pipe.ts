import { Pipe, PipeTransform } from '@angular/core';
import { Position, VarService } from './../services/var.service';

@Pipe({
  name: 'positionAbbreviation'
})
export class PositionAbbreviationPipe implements PipeTransform {

  constructor(public varService: VarService) { }

  transform(positionNum: number): string {
    return this.varService.positions.find((position: Position) => position.num === positionNum).abbreviation;
  }

}
