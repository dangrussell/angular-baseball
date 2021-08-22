import { LocationStrategy } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LineupComponent } from './lineup.component';

describe('Component: Lineup', () => {
  let component: LineupComponent;
  let fixture: ComponentFixture<LineupComponent>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [LineupComponent],
      providers: [
        { provide: LocationStrategy, useClass: MockLocationStrategy },
      ],
    }).compileComponents();
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
