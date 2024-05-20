/* eslint-disable arrow-body-style */
/* See https://ngrx.io/guide/eslint-plugin/rules/prefer-effect-callback-in-block-statement */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { pitchActions } from '../actions/pitch.actions';

@Injectable({
  providedIn: 'root'
})
export class PitchEffects {

  pitch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(pitchActions.pitch),
      tap(() => console.log('Pitch')),
    );
  }, { dispatch: false });

  constructor(
    private readonly actions$: Actions,
  ) { }
}
