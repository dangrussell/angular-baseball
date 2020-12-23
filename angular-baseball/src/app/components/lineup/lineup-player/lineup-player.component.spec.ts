import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PositionAbbreviationPipe } from '../../../pipes/position-abbreviation.pipe';
import { LineupPlayerComponent } from './lineup-player.component';

describe('Component: LineupPlayer', () => {
  let component: LineupPlayerComponent;
  let fixture: ComponentFixture<LineupPlayerComponent>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        LineupPlayerComponent,
        PositionAbbreviationPipe,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineupPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    void expect(component).toBeTruthy();
  });
});
