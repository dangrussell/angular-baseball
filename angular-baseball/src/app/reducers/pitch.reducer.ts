import { createReducer, on } from '@ngrx/store';
import { pitch } from '../actions/pitch.actions';

export const initialState = 0;

const _pitchReducer = createReducer(
  initialState,
  on(pitch, (state) => {
    return state + 1;
  }),
);

export function pitchReducer(state, action) {
  return _pitchReducer(state, action);
}
