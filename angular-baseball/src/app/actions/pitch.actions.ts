import { createAction, props } from '@ngrx/store';

export const pitch = createAction(
  '[Pitch] Pitch',
  props<{ pitches: number }>()
);
