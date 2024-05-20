import { createActionGroup, emptyProps } from '@ngrx/store';

export const pitchActions = createActionGroup({
  source: 'Pitch',
  events: {
    Pitch: emptyProps(),
  },
});
