import { Reducer } from 'redux';
import { AppAction, AppActionType } from './app.actions';
import { AppState } from './app.model';

const initialState: AppState = {
  menuOpened: false,
};

export const appReducer: Reducer<AppState, AppAction> = (
  state: AppState = initialState,
  action,
) => {
  const { type, payload } = action;

  switch (type) {
    case AppActionType.UPDATE_MENU_STATE:
      return {
        ...state,
        menuOpened: payload.opened,
      };
    default:
      return state;
  }
};
