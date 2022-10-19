/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PitchService } from './pitch.service';

describe('Service: Pitch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PitchService]
    });
  });

  it('should ...', inject([PitchService], (service: PitchService) => {
    expect(service).toBeTruthy();
  }));
});
