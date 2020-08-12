import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineupComponent } from './lineup.component';

describe('Component: Lineup', () => {
  let component: LineupComponent;
  let fixture: ComponentFixture<LineupComponent>;

  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      declarations: [ LineupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    void expect(component).toBeTruthy();
  });
});
