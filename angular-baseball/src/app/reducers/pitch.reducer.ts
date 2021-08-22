import { Action, createReducer, on } from '@ngrx/store';
import { pitch } from '../actions/pitch.actions';

export const initialState: number = 0;

const _pitchReducer = createReducer(
  initialState,
  on(pitch, (state) => {
    return state + 1;
  }),
);

export function pitchReducer(state: number, action: Action) {
  return _pitchReducer(state, action);
}
