import { createSelector } from '@ngrx/store';

export interface PitchState {
  pitch: number;
}

export interface AppState {
  pitches: PitchState;
}

export const selectPitches = (state: AppState): PitchState => state.pitches;

export const selectPitchCount = createSelector(
  selectPitches,
  (state: PitchState) => state.pitch
);
