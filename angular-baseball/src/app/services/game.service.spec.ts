import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';

describe('Service: Game', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    void expect(service).toBeTruthy();
  });
});
