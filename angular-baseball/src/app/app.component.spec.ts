import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { VarService } from './services/var.service';
import { TeamService } from './services/team.service';
import { MessageService } from './services/message.service';
import { GameService } from './services/game.service';

describe('AppComponent', () => {

  /*
  const FakeVarService = {
  } as any;

  const FakeGameService = {
  } as any;

  // const FakeGameService = jasmine.createSpyObj('gameService', Game);

  const FakeTeamService = {
  } as any;

  const FakeMessageService = {
  } as any;
  */

  const varService = new VarService();
  const teamService = new TeamService();
  const messageService = new MessageService();
  const gameService = new GameService(varService, teamService, messageService);

  let component: AppComponent;

  beforeEach(async(() => {
    void TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        ScoreboardComponent,
      ],
    }).compileComponents();

    component = new AppComponent(varService, gameService, teamService, messageService);
  }));

  it('should 1 + 1', () => {
    expect(1 + 1).toEqual(2);
  });

  it('should have a component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have as title "angular-baseball"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-baseball');
  });

  /*
  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    void expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-baseball!');
  });
  */
});
