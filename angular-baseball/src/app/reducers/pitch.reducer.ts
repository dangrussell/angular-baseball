/* eslint-disable arrow-body-style */
// NgRx style prefers effect callbacks in block statements rather than arrow functions for easier debugging
// https://github.com/timdeschryver/eslint-plugin-ngrx/blob/main/docs/rules/prefer-effect-callback-in-block-statement.md
import { Action, createReducer, on } from '@ngrx/store';
import { pitch } from '../actions/pitch.actions';

export const initialState = 0;

const _pitchReducer = createReducer(
  initialState,
  on(pitch, (state): number => {
    return state + 1;
  }),
);

export const pitchReducer = (state: number, action: Action): number => {
  return _pitchReducer(state, action);
};
