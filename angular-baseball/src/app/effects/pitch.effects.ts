import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';

@Injectable()
export class PitchEffects {

  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType('[Pitch] Pitch'),
    tap(() => console.log('Pitch')),
  ), { dispatch: false });

  constructor(
    private readonly actions$: Actions,
  ) { }
}
