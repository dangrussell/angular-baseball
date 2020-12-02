import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { VarService } from './services/var.service';
import { TeamService } from './services/team.service';
import { MessageService } from './services/message.service';
import { GameService } from './services/game.service';
import { PlayerService } from './services/player.service';

describe('Component: App', () => {

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
  const playerService = TestBed.inject(PlayerService);
  const teamService = new TeamService(playerService);
  const messageService = TestBed.inject(MessageService);
  const gameService = new GameService(varService, teamService, playerService, messageService);

  let component: AppComponent;

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        ScoreboardComponent,
      ],
      providers: [
        PlayerService,
        MessageService
      ]
    }).compileComponents();

    component = new AppComponent(varService, gameService, teamService, messageService);

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance as AppComponent;
  }));

  it('should calculate 1 + 1 correctly', () => {
    void expect(1 + 1).toEqual(2);
  });

  it('should have a component', () => {
    void expect(component).toBeTruthy();
  });

  it('should create the app', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.debugElement.componentInstance;
    void expect(app).toBeTruthy();
  });

  it('should have as title "angular-baseball"', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.debugElement.componentInstance;
    void expect(app.title).toEqual('angular-baseball');
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
