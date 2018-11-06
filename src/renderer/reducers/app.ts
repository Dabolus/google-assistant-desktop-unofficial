import { AppActionType } from '@actions/app';
import { RootAction } from '@store';
import { Reducer } from 'redux';

export interface AppState {
  page: string;
  menuOpened: boolean;
}

const INITIAL_STATE: AppState = {
  page: '',
  menuOpened: false,
};

export const app: Reducer<AppState, RootAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AppActionType.UPDATE_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case AppActionType.UPDATE_MENU_STATE:
      return {
        ...state,
        menuOpened: action.opened,
      };
    default:
      return state;
  }
};
