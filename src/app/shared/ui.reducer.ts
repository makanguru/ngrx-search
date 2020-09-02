import { Action, createReducer, on } from '@ngrx/store';

import { READ_DATA, START_LOADING, STOP_LOADING } from './ui.actions';

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
  on(START_LOADING, (state): State => ({ ...state, isLoading: false })),
  on(STOP_LOADING, (state): State => ({ ...state, isLoading: true })),
  on(READ_DATA, (state, {requestToGit}) => ({
    ...state,
    requestToGit: state.home
  }))
);

// LoadAllRequests  requestCollection READ_DATA


export function reducer(state: State | undefined, action: Action) {
  return uiReducer(state, action);
}

