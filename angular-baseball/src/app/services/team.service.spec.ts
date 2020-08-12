import { TestBed } from '@angular/core/testing';
import { TeamService } from './team.service';

describe('Service: Team', () => {
  let service: TeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamService);
  });

  it('should be created', () => {
    void expect(service).toBeTruthy();
  });
});
