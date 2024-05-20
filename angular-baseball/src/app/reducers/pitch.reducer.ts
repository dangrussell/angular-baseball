/* eslint-disable arrow-body-style */
/* See https://ngrx.io/guide/eslint-plugin/rules/prefer-effect-callback-in-block-statement */
import { Action, createReducer, on } from '@ngrx/store';
import { pitchActions } from '../actions/pitch.actions';

const initialState = 0;

const _pitchReducer = createReducer(
  initialState,
  on(pitchActions.pitch, (state): number => {
    return state + 1;
  }),
);

export const pitchReducer = (state: number, action: Action): number => {
  return _pitchReducer(state, action);
};
