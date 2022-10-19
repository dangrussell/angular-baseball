import { inject, TestBed } from '@angular/core/testing';
import { PitchService } from './pitch.service';

describe('Service: Pitch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PitchService]
    });
  });

  it('should ...', inject([PitchService], (service: PitchService) => {
    void expect(service).toBeTruthy();
  }));
});
