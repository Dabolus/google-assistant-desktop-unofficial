import { Reducer } from 'redux';
import { AppAction, AppActionType } from './app.actions';
import { AppState, Locale } from './app.model';

export const initialState: AppState = {
  page: 'chat',
  menuOpened: false,
  locale: Locale.EN,
  localeData: null,
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
    case AppActionType.UPDATE_LOCALE_RESOLVED:
      return {
        ...state,
        localeData: action.payload.localeData,
      };
    default:
      return state;
  }
};
