import { Reducer } from 'redux';
import { AppAction, AppActionType } from './app.actions';
import { AppState } from './app.model';

const initialState: AppState = {
  page: '',
  menuOpened: false,
};

export const appReducer: Reducer<AppState, AppAction> = (
  state: AppState = initialState,
  action,
) => {
  switch (action.type) {
    case AppActionType.UPDATE_PAGE:
      return {
        ...state,
        page: action.payload.page,
      };
    case AppActionType.UPDATE_MENU_STATE:
      return {
        ...state,
        menuOpened: action.payload.opened,
      };
    default:
      return state;
  }
};
