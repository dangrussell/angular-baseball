import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';

describe('Service: Message', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    void expect(service).toBeTruthy();
  });
});
