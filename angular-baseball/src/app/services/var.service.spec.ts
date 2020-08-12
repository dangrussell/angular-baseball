import { TestBed } from '@angular/core/testing';
import { VarService } from './var.service';

describe('Service: Var', () => {
  let service: VarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VarService);
  });

  it('should be created', () => {
    void expect(service).toBeTruthy();
  });
});
