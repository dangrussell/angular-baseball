import { TestBed, inject } from '@angular/core/testing';
import { VarService } from './var.service';

describe('Service: Var', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VarService]
    });
  });

  it('should ...', inject([VarService], (service: VarService) => {
    void expect(service).toBeTruthy();
  }));
});
