/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VarService } from './var.service';

describe('Service: Var', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VarService]
    });
  });

  it('should ...', inject([VarService], (service: VarService) => {
    expect(service).toBeTruthy();
  }));
});
