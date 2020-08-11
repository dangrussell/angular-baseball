import { TestBed, inject } from '@angular/core/testing';
import { GameService } from './game.service';

describe('Service: Game', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService]
    });
  });

  it('should ...', inject([GameService], (service: GameService) => {
    void expect(service).toBeTruthy();
  }));
});
