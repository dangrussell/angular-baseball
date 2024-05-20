import { LocationStrategy } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { LineupComponent } from './components/lineup/lineup.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { GameService } from './services/game.service';
import { MessageService } from './services/message.service';
import { PitchService } from './services/pitch.service';
import { PlayerService } from './services/player.service';
import { TeamService } from './services/team.service';
import { VarService } from './services/var.service';

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

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  const initialState = 0;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LineupComponent,
        ScoreboardComponent,
        AppComponent
      ],
      providers: [
        PlayerService,
        MessageService,
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    const varService: VarService = new VarService();
    const playerService: PlayerService = TestBed.inject(PlayerService);
    const teamService: TeamService = new TeamService(playerService);
    const messageService: MessageService = TestBed.inject(MessageService);
    const gameService: GameService = new GameService(varService, teamService, playerService, messageService);
    const store: MockStore<any> = TestBed.inject(MockStore);
    const pitchService: PitchService = new PitchService(varService, store);

    component = new AppComponent(varService, gameService, messageService, pitchService, store);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance as AppComponent;
  });

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
