import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const START_LOADING = createAction('[UI] Start Loading');
export const STOP_LOADING = createAction('[UI] Stop Loading');
export const READ_DATA = createAction(
  '[API] Read searching',
  props<{requestToGit: User[]}>()
);
