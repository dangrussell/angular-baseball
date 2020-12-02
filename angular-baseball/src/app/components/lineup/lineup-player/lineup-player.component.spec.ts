import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LineupPlayerComponent } from './lineup-player.component';

describe('LineupPlayerComponent', () => {
  let component: LineupPlayerComponent;
  let fixture: ComponentFixture<LineupPlayerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LineupPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineupPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
