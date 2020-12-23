import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ScoreboardComponent } from './scoreboard.component';

describe('Component: Scoreboard', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [ScoreboardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    void expect(component).toBeTruthy();
  });
});
