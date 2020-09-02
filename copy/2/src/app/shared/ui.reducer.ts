import { Action, createReducer, on } from '@ngrx/store';

import { START_LOADING, STOP_LOADING } from './ui.actions';

export interface State {
  home: [];
  isLoading: boolean;
}

export const uiFeatureKey = 'ui';


export const initialState: State = {
  home: [],
  isLoading: false,
};

const uiReducer = createReducer(
  initialState,
  on(START_LOADING, state => ({ ...state, isLoading: true })),
  on(STOP_LOADING, state => ({ ...state, isLoading: false }))
);


export function reducer(state: State | undefined, action: Action) {
  return uiReducer(state, action);
}

