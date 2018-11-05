import { AppActionType } from '@actions/app';
import { RootAction } from '@store';
import { Reducer } from 'redux';

export interface AppState {
  page: string;
}

const INITIAL_STATE: AppState = {
  page: '',
};

export const app: Reducer<AppState, RootAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AppActionType.UPDATE_PAGE:
      return {
        ...state,
        page: action.page,
      };
    default:
      return state;
  }
};
