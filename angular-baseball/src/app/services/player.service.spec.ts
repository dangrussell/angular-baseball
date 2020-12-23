import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PlayerService } from './player.service';

describe('Service: Player', () => {
  let service: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(PlayerService);
  });

  it('should be created', () => {
    void expect(service).toBeTruthy();
  });
});
