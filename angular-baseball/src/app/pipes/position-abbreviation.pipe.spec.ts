import { VarService } from './../services/var.service';
import { PositionAbbreviationPipe } from './position-abbreviation.pipe';

describe('Pipe: PositionAbbreviation', () => {
  let pipe: PositionAbbreviationPipe;

  beforeEach(() => {
    const varService = new VarService();
    pipe = new PositionAbbreviationPipe(varService);
  });

  it('transforms 1 to "P"', () => {
    void expect(pipe.transform(1)).toEqual('P');
  });
});
