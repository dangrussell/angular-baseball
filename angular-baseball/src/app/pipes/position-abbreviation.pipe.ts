import { Pipe, PipeTransform } from '@angular/core';
import { Position, VarService } from './../services/var.service';

@Pipe({
  name: 'positionAbbreviation',
  standalone: true
})
export class PositionAbbreviationPipe implements PipeTransform {

  constructor(
    private readonly varService: VarService,
  ) { }

  transform(positionNum: number): string {
    return this.varService.positions.find((position: Position) => position.num === positionNum).abbreviation;
  }

}
