import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneComponent } from './scene.component';

describe('SceneComponent', () => {
  let component: SceneComponent;
  let fixture: ComponentFixture<SceneComponent>;

  const setup = async () => {
    await TestBed.configureTestingModule({
      imports: [SceneComponent]
    }).compileComponents();
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    await setup();

    expect(component).toBeTruthy().catch((error: unknown) => {
      console.error(error);
    });
  });
});
